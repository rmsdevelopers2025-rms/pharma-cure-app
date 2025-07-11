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
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg p-8 mb-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-4">
              {t('getStarted')}, <span className="text-yellow-200">{userName}</span>!
            </h1>
            <p className="text-lg">
              {t('slogan')}
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Search */}
            <Link to="/search" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('search')}</h3>
                <p className="text-sm text-gray-500">Find drug information</p>
              </div>
            </Link>

            {/* Profile */}
            <Link to="/profile" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('profile')}</h3>
                <p className="text-sm text-gray-500">Manage your profile</p>
              </div>
            </Link>

            {/* Prescription */}
            <Link to="/prescription" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('prescription')}</h3>
                <p className="text-sm text-gray-500">View your prescriptions</p>
              </div>
            </Link>

            {/* Nearby Pharmacies */}
            <Link to="/nearby-pharmacies" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('nearbyPharmacies')}</h3>
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Viewed drug information for Paracetamol</li>
                  <li>Searched for side effects of Amoxicillin</li>
                  <li>Added a reminder for Metformin at 8:00 AM</li>
                </ul>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card>
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Advanced drug interaction checker</li>
                  <li>Personalized health recommendations</li>
                  <li>Ad-free experience</li>
                </ul>
                <Link to="/premium" className="inline-block mt-4 text-blue-600 hover:underline">
                  Explore Premium Features
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
