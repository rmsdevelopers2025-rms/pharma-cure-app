import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import pharmacureLogo from '@/assets/pharmacure-logo.jpg';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalInformation, setMedicalInformation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName, sex, parseInt(age), parseFloat(height), parseFloat(weight), medicalInformation);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Account created! Please check your email to confirm.',
      });
      navigate('/signin');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img src={pharmacureLogo} alt="PharmaCure" className="h-32 w-32 object-contain" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Name :</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-cyan-50 border-cyan-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age :</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={1}
                max={120}
                className="bg-cyan-50 border-cyan-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex:</Label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height :</Label>
            <Input
              id="height"
              type="number"
              placeholder="cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              min={1}
              step="0.1"
              className="bg-cyan-50 border-cyan-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight:</Label>
            <Input
              id="weight"
              type="number"
              placeholder="kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min={1}
              step="0.1"
              className="bg-cyan-50 border-cyan-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Id :</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-cyan-50 border-cyan-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalInformation">Medical information :</Label>
            <Textarea
              id="medicalInformation"
              value={medicalInformation}
              onChange={(e) => setMedicalInformation(e.target.value)}
              rows={4}
              className="bg-cyan-50 border-cyan-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-cyan-50 border-cyan-200"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            SIGN UP
          </Button>

          <p className="text-sm text-center text-foreground">
            Already Register?{' '}
            <Link to="/signin" className="hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
