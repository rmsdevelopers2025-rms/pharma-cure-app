import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionData {
  id?: string;
  user_id: string;
  plan_name: string;
  plan_type: string;
  status?: string;
  started_at?: string;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

export const createSubscription = async (
  userId: string,
  planName: string,
  planType: string,
  expiresAt?: string
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('user_subscriptions')
    .insert({
      user_id: userId,
      plan_name: planName,
      plan_type: planType,
      expires_at: expiresAt,
      status: 'active'
    })
    .select()
    .single();
};

export const getUserSubscription = async (userId: string): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();
};

export const updateSubscriptionStatus = async (
  subscriptionId: string,
  status: string
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('user_subscriptions')
    .update({ status })
    .eq('id', subscriptionId)
    .select()
    .single();
};

export const checkIfUserHasPremium = async (userId: string): Promise<boolean> => {
  const { data, error } = await getUserSubscription(userId);
  
  if (error || !data) return false;
  
  // Check if subscription is active and not expired
  if (data.status === 'active') {
    if (!data.expires_at) return true; // No expiry means active
    
    const now = new Date();
    const expiryDate = new Date(data.expires_at);
    return expiryDate > now;
  }
  
  return false;
};