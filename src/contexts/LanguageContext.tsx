
import React, { createContext, useContext, useState, ReactNode } from 'react';

export const languages = {
  en: 'English',
  ta: 'Tamil',
  hi: 'Hindi',
  kn: 'Kannada',
  te: 'Telugu',
  ml: 'Malayalam',
  ur: 'Urdu',
  es: 'Spanish',
  nl: 'Dutch',
  ja: 'Japanese',
  zh: 'Chinese',
  de: 'German',
  fr: 'French',
  pt: 'Portuguese',
  ru: 'Russian',
  ar: 'Arabic',
  it: 'Italian',
  ko: 'Korean',
  th: 'Thai',
  vi: 'Vietnamese'
};

export const translations = {
  en: {
    slogan: 'Learn Before You Swallow',
    getStarted: 'Get Started',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    name: 'Name',
    age: 'Age',
    height: 'Height',
    weight: 'Weight',
    sex: 'Sex',
     address: 'Address',
     email: 'Email',
    medicalInfo: 'Medical Information',
    password: 'Password',
    search: 'Search',
    profile: 'Profile',
    recentHistory: 'Recent History',
    nearbyPharmacies: 'Nearby Pharmacies',
    prescription: 'Prescription',
    premium: 'Premium',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    sideEffects: 'Side Effects',
    dosageForms: 'Dosage Forms',
    disorders: 'Disorders',
    incompatibility: 'Drug Incompatibility',
    voiceSearch: 'Voice Search',
    reminders: 'Drug Reminders',
    addReminder: 'Add Reminder',
    autoCorrect: 'Auto-correct enabled',
    composition: 'Composition',
    brands: 'Brands',
    searchPlaceholder: 'Search for drugs, side effects, dosage...',
    didYouMean: 'Did you mean'
  },
  ta: {
    slogan: 'விழுங்குவதற்கு முன் கற்றுக்கொள்ளுங்கள்',
    getStarted: 'தொடங்குங்கள்',
    signUp: 'பதிவு செய்யுங்கள்',
    signIn: 'உள்நுழையுங்கள்',
    name: 'பெயர்',
    age: 'வயது',
    height: 'உயரம்',
    weight: 'எடை',
    sex: 'பாலினம்',
     address: 'முகவரி',
     email: 'மின்னஞ்சல்',
    medicalInfo: 'மருத்துவ தகவல்',
    password: 'கடவுச்சொல்',
    search: 'தேடுங்கள்',
    profile: 'சுயவிவரம்',
    recentHistory: 'சமீபத்திய வரலாறு',
    nearbyPharmacies: 'அருகிலுள்ள மருந்தகங்கள்',
    prescription: 'மருந்து பரிந்துரை',
    premium: 'பிரீமியம்',
    male: 'ஆண்',
    female: 'பெண்',
    other: 'மற்றவை',
    sideEffects: 'பக்க விளைவுகள்',
    dosageForms: 'மருந்து வடிவங்கள்',
    disorders: 'கோளாறுகள்',
    incompatibility: 'மருந்து பொருந்தாமை',
    voiceSearch: 'குரல் தேடல்',
    reminders: 'மருந்து நினைவூட்டல்கள்',
    addReminder: 'நினைவூட்டல் சேர்க்க',
    autoCorrect: 'தானியங்கி திருத்தம் இயக்கப்பட்டது',
    composition: 'கலவை',
    brands: 'பிராண்டுகள்',
    searchPlaceholder: 'மருந்துகள், பக்க விளைவுகள், மருந்தளவு தேடுங்கள்...',
    didYouMean: 'நீங்கள் சொல்ல நினைத்தது'
  },
  hi: {
    slogan: 'निगलने से पहले सीखें',
    getStarted: 'शुरू करें',
    signUp: 'साइन अप करें',
    signIn: 'साइन इन करें',
    name: 'नाम',
    age: 'उम्र',
    height: 'ऊंचाई',
    weight: 'वजन',
    sex: 'लिंग',
     address: 'पता',
     email: 'ईमेल',
    medicalInfo: 'चिकित्सा जानकारी',
    password: 'पासवर्ड',
    search: 'खोजें',
    profile: 'प्रोफ़ाइल',
    recentHistory: 'हाल का इतिहास',
    nearbyPharmacies: 'नजदीकी दवाखाने',
    prescription: 'नुस्खा',
    premium: 'प्रीमियम',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    sideEffects: 'दुष्प्रभाव',
    dosageForms: 'खुराक के रूप',
    disorders: 'विकार',
    incompatibility: 'दवा असंगति',
    voiceSearch: 'आवाज खोज',
    reminders: 'दवा रिमाइंडर',
    addReminder: 'रिमाइंडर जोड़ें',
    autoCorrect: 'ऑटो-करेक्ट सक्षम',
    composition: 'संरचना',
    brands: 'ब्रांड्स',
    searchPlaceholder: 'दवाएं, दुष्प्रभाव, खुराक खोजें...',
    didYouMean: 'क्या आपका मतलब था'
  }
  // Add more language translations as needed
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
