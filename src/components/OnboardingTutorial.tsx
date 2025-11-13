import { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  title: string;
  description: string;
  targetId: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to PharmaCure! 🎉',
    description: 'Let\'s take a quick tour of the key features to help you get started.',
    targetId: 'dashboard-welcome',
    position: 'bottom',
  },
  {
    title: 'Search for Drugs',
    description: 'Use the search feature to find comprehensive information about any medication, including dosage, side effects, and interactions.',
    targetId: 'nav-search',
    position: 'bottom',
  },
  {
    title: 'Upload Prescriptions',
    description: 'Easily upload and manage your prescriptions. Our AI will analyze them and provide detailed information.',
    targetId: 'nav-prescription',
    position: 'bottom',
  },
  {
    title: 'Find Nearby Pharmacies',
    description: 'Discover pharmacies near you with real-time availability of your medications.',
    targetId: 'nav-pharmacies',
    position: 'bottom',
  },
  {
    title: 'Manage Your Profile',
    description: 'Access your profile to view your prescription history, search history, and account settings.',
    targetId: 'nav-profile',
    position: 'left',
  },
];

export const OnboardingTutorial = () => {
  const { isOnboarding, currentStep, nextStep, prevStep, skipOnboarding } = useOnboarding();
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOnboarding && currentStep < steps.length) {
      const step = steps[currentStep];
      const targetElement = document.getElementById(step.targetId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let top = 0;
        let left = 0;

        switch (step.position) {
          case 'bottom':
            top = rect.bottom + scrollY + 10;
            left = rect.left + scrollX + rect.width / 2;
            break;
          case 'top':
            top = rect.top + scrollY - 10;
            left = rect.left + scrollX + rect.width / 2;
            break;
          case 'left':
            top = rect.top + scrollY + rect.height / 2;
            left = rect.left + scrollX - 10;
            break;
          case 'right':
            top = rect.top + scrollY + rect.height / 2;
            left = rect.right + scrollX + 10;
            break;
        }

        setTooltipPosition({ top, left });
        
        // Highlight the target element
        targetElement.classList.add('onboarding-highlight');
        setIsVisible(true);

        // Scroll to element
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        return () => {
          targetElement.classList.remove('onboarding-highlight');
        };
      }
    }
  }, [isOnboarding, currentStep]);

  if (!isOnboarding || currentStep >= steps.length) {
    return null;
  }

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={skipOnboarding} />

      {/* Tooltip Card */}
      <Card
        className={cn(
          "fixed z-50 p-6 max-w-sm shadow-2xl animate-scale-in",
          step.position === 'left' ? '-translate-x-full -translate-y-1/2' : '',
          step.position === 'right' ? 'translate-x-0 -translate-y-1/2' : '',
          step.position === 'top' ? '-translate-x-1/2 -translate-y-full' : '',
          step.position === 'bottom' ? '-translate-x-1/2 translate-y-0' : ''
        )}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <button
          onClick={skipOnboarding}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close tutorial"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>

            <div className="flex gap-2">
              {!isFirst && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={nextStep}
                className="gap-1"
              >
                {isLast ? 'Get Started' : 'Next'}
                {!isLast && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Arrow pointer */}
        <div
          className={cn(
            "absolute w-0 h-0 border-8 border-transparent",
            step.position === 'bottom' && "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-card",
            step.position === 'top' && "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-card",
            step.position === 'left' && "right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-card",
            step.position === 'right' && "left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-card"
          )}
        />
      </Card>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-card px-4 py-2 rounded-full shadow-lg">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentStep ? "bg-primary w-6" : "bg-muted"
            )}
          />
        ))}
      </div>
    </>
  );
};
