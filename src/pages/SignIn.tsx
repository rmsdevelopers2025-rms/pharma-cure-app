
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard');
    });
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({ 
        title: 'Sign in failed', 
        description: 'Please enter both email and password',
        variant: 'destructive'
      });
      return;
    }

    try {
      console.log('Attempting sign in with email:', email.trim());
      console.log('Network connectivity check:', navigator.onLine);
      console.log('Supabase auth URL being used:', 'https://oxcxqjubctslypthviux.supabase.co/auth/v1');
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      console.log('Sign in response:', { data, error });
      
      if (error) {
        console.error('Sign in error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
          stack: error.stack
        });
        
        let errorMessage = error.message;
        
        // Handle specific error cases
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network connection failed. Please check your internet connection and Supabase configuration.';
          console.error('Fetch failed - possible causes:', {
            'Network': 'Check internet connection',
            'CORS': 'Check Supabase CORS settings',
            'URL': 'Verify Supabase URL is correct',
            'Config': 'Verify Supabase configuration'
          });
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        }
        
        toast({ 
          title: 'Sign in failed', 
          description: errorMessage,
          variant: 'destructive'
        });
        return;
      }
      
      console.log('Sign in successful, session:', data.session);
      toast({ 
        title: 'Sign in successful', 
        description: 'Welcome back!',
        variant: 'default'
      });
      
      // Success - navigation will happen automatically via AuthContext
    } catch (err: any) {
      console.error('Unexpected error during sign in:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        type: typeof err
      });
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (err.message?.includes('Failed to fetch')) {
        errorMessage = 'Network connection failed. Please check your internet connection and try refreshing the page.';
      }
      
      toast({ 
        title: 'Sign in failed', 
        description: errorMessage,
        variant: 'destructive'
      });
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Please enter your email first.', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      toast({ title: 'Resend failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Verification sent', description: 'Check your inbox for a new confirmation link.' });
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Please enter your email first.', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/signin`,
    });
    if (error) {
      toast({ title: 'Reset failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password reset email sent', description: 'Follow the link in your email to set a new password.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4">
                <img 
                  src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                  alt="PharmaCure Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('signIn')}</h2>
              <p className="text-gray-600">Welcome back to PharmaCure!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">{t('password')}</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-lg">
                {t('signIn')}
              </Button>
              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Resend verification email
                </button>
              </div>
            </form>

            <div className="text-center mt-8">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                {t('signUp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
