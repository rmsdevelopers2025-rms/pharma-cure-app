// API Configuration
// UPDATE THIS URL after deploying your backend!
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  SIGNUP: `${API_URL}/api/auth/signup`,
  SIGNIN: `${API_URL}/api/auth/signin`,
  SIGNOUT: `${API_URL}/api/auth/signout`,
  ME: `${API_URL}/api/auth/me`,
  
  // Drugs
  SEARCH_DRUGS: `${API_URL}/api/drugs/search`,
  DRUG_SUGGESTIONS: `${API_URL}/api/drugs/suggestions`,
  DRUG_AUTOCORRECT: `${API_URL}/api/drugs/autocorrect`,
  
  // Prescriptions
  PRESCRIPTIONS: `${API_URL}/api/prescriptions`,
  
  // Pharmacies
  PHARMACIES: `${API_URL}/api/pharmacies`,
  
  // Profile
  PROFILE: `${API_URL}/api/profile`,
  
  // Search History
  SEARCH_HISTORY: `${API_URL}/api/search-history`,
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Get headers with auth token
export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
