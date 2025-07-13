
import { useState } from 'react';
import { Search as SearchIcon, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AutoCorrectSuggestion from './AutoCorrectSuggestion';
import SearchSuggestions from './SearchSuggestions';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query?: string) => void;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  autoCorrectSuggestion: string | null;
  showAutoCorrect: boolean;
  onAutoCorrectClick: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onSearch,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  autoCorrectSuggestion,
  showAutoCorrect,
  onAutoCorrectClick,
  onSuggestionClick
}: SearchBarProps) {
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Paracetamol');
      onSearch('Paracetamol');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
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
              onKeyPress={handleKeyPress}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => {
                setShowSuggestions(false);
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
          <Button onClick={() => onSearch()} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <SearchIcon className="w-4 h-4 mr-2" />
            {t('search')}
          </Button>
        </div>

        <AutoCorrectSuggestion
          show={showAutoCorrect}
          suggestion={autoCorrectSuggestion}
          onClick={onAutoCorrectClick}
        />

        <SearchSuggestions
          show={showSuggestions && suggestions.length > 0 && !showAutoCorrect}
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
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
  );
}
