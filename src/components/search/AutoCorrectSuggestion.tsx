
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AutoCorrectSuggestionProps {
  show: boolean;
  suggestion: string | null;
  onClick: () => void;
}

export default function AutoCorrectSuggestion({ show, suggestion, onClick }: AutoCorrectSuggestionProps) {
  const { t } = useLanguage();

  if (!show || !suggestion) return null;

  return (
    <div className="absolute top-full left-0 right-12 bg-yellow-50 border border-yellow-200 rounded-md shadow-lg z-10 mt-1 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-yellow-800">
          {t('didYouMean')}: <strong>{suggestion}</strong>?
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={onClick}
          className="ml-2 border-yellow-400 text-yellow-800 hover:bg-yellow-100"
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Yes
        </Button>
      </div>
    </div>
  );
}
