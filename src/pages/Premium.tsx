
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, AlertTriangle, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createSubscription } from '@/services/subscriptionService';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      name: 'Basic',
      price: '₹499',
      period: '/month',
      type: 'basic',
      features: [
        'Drug Incompatibility Check',
        'Disorder Information',
        'Advanced Side Effects',
        'Prescription Analysis',
        'Priority Support'
      ]
    },
    {
      name: 'Premium',
      price: '₹999',
      period: '/month',
      type: 'premium',
      popular: true,
      save: 'Most Popular',
      features: [
        'All Basic Features',
        'Unlimited Searches',
        'AI Drug Recommendations',
        'Health Tracking',
        'Family Profiles',
        'Offline Access'
      ]
    },
    {
      name: 'Enterprise',
      price: '₹1999',
      period: '/month',
      type: 'enterprise',
      features: [
        'All Premium Features',
        'Advanced Analytics',
        'Custom Integrations',
        'Dedicated Support',
        'Multi-clinic Access',
        'White-label Solution'
      ]
    }
  ];

  const premiumFeatures = [
    {
      icon: AlertTriangle,
      title: 'Drug Incompatibility',
      description: 'Comprehensive database of drug interactions and contraindications',
      color: 'text-red-500'
    },
    {
      icon: Shield,
      title: 'Disorder Information',
      description: 'Detailed information about medical conditions and treatments',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'AI Analysis',
      description: 'Advanced AI-powered prescription and symptom analysis',
      color: 'text-purple-500'
    }
  ];

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-inr', {
        body: { planType }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-xl text-gray-600">
              Unlock advanced features for comprehensive drug information
            </p>
          </div>

          {/* Premium Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {plan.save}
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-800 mt-2">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleSubscribe(plan.type)}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700' 
                        : index === 0 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`}
                  >
                    Subscribe to {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Why Choose Premium?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  Advanced Safety Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Comprehensive drug interaction database</li>
                  <li>• Real-time safety alerts</li>
                  <li>• Personalized risk assessments</li>
                  <li>• Clinical decision support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-purple-500 mr-2" />
                  AI-Powered Insights
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Intelligent prescription analysis</li>
                  <li>• Predictive health recommendations</li>
                  <li>• Automated medication reminders</li>
                  <li>• Personalized health tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
