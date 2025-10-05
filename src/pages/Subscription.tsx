import { useState, useEffect } from 'react';
import { Check, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

// Paddle configuration
const PADDLE_VENDOR_ID = 'YOUR_PADDLE_VENDOR_ID'; // User needs to add their Paddle vendor ID
const PADDLE_ENVIRONMENT = 'sandbox'; // Change to 'production' for live

declare global {
  interface Window {
    Paddle: any;
  }
}

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load Paddle.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Environment.set(PADDLE_ENVIRONMENT);
        window.Paddle.Setup({ 
          vendor: parseInt(PADDLE_VENDOR_ID),
          eventCallback: (data: any) => {
            console.log('Paddle event:', data);
            if (data.event === 'Checkout.Complete') {
              toast({
                title: 'Subscription activated!',
                description: 'Your subscription has been successfully activated.',
              });
            }
          }
        });
        setPaddleLoaded(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹0',
      period: 'Forever Free',
      description: 'Essential features for personal use',
      paddlePriceId: null,
      features: [
        'Basic drug information',
        'Search functionality',
        'Medication reminders',
        'Profile management',
        'Standard support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹299',
      period: 'per month',
      description: 'Advanced features for healthcare professionals',
      paddlePriceId: 'pri_premium_monthly', // Replace with actual Paddle price ID
      features: [
        'Everything in Basic',
        'Advanced drug interactions',
        'Detailed pharmacokinetics',
        'Prescription management',
        'Priority support',
        'Ad-free experience',
        'Offline access'
      ],
      popular: true
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₹999',
      period: 'per month',
      description: 'Complete solution for medical practices',
      paddlePriceId: 'pri_professional_monthly', // Replace with actual Paddle price ID
      features: [
        'Everything in Premium',
        'API access',
        'Custom integrations',
        'Team collaboration',
        'Advanced analytics',
        'Dedicated account manager',
        'White-label options'
      ]
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to subscribe to a plan',
        variant: 'destructive'
      });
      return;
    }

    const plan = plans.find(p => p.id === planId);
    
    if (!plan) return;

    // Free plan
    if (plan.id === 'basic') {
      toast({
        title: 'Already on Basic plan',
        description: 'You are already using the free Basic plan',
      });
      return;
    }

    // Check if Paddle is loaded
    if (!paddleLoaded || !window.Paddle) {
      toast({
        title: 'Loading payment system',
        description: 'Please wait a moment and try again',
        variant: 'destructive'
      });
      return;
    }

    if (!plan.paddlePriceId) {
      toast({
        title: 'Configuration needed',
        description: 'Paddle price ID not configured for this plan',
        variant: 'destructive'
      });
      return;
    }

    setSelectedPlan(planId);

    // Open Paddle checkout
    window.Paddle.Checkout.open({
      items: [
        {
          priceId: plan.paddlePriceId,
          quantity: 1
        }
      ],
      customData: {
        user_id: user.id
      },
      customer: {
        email: user.email
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-600">
              Select the perfect plan for your needs
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${
                  plan.popular 
                    ? 'border-blue-500 border-2 shadow-xl' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={selectedPlan === plan.id}
                  >
                    {plan.id === 'basic' ? 'Current Plan' : 'Subscribe Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I change my plan later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is there a refund policy?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 7-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
