
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Drug } from '@/data/drugDatabase';
import DrugCard from './DrugCard';

interface SearchResultsProps {
  results: Drug[];
  searchQuery: string;
  autoCorrectSuggestion: string | null;
  onAutoCorrectClick: () => void;
  onSpeak: (text: string) => void;
}

export default function SearchResults({ 
  results, 
  searchQuery, 
  autoCorrectSuggestion, 
  onAutoCorrectClick,
  onSpeak 
}: SearchResultsProps) {
  if (results.length > 0) {
    return (
      <div className="space-y-6">
        {results.map((drug, index) => (
          <DrugCard key={index} drug={drug} onSpeak={onSpeak} />
        ))}
      </div>
    );
  }

  if (searchQuery) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-gray-600">No results found for "{searchQuery}"</p>
          {autoCorrectSuggestion && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onAutoCorrectClick}
            >
              Search for "{autoCorrectSuggestion}" instead?
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
