import { API_ENDPOINTS } from '@/config/api';
import { Drug, DrugComposition, Pharmacokinetics } from '@/data/drugDatabase';

// Convert API response to Drug interface
const transformDrugData = (row: any): Drug => ({
  name: row.name,
  genericName: row.generic_name,
  brands: row.brands || [],
  composition: row.composition || [],
  sideEffects: row.side_effects || [],
  dosageForms: row.dosage_forms || [],
  disorders: row.disorders || [],
  incompatibility: row.incompatibility || [],
  
  category: row.category || '',
  therapeuticClass: row.therapeutic_class || '',
  pharmacologicalClass: row.pharmacological_class || '',
  mechanism: row.mechanism || '',
  indications: row.indications || [],
  contraindications: row.contraindications || [],
  warnings: row.warnings || [],
  dosage: row.dosage || { adult: '', pediatric: '', elderly: '' },
  pharmacokinetics: row.pharmacokinetics || {
    absorption: '',
    distribution: '',
    metabolism: '',
    elimination: '',
    halfLife: '',
    bioavailability: ''
  },
  drugInteractions: row.drug_interactions || [],
  monitoring: row.monitoring || [],
  pregnancyCategory: row.pregnancy_category || '',
  lactation: row.lactation || '',
  overdose: row.overdose || '',
  storage: row.storage || '',
  availableStrengths: row.available_strengths || []
});

export const searchDrugs = async (query: string): Promise<Drug[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${API_ENDPOINTS.SEARCH_DRUGS}?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error('Drug search error');
      return [];
    }
    
    const data = await response.json();
    return data?.map(transformDrugData) || [];
  } catch (error) {
    console.error('Drug search error:', error);
    return [];
  }
};

export const getAutoCorrectSuggestion = async (query: string): Promise<string | null> => {
  if (!query.trim()) return null;
  
  try {
    const response = await fetch(`${API_ENDPOINTS.DRUG_AUTOCORRECT}?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.suggestion;
  } catch (error) {
    console.error('Auto-correct error:', error);
    return null;
  }
};

export const getDrugSuggestions = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${API_ENDPOINTS.DRUG_SUGGESTIONS}?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
};