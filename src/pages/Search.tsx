
import { useState } from 'react';
import { Search as SearchIcon, Mic, Volume2, Shield, AlertTriangle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { t } = useLanguage();

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      {
        name: 'Paracetamol',
        brands: ['Tylenol', 'Panadol', 'Crocin'],
        sideEffects: ['Nausea', 'Stomach pain', 'Liver damage (overdose)'],
        dosageForms: ['Tablet', 'Syrup', 'Injection'],
        disorders: ['Fever', 'Pain', 'Headache'],
        incompatibility: ['Alcohol', 'Warfarin'],
        isPremium: false
      },
      {
        name: 'Aspirin',
        brands: ['Bayer', 'Disprin', 'Ecosprin'],
        sideEffects: ['Stomach bleeding', 'Heartburn', 'Allergic reactions'],
        dosageForms: ['Tablet', 'Capsule', 'Chewable tablet'],
        disorders: ['Heart attack prevention', 'Stroke prevention', 'Pain'],
        incompatibility: ['Warfarin', 'Methotrexate'],
        isPremium: true
      }
    ];
    setSearchResults(mockResults);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Paracetamol');
      handleSearch();
    }, 2000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center">{t('search')} Drug Information</h1>
            
            <div className="flex gap-2 mb-4">
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
              <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <SearchIcon className="w-4 h-4 mr-2" />
                {t('search')}
              </Button>
            </div>
            
            {isListening && (
              <p className="text-sm text-blue-600 text-center">🎤 Listening... Speak now</p>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              {searchResults.map((drug, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">{drug.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(`${drug.name} information`)}
                        className="text-blue-600"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {drug.brands.map((brand: string, i: number) => (
                        <Badge key={i} variant="secondary">{brand}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    {/* Side Effects */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                        {t('sideEffects')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {drug.sideEffects.map((effect: string, i: number) => (
                          <Badge key={i} variant="destructive" className="bg-red-100 text-red-800">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Dosage Forms */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-green-500" />
                        {t('dosageForms')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {drug.dosageForms.map((form: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-green-50 text-green-800">
                            {form}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Premium Features */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center mb-2">
                        <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Premium Features</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium text-sm text-yellow-800">{t('disorders')}</h4>
                          {drug.isPremium ? (
                            <div className="flex flex-wrap gap-2 mt-1">
                              {drug.disorders.map((disorder: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-yellow-100 text-yellow-800">
                                  {disorder}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-yellow-700">Upgrade to Premium to view</p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-yellow-800">{t('incompatibility')}</h4>
                          {drug.isPremium ? (
                            <div className="flex flex-wrap gap-2 mt-1">
                              {drug.incompatibility.map((incomp: string, i: number) => (
                                <Badge key={i} variant="destructive" className="bg-red-100 text-red-800">
                                  {incomp}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-yellow-700">Upgrade to Premium to view</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
