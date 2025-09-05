import { supabase } from '@/integrations/supabase/client';
import { Drug, DrugComposition, Pharmacokinetics } from '@/data/drugDatabase';

// Convert database row to Drug interface
const transformDrugData = (row: any): Drug => ({
  name: row.name,
  genericName: row.generic_name,
  brands: row.brands || [],
  composition: row.composition || [],
  sideEffects: row.side_effects || [],
  dosageForms: row.dosage_forms || [],
  disorders: row.disorders || [],
  incompatibility: row.incompatibility || [],
  isPremium: row.is_premium || false,
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
  
  const { data, error } = await supabase.rpc('search_drugs', { q: query });
  
  if (error) {
    console.error('Drug search error:', error);
    return [];
  }
  
  return data?.map(transformDrugData) || [];
};

export const getAutoCorrectSuggestion = async (query: string): Promise<string | null> => {
  if (!query.trim()) return null;
  
  const { data, error } = await supabase.rpc('get_auto_correct_suggestion', { q: query });
  
  if (error) {
    console.error('Auto-correct error:', error);
    return null;
  }
  
  return data;
};

export const getDrugSuggestions = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];
  
  const { data, error } = await supabase
    .from('drugs')
    .select('name, generic_name, brands')
    .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%`)
    .limit(8);
  
  if (error) {
    console.error('Suggestions error:', error);
    return [];
  }
  
  const suggestions: string[] = [];
  data?.forEach(drug => {
    if (drug.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.push(drug.name);
    }
    if (drug.generic_name?.toLowerCase().includes(query.toLowerCase())) {
      suggestions.push(drug.generic_name);
    }
    drug.brands?.forEach((brand: string) => {
      if (brand.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push(brand);
      }
    });
  });
  
  return Array.from(new Set(suggestions)).slice(0, 8);
};