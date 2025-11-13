import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OnboardingContextType {
  isOnboarding: boolean;
  currentStep: number;
  totalSteps: number;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      // Auto-start onboarding for first-time users after a short delay
      const timer = setTimeout(() => {
        setIsOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startOnboarding = () => {
    setIsOnboarding(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem('onboarding_completed', 'true');
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
    setCurrentStep(0);
    localStorage.setItem('onboarding_completed', 'true');
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStep,
        totalSteps,
        startOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
