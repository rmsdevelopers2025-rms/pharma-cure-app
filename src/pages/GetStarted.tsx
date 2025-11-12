
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Search, MapPin, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center text-white mb-8 sm:mb-10 lg:mb-12">
          <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 shadow-2xl">
            <img 
              src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
              alt="PharmaCure Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">PharmaCure</h1>
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-green-300 drop-shadow-lg px-4">
            {t('slogan')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 text-gray-800 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <Search className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-blue-600" />
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">Drug Search</h3>
            <p className="text-xs sm:text-sm text-gray-600">Search comprehensive drug information with auto-correct</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 text-gray-800 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <Shield className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-green-600" />
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">Safety Check</h3>
            <p className="text-xs sm:text-sm text-gray-600">Check side effects, interactions and contraindications</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 text-gray-800 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <MapPin className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-red-600" />
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">Find Pharmacies</h3>
            <p className="text-xs sm:text-sm text-gray-600">Locate nearby pharmacies with real-time availability</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 text-gray-800 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <Crown className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-purple-600" />
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">Advanced Features</h3>
            <p className="text-xs sm:text-sm text-gray-600">Advanced drug analysis and personalized recommendations</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 sm:space-y-6 px-4">
          <Link to="/signup">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full shadow-xl text-base sm:text-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              {t('getStarted')}
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </Link>
          <div className="text-white">
            <span className="text-xs sm:text-sm">Already have an account? </span>
            <Link to="/signin" className="text-green-300 hover:text-green-200 font-semibold underline transition-colors text-sm sm:text-base">
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
