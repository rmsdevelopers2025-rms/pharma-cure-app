
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Search, MapPin, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <div className="w-32 h-32 mx-auto mb-6 shadow-2xl">
            <img 
              src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
              alt="PharmaCure Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">PharmaCure</h1>
          <p className="text-xl font-semibold text-green-300 drop-shadow-lg">
            {t('slogan')}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-gray-800 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Search className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-bold mb-2 text-lg">Drug Search</h3>
            <p className="text-sm text-gray-600">Search comprehensive drug information with auto-correct</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-gray-800 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-bold mb-2 text-lg">Safety Check</h3>
            <p className="text-sm text-gray-600">Check side effects, interactions and contraindications</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-gray-800 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="font-bold mb-2 text-lg">Find Pharmacies</h3>
            <p className="text-sm text-gray-600">Locate nearby pharmacies with real-time availability</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-gray-800 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <Crown className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-bold mb-2 text-lg">Premium Features</h3>
            <p className="text-sm text-gray-600">Advanced drug analysis and personalized recommendations</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <Link to="/signup">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full shadow-xl text-lg transform hover:scale-105 transition-all duration-300">
              {t('getStarted')}
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
          <div className="text-white">
            <span className="text-sm">Already have an account? </span>
            <Link to="/signin" className="text-green-300 hover:text-green-200 font-semibold underline transition-colors">
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
