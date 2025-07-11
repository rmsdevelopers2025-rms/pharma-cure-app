
interface SearchSuggestionsProps {
  show: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchSuggestions({ show, suggestions, onSuggestionClick }: SearchSuggestionsProps) {
  if (!show) return null;

  return (
    <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
          onClick={() => onSuggestionClick(suggestion)}
        >
          <span className="text-sm text-gray-700">{suggestion}</span>
        </div>
      ))}
    </div>
  );
}
