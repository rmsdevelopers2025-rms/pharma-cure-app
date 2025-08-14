
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, User, MapPin, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import DrugReminder from '@/components/DrugReminder';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const { t } = useLanguage();

  useEffect(() => {
    // Mock user name retrieval
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16">
                <img 
                  src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                  alt="PharmaCure Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome back, <span className="text-blue-600">{userName}</span>!
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  {t('slogan')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Search */}
            <Link to="/search" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 transform hover:-translate-y-1 border border-gray-200">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t('search')}</h3>
                <p className="text-sm text-gray-500">Find drug information</p>
              </div>
            </Link>

            {/* Profile */}
            <Link to="/profile" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 transform hover:-translate-y-1 border border-gray-200">
              <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t('profile')}</h3>
                <p className="text-sm text-gray-500">Manage your profile</p>
              </div>
            </Link>

            {/* Prescription */}
            <Link to="/prescription" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 transform hover:-translate-y-1 border border-gray-200">
              <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t('prescription')}</h3>
                <p className="text-sm text-gray-500">View prescriptions</p>
              </div>
            </Link>

            {/* Nearby Pharmacies */}
            <Link to="/nearby-pharmacies" className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 transform hover:-translate-y-1 border border-gray-200">
              <div className="p-4 bg-red-100 text-red-600 rounded-xl">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t('nearbyPharmacies')}</h3>
                <p className="text-sm text-gray-500">Find nearby pharmacies</p>
              </div>
            </Link>
          </div>

          {/* Drug Reminders Section */}
          <div className="mb-8">
            <DrugReminder />
          </div>

          {/* Recent Activity and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            {/* Premium Features */}
            <Card className="shadow-lg border border-gray-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                <CardTitle className="text-xl text-gray-800">Premium Features</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Advanced drug interaction checker</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Personalized health recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Ad-free experience</span>
                  </li>
                </ul>
                <Link to="/premium" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Explore Premium Features →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
