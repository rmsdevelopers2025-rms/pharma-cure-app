
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Edit, Save, History, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import type { Tables } from '@/integrations/supabase/types';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    sex: '',
    medicalInfo: '',
    email: ''
  });
  
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        toast({
          title: 'Error loading profile',
          description: 'Failed to load your profile data.',
          variant: 'destructive'
        });
        return;
      }

      if (data) {
        const profile = data as Tables<'profiles'>;
        setUserData({
          name: profile.name || '',
          age: profile.age?.toString() || '',
          height: profile.height?.toString() || '',
          weight: profile.weight?.toString() || '',
          sex: profile.sex || '',
          medicalInfo: profile.medical_info || '',
          email: profile.email || user.email || ''
        });
      } else {
        // No profile found - this could happen for existing users before the trigger was updated
        console.log('No profile data found, user may need to complete their profile');
        setUserData(prev => ({ 
          ...prev, 
          email: user.email || '',
          name: user.user_metadata?.name || '',
          age: user.user_metadata?.age || '',
          height: user.user_metadata?.height || '',
          weight: user.user_metadata?.weight || '',
          sex: user.user_metadata?.sex || '',
          medicalInfo: user.user_metadata?.medicalInfo || ''
        }));
        toast({
          title: 'Profile Setup',
          description: 'Please complete and save your profile information.',
          variant: 'default'
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Error loading profile',
        description: 'Failed to load your profile data.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          name: userData.name || null,
          age: userData.age ? parseInt(userData.age) : null,
          height: userData.height ? parseInt(userData.height) : null,
          weight: userData.weight ? parseInt(userData.weight) : null,
          sex: userData.sex || null,
          medical_info: userData.medicalInfo || null,
          email: userData.email || null
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: 'Error saving profile',
          description: 'Failed to save your profile data.',
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Profile saved',
        description: 'Your profile has been updated successfully.'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error saving profile',
        description: 'Failed to save your profile data.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const medicalHistory = [
    { date: '2024-01-15', condition: 'Fever', medication: 'Paracetamol' },
    { date: '2024-01-10', condition: 'Headache', medication: 'Aspirin' },
    { date: '2024-01-05', condition: 'Cold', medication: 'Cough Syrup' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading profile...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{userData.name || 'User'}</CardTitle>
                    <p className="text-gray-600">
                      {userData.age ? `${userData.age} years old` : 'Age not specified'}
                      {userData.sex && ` • ${userData.sex.charAt(0).toUpperCase() + userData.sex.slice(1)}`}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : isEditing ? (
                    <Save className="w-4 h-4 mr-2" />
                  ) : (
                    <Edit className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    readOnly={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">{t('age')}</Label>
                    <Input
                      id="age"
                      value={userData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      readOnly={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sex">{t('sex')}</Label>
                    {isEditing ? (
                      <Select value={userData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{t('male')}</SelectItem>
                          <SelectItem value="female">{t('female')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={t(userData.sex)} readOnly className="bg-gray-50" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">{t('height')} (cm)</Label>
                    <Input
                      id="height"
                      value={userData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      readOnly={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">{t('weight')} (kg)</Label>
                    <Input
                      id="weight"
                      value={userData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      readOnly={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>


                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    readOnly={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                    type="email"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalInfo">{t('medicalInfo')}</Label>
                  <Textarea
                    id="medicalInfo"
                    value={userData.medicalInfo}
                    onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                    readOnly={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                    rows={4}
                    placeholder="Enter any medical conditions, allergies, or important health information..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalHistory.map((record, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{record.condition}</p>
                          <p className="text-sm text-gray-600">{record.medication}</p>
                        </div>
                        <span className="text-xs text-gray-500">{record.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
