import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Drug } from '@/data/drugDatabase';
import { searchDrugs, getAutoCorrectSuggestion, getDrugSuggestions } from '@/services/drugService';
import { saveSearchHistory } from '@/services/searchHistoryService';

import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import DrugReminder from '@/components/DrugReminder';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoCorrectSuggestion, setAutoCorrectSuggestion] = useState<string | null>(null);
  const [showAutoCorrect, setShowAutoCorrect] = useState(false);
  

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 0) {
        // Get suggestions from Supabase
        const filteredSuggestions = await getDrugSuggestions(searchQuery);
        
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);

        // Check for auto-correct
        if (filteredSuggestions.length === 0) {
          const correction = await getAutoCorrectSuggestion(searchQuery);
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
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm) return;

    const results = await searchDrugs(searchTerm);
    setSearchResults(results);
    setShowSuggestions(false);
    setShowAutoCorrect(false);

    // Search history saving disabled in public mode
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleAutoCorrectClick = async () => {
    if (autoCorrectSuggestion) {
      setSearchQuery(autoCorrectSuggestion);
      setShowAutoCorrect(false);
      await handleSearch(autoCorrectSuggestion);
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

          {/* Drug Reminder Section */}
          <div className="mt-8">
            <DrugReminder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
