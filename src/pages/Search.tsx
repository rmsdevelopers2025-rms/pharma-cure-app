
import { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, Volume2, Shield, AlertTriangle, Crown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { drugDatabase, searchDrugs, getAutoCorrectSuggestion, Drug } from '@/data/drugDatabase';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoCorrectSuggestion, setAutoCorrectSuggestion] = useState<string | null>(null);
  const [showAutoCorrect, setShowAutoCorrect] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Get suggestions
      const filteredSuggestions = drugDatabase
        .filter(drug => 
          drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drug.brands.some(brand => brand.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
        .map(drug => drug.name);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);

      // Check for auto-correct
      if (filteredSuggestions.length === 0) {
        const correction = getAutoCorrectSuggestion(searchQuery);
        if (correction && correction.toLowerCase() !== searchQuery.toLowerCase()) {
          setAutoCorrectSuggestion(correction);
          setShowAutoCorrect(true);
        } else {
          setAutoCorrectSuggestion(null);
          setShowAutoCorrect(false);
        }
      } else {
        setAutoCorrectSuggestion(null);
        setShowAutoCorrect(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setAutoCorrectSuggestion(null);
      setShowAutoCorrect(false);
    }
  }, [searchQuery]);

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm) return;

    const results = searchDrugs(searchTerm);
    setSearchResults(results);
    setShowSuggestions(false);
    setShowAutoCorrect(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleAutoCorrectClick = () => {
    if (autoCorrectSuggestion) {
      setSearchQuery(autoCorrectSuggestion);
      setShowAutoCorrect(false);
      handleSearch(autoCorrectSuggestion);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Paracetamol');
      handleSearch('Paracetamol');
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
            
            <div className="relative">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => {
                      setShowSuggestions(false);
                      setShowAutoCorrect(false);
                    }, 200)}
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
                <Button onClick={() => handleSearch()} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  {t('search')}
                </Button>
              </div>

              {/* Auto-correct suggestion */}
              {showAutoCorrect && autoCorrectSuggestion && (
                <div className="absolute top-full left-0 right-12 bg-yellow-50 border border-yellow-200 rounded-md shadow-lg z-10 mt-1 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-800">
                      {t('didYouMean')}: <strong>{autoCorrectSuggestion}</strong>?
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAutoCorrectClick}
                      className="ml-2 border-yellow-400 text-yellow-800 hover:bg-yellow-100"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Yes
                    </Button>
                  </div>
                </div>
              )}

              {/* Auto-suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && !showAutoCorrect && (
                <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="text-sm text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {isListening && (
              <p className="text-sm text-blue-600 text-center">🎤 Listening... Speak now</p>
            )}

            <div className="mt-4 text-center">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t('autoCorrect')}
              </Badge>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              {searchResults.map((drug, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold">{drug.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Generic: {drug.genericName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(`${drug.name} information`)}
                        className="text-blue-600"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Composition */}
                    <div className="mt-3">
                      <h4 className="font-semibold text-sm mb-2">{t('composition')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {drug.composition.map((comp, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50 text-blue-800">
                            {comp.activeIngredient} {comp.strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Brands */}
                    <div className="mt-3">
                      <h4 className="font-semibold text-sm mb-2">{t('brands')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {drug.brands.map((brand, i) => (
                          <Badge key={i} variant="secondary">{brand}</Badge>
                        ))}
                      </div>
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
                        {drug.sideEffects.map((effect, i) => (
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
                        {drug.dosageForms.map((form, i) => (
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
                              {drug.disorders.map((disorder, i) => (
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
                              {drug.incompatibility.map((incomp, i) => (
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

          {searchResults.length === 0 && searchQuery && (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
                {autoCorrectSuggestion && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleAutoCorrectClick}
                  >
                    Search for "{autoCorrectSuggestion}" instead?
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
