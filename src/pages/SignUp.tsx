
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    sex: '',
    email: '',
    medicalInfo: '',
    password: ''
  });
  const { t } = useLanguage();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return { strength: 'weak', message: 'Password must be at least 8 characters' };
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (score < 2) {
      return { strength: 'weak', message: 'Password is too weak' };
    } else if (score < 3) {
      return { strength: 'medium', message: 'Password strength: Medium' };
    } else {
      return { strength: 'strong', message: 'Password strength: Strong' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password strength
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation.strength === 'weak') {
      toast({ 
        title: 'Weak password', 
        description: passwordValidation.message,
        variant: 'destructive'
      });
      return;
    }

    const redirectUrl = `${window.location.origin}/dashboard`;
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: formData.name,
          age: formData.age ? Number(formData.age) : null,
          height: formData.height ? Number(formData.height) : null,
          weight: formData.weight ? Number(formData.weight) : null,
          sex: formData.sex || null,
          email: formData.email,
          medicalInfo: formData.medicalInfo || null,
        },
      },
    });

    if (error) {
      toast({ title: 'Sign up failed', description: error.message });
      return;
    }

    // Keep demo welcome name
    localStorage.setItem('userName', formData.name);

    if (data.user && !data.session) {
      toast({ title: 'Confirm your email', description: 'Check your inbox to complete sign up.' });
      navigate('/signin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update password strength indicator
    if (field === 'password') {
      const validation = validatePassword(value);
      setPasswordStrength(validation.strength);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4">
                <img 
                  src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                  alt="PharmaCure Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('signUp')}</h2>
              <p className="text-gray-600">Create your PharmaCure account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">{t('name')}</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-gray-700 font-medium">{t('age')}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="sex" className="text-gray-700 font-medium">{t('sex')}</Label>
                  <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('male')}</SelectItem>
                      <SelectItem value="female">{t('female')}</SelectItem>
                      <SelectItem value="other">{t('other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height" className="text-gray-700 font-medium">{t('height')} (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    required
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="weight" className="text-gray-700 font-medium">{t('weight')} (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    required
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="medicalInfo" className="text-gray-700 font-medium">{t('medicalInfo')}</Label>
                <Textarea
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  rows={3}
                  placeholder="Any allergies, current medications, conditions..."
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">{t('password')}</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    minLength={8}
                    className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    placeholder="At least 8 characters with letters and numbers"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className={`text-sm ${
                      passwordStrength === 'strong' ? 'text-green-600' :
                      passwordStrength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {validatePassword(formData.password).message}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength === 'strong' ? 'bg-green-500 w-full' :
                          passwordStrength === 'medium' ? 'bg-yellow-500 w-2/3' : 'bg-red-500 w-1/3'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-lg">
                {t('signUp')}
              </Button>
            </form>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                {t('signIn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
