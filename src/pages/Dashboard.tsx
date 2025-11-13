
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, User, MapPin, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import DrugReminder from '@/components/DrugReminder';
import { OnboardingTutorial } from '@/components/OnboardingTutorial';
import { OnboardingButton } from '@/components/OnboardingButton';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
          
          if (data?.full_name) {
            setUserName(data.full_name);
          } else {
            setUserName(user.email?.split('@')[0] || 'User');
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
          setUserName(user.email?.split('@')[0] || 'User');
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <OnboardingTutorial />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div id="dashboard-welcome" className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                    alt="PharmaCure Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-blue-600">{userName}</span>!
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
                    {t('slogan')}
                  </p>
                </div>
              </div>
              <OnboardingButton />
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {/* Search */}
            <Link id="nav-search" to="/search" className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center space-x-3 sm:space-x-4 hover:scale-[1.02] border border-gray-200">
              <div className="p-2 sm:p-3 lg:p-4 bg-blue-100 text-blue-600 rounded-lg sm:rounded-xl flex-shrink-0">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{t('search')}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Find drug information</p>
              </div>
            </Link>

            {/* Profile */}
            <Link id="nav-profile" to="/profile" className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center space-x-3 sm:space-x-4 hover:scale-[1.02] border border-gray-200">
              <div className="p-2 sm:p-3 lg:p-4 bg-green-100 text-green-600 rounded-lg sm:rounded-xl flex-shrink-0">
                <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{t('profile')}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Manage your profile</p>
              </div>
            </Link>

            {/* Prescription */}
            <Link id="nav-prescription" to="/prescription" className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center space-x-3 sm:space-x-4 hover:scale-[1.02] border border-gray-200">
              <div className="p-2 sm:p-3 lg:p-4 bg-yellow-100 text-yellow-600 rounded-lg sm:rounded-xl flex-shrink-0">
                <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{t('prescription')}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">View prescriptions</p>
              </div>
            </Link>

            {/* Nearby Pharmacies */}
            <Link id="nav-pharmacies" to="/nearby-pharmacies" className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center space-x-3 sm:space-x-4 hover:scale-[1.02] border border-gray-200">
              <div className="p-2 sm:p-3 lg:p-4 bg-red-100 text-red-600 rounded-lg sm:rounded-xl flex-shrink-0">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{t('nearbyPharmacies')}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Find nearby pharmacies</p>
              </div>
            </Link>
          </div>

          {/* Drug Reminders Section */}
          <div className="mb-8">
            <DrugReminder />
          </div>

          {/* Recent Activity and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Recent Activity */}
            <Card className="shadow-lg border border-gray-200 rounded-xl">
              <CardHeader className="bg-gray-50 rounded-t-xl">
                <CardTitle className="text-xl text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Viewed drug information for Paracetamol</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Searched for side effects of Amoxicillin</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Added a reminder for Metformin at 8:00 AM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Available Features */}
            <Card className="shadow-lg border border-gray-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
                <CardTitle className="text-xl text-gray-800">Available Features</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Comprehensive drug information database</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Medication reminders and scheduling</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Nearby pharmacy locator</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Prescription management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
