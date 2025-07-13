
interface SearchSuggestionsProps {
  show: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchSuggestions({ show, suggestions, onSuggestionClick }: SearchSuggestionsProps) {
  if (!show) return null;

  return (
    <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1 max-h-64 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
          onClick={() => onSuggestionClick(suggestion)}
        >
          <span className="text-sm text-gray-700 font-medium">{suggestion}</span>
        </div>
      ))}
    </div>
  );
}
