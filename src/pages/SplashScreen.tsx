
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
    <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600 flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center text-white">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-48 h-48 mx-auto mb-6 relative">
            <img 
              src="/lovable-uploads/c2a08633-046c-4777-a1c8-0fc700677015.png" 
              alt="PharmaCure Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            PharmaCure
          </h1>
        </div>

        {/* Slogan */}
        <div className="text-2xl font-semibold tracking-wide mb-8">
          <span className="text-green-300 font-bold drop-shadow-lg">
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
