
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Search, MapPin, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="font-bold text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              PC
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Pharma Cure</h1>
          <p className="text-xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            {t('slogan')}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="font-semibold mb-2">Drug Search</h3>
            <p className="text-sm opacity-90">Search comprehensive drug information</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="font-semibold mb-2">Safety Check</h3>
            <p className="text-sm opacity-90">Check side effects and interactions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-red-300" />
            <h3 className="font-semibold mb-2">Find Pharmacies</h3>
            <p className="text-sm opacity-90">Locate nearby pharmacies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-center">
            <Crown className="w-12 h-12 mx-auto mb-4 text-purple-300" />
            <h3 className="font-semibold mb-2">Premium Features</h3>
            <p className="text-sm opacity-90">Advanced drug analysis</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg">
              {t('getStarted')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <div className="text-white">
            <span className="text-sm">Already have an account? </span>
            <Link to="/signin" className="text-yellow-300 hover:text-yellow-200 font-semibold underline">
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
