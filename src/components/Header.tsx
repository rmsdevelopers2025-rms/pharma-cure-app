
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage, languages } from '@/contexts/LanguageContext';

const Header = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4b1f1089-469a-4f61-8701-3f77e1ab4d9c.png" 
                alt="PC" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-cyan-200 to-green-200 bg-clip-text text-transparent">
              PharmaCure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="hover:text-blue-200 transition-colors">
              {t('search')}
            </Link>
            <Link to="/profile" className="hover:text-blue-200 transition-colors">
              {t('profile')}
            </Link>
            <Link to="/prescription" className="hover:text-blue-200 transition-colors">
              {t('prescription')}
            </Link>
            <Link to="/nearby-pharmacies" className="hover:text-blue-200 transition-colors">
              {t('nearbyPharmacies')}
            </Link>
            <Link to="/premium" className="hover:text-blue-200 transition-colors">
              {t('premium')}
            </Link>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Globe className="w-4 h-4 mr-2" />
                  {languages[currentLanguage as keyof typeof languages]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {Object.entries(languages).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={currentLanguage === code ? 'bg-blue-50' : ''}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link to="/search" className="hover:text-blue-200 transition-colors py-2">
                {t('search')}
              </Link>
              <Link to="/profile" className="hover:text-blue-200 transition-colors py-2">
                {t('profile')}
              </Link>
              <Link to="/prescription" className="hover:text-blue-200 transition-colors py-2">
                {t('prescription')}
              </Link>
              <Link to="/nearby-pharmacies" className="hover:text-blue-200 transition-colors py-2">
                {t('nearbyPharmacies')}
              </Link>
              <Link to="/premium" className="hover:text-blue-200 transition-colors py-2">
                {t('premium')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
