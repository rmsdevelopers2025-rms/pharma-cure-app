
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { drugDatabase, searchDrugs, getAutoCorrectSuggestion, Drug } from '@/data/drugDatabase';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoCorrectSuggestion, setAutoCorrectSuggestion] = useState<string | null>(null);
  const [showAutoCorrect, setShowAutoCorrect] = useState(false);

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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            autoCorrectSuggestion={autoCorrectSuggestion}
            showAutoCorrect={showAutoCorrect}
            onAutoCorrectClick={handleAutoCorrectClick}
            onSuggestionClick={handleSuggestionClick}
          />

          <SearchResults
            results={searchResults}
            searchQuery={searchQuery}
            autoCorrectSuggestion={autoCorrectSuggestion}
            onAutoCorrectClick={handleAutoCorrectClick}
            onSpeak={speakText}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
