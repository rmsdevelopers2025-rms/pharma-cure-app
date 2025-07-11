
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/get-started');
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center text-white">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-40 h-40 mx-auto mb-6 relative">
            <img 
              src="/lovable-uploads/4b1f1089-469a-4f61-8701-3f77e1ab4d9c.png" 
              alt="Pharma Cure Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-green-300 bg-clip-text text-transparent">
            PharmaCure
          </h1>
        </div>

        {/* Slogan */}
        <div className="text-2xl font-semibold tracking-wide">
          <span className="bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent font-bold drop-shadow-lg">
            {t('slogan')}
          </span>
        </div>

        {/* Loading Animation */}
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
