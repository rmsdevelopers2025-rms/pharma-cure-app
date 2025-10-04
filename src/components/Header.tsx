
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully',
    });
    navigate('/get-started');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                alt="PharmaCure" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="font-bold text-2xl hidden sm:block text-blue-700">
              PharmaCure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('search')}
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('profile')}
            </Link>
            <Link to="/prescription" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('prescription')}
            </Link>
            <Link to="/nearby-pharmacies" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nearbyPharmacies')}
            </Link>
            <Link to="/subscription" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Subscription
            </Link>
          </nav>

          {/* Language Selector and Auth */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                  <Globe className="w-4 h-4 mr-2" />
                  {languages[currentLanguage as keyof typeof languages]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {Object.entries(languages).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={currentLanguage === code ? 'bg-blue-50 text-blue-700' : ''}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="hidden md:flex text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('signOut')}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/signin')}
                className="hidden md:flex text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <User className="w-4 h-4 mr-2" />
                {t('signIn')}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden text-gray-700 border-gray-300 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link to="/search" className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium">
                {t('search')}
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium">
                {t('profile')}
              </Link>
              <Link to="/prescription" className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium">
                {t('prescription')}
              </Link>
              <Link to="/nearby-pharmacies" className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium">
                {t('nearbyPharmacies')}
              </Link>
              <Link to="/subscription" className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium">
                Subscription
              </Link>
              {user ? (
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="justify-start text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('signOut')}
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/signin')}
                  className="justify-start text-gray-700 hover:text-blue-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('signIn')}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
