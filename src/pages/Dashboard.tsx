
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, FileText, MapPin, Crown, History, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Sample voice search result');
    }, 2000);
  };

  const quickActions = [
    { icon: Search, label: t('search'), path: '/search', color: 'bg-blue-500' },
    { icon: User, label: t('profile'), path: '/profile', color: 'bg-green-500' },
    { icon: FileText, label: t('prescription'), path: '/prescription', color: 'bg-purple-500' },
    { icon: MapPin, label: t('nearbyPharmacies'), path: '/nearby-pharmacies', color: 'bg-red-500' },
    { icon: Crown, label: t('premium'), path: '/premium', color: 'bg-yellow-500' },
    { icon: History, label: t('recentHistory'), path: '/recent-history', color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg p-6 text-white mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to Pharma Cure</h1>
          <p className="opacity-90">{t('slogan')}</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('search')} Drugs</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for drugs, side effects, dosage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
                onClick={handleVoiceSearch}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Link to="/search">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Search className="w-4 h-4 mr-2" />
                {t('search')}
              </Button>
            </Link>
          </div>
          {isListening && (
            <p className="text-sm text-blue-600 mt-2">Listening... Speak now</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{action.label}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('recentHistory')}</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Search className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Searched: Paracetamol</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Uploaded prescription</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
