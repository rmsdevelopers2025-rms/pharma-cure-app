import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const OnboardingButton = () => {
  const { startOnboarding } = useOnboarding();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={startOnboarding}
      className="gap-2"
      title="Start tutorial"
    >
      <HelpCircle className="w-4 h-4" />
      <span className="hidden sm:inline">Tutorial</span>
    </Button>
  );
};
