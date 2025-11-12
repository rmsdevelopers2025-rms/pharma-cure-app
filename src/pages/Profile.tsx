import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  full_name: string | null;
  email: string | null;
  sex: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  medical_information: string | null;
  date_of_birth: string | null;
}

const Profile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data && !error) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <User className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t('profile')}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {user ? 'Manage your profile settings' : 'Profile management is not available in demo mode'}
            </p>
          </div>

          <Card className="mx-2 sm:mx-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {user ? 'Profile' : 'Demo Profile'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-sm sm:text-base text-gray-900 break-words">{profile?.full_name || user?.email || 'Demo User'}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm sm:text-base text-gray-900 break-words">{profile?.email || user?.email || 'demo@pharmacure.com'}</p>
                </div>
                {profile?.sex && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sex</label>
                    <p className="text-gray-900">{profile.sex}</p>
                  </div>
                )}
                {profile?.age && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Age</label>
                    <p className="text-gray-900">{profile.age} years</p>
                  </div>
                )}
                {profile?.height && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Height</label>
                    <p className="text-gray-900">{profile.height} cm</p>
                  </div>
                )}
                {profile?.weight && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Weight</label>
                    <p className="text-gray-900">{profile.weight} kg</p>
                  </div>
                )}
                {profile?.date_of_birth && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="text-gray-900">{new Date(profile.date_of_birth).toLocaleDateString()}</p>
                  </div>
                )}
                {profile?.medical_information && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Medical Information</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{profile.medical_information}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-gray-900">{user ? 'Authenticated' : 'Demo Mode - No authentication required'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
