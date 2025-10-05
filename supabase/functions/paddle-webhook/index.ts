import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const webhookSecret = Deno.env.get('PADDLE_WEBHOOK_SECRET');
    const signature = req.headers.get('Paddle-Signature');
    
    const rawBody = await req.text();
    
    // Verify webhook signature
    if (webhookSecret && signature) {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(webhookSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );
      
      const signatureParts = signature.split(';');
      const h1 = signatureParts.find(part => part.startsWith('h1='))?.replace('h1=', '');
      
      if (h1) {
        const verified = await crypto.subtle.verify(
          'HMAC',
          key,
          hexToBytes(h1),
          encoder.encode(rawBody)
        );
        
        if (!verified) {
          console.error('Invalid webhook signature');
          return new Response(JSON.stringify({ error: 'Invalid signature' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }
    }

    const event = JSON.parse(rawBody);
    console.log('Paddle webhook event:', event.event_type);

    // Handle subscription events
    if (event.event_type === 'subscription.created' || 
        event.event_type === 'subscription.updated') {
      
      const customData = event.data.custom_data;
      const userId = customData?.user_id;
      
      if (!userId) {
        console.error('No user_id in custom_data');
        return new Response(JSON.stringify({ error: 'Missing user_id' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const planType = event.data.items[0]?.price?.id || '';
      const planName = getPlanName(planType);
      const status = event.data.status;

      // Upsert subscription
      const { error } = await supabaseClient
        .from('user_subscriptions')
        .upsert({
          user_id: userId,
          plan_type: planType,
          plan_name: planName,
          status: status,
          started_at: event.data.started_at || new Date().toISOString(),
          expires_at: event.data.current_billing_period?.ends_at || null,
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating subscription:', error);
        throw error;
      }

      console.log(`Subscription ${event.event_type} for user ${userId}`);
    }

    // Handle subscription cancellation
    if (event.event_type === 'subscription.canceled') {
      const customData = event.data.custom_data;
      const userId = customData?.user_id;

      if (userId) {
        const { error } = await supabaseClient
          .from('user_subscriptions')
          .update({
            status: 'canceled',
            expires_at: event.data.canceled_at || new Date().toISOString()
          })
          .eq('user_id', userId);

        if (error) {
          console.error('Error canceling subscription:', error);
          throw error;
        }

        console.log(`Subscription canceled for user ${userId}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function getPlanName(planType: string): string {
  if (planType.includes('premium')) return 'Premium';
  if (planType.includes('professional')) return 'Professional';
  return 'Basic';
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}
