
export interface DrugComposition {
  activeIngredient: string;
  strength: string;
}

export interface Drug {
  name: string;
  genericName: string;
  brands: string[];
  composition: DrugComposition[];
  sideEffects: string[];
  dosageForms: string[];
  disorders: string[];
  incompatibility: string[];
  isPremium: boolean;
  category: string;
}

export const drugDatabase: Drug[] = [
  {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    brands: ['Tylenol', 'Panadol', 'Crocin', 'Dolo'],
    composition: [{ activeIngredient: 'Paracetamol', strength: '500mg' }],
    sideEffects: ['Nausea', 'Stomach pain', 'Skin rash'],
    dosageForms: ['Tablet', 'Syrup', 'Injection', 'Suppository'],
    disorders: ['Pain', 'Fever', 'Headache'],
    incompatibility: ['Alcohol', 'Warfarin'],
    isPremium: false,
    category: 'Analgesic'
  },
  {
    name: 'Amoxicillin + Clavulanic Acid',
    genericName: 'Co-amoxiclav',
    brands: ['Augmentin', 'Clavam', 'Megaclav', 'Amoxyclav'],
    composition: [
      { activeIngredient: 'Amoxicillin', strength: '500mg' },
      { activeIngredient: 'Clavulanic Acid', strength: '125mg' }
    ],
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal pain'],
    dosageForms: ['Tablet', 'Oral Suspension', 'Injection'],
    disorders: ['Bacterial infections', 'Respiratory tract infections', 'UTI'],
    incompatibility: ['Probenecid', 'Allopurinol'],
    isPremium: true,
    category: 'Antibiotic'
  },
  {
    name: 'Losartan + Hydrochlorothiazide',
    genericName: 'Losartan/HCTZ',
    brands: ['Hyzaar', 'Losazide', 'Losar-H', 'Cozaar Plus'],
    composition: [
      { activeIngredient: 'Losartan Potassium', strength: '50mg' },
      { activeIngredient: 'Hydrochlorothiazide', strength: '12.5mg' }
    ],
    sideEffects: ['Dizziness', 'Fatigue', 'Hyperkalemia', 'Hypotension'],
    dosageForms: ['Tablet'],
    disorders: ['Hypertension', 'Heart failure', 'Diabetic nephropathy'],
    incompatibility: ['Lithium', 'NSAIDs', 'Potassium supplements'],
    isPremium: true,
    category: 'Antihypertensive'
  },
  {
    name: 'Amlodipine + Atorvastatin',
    genericName: 'Amlodipine/Atorvastatin',
    brands: ['Caduet', 'Amlodac-AT', 'Stamlo-A'],
    composition: [
      { activeIngredient: 'Amlodipine', strength: '5mg' },
      { activeIngredient: 'Atorvastatin', strength: '10mg' }
    ],
    sideEffects: ['Muscle pain', 'Peripheral edema', 'Headache', 'Fatigue'],
    dosageForms: ['Tablet'],
    disorders: ['Hypertension', 'Hyperlipidemia', 'Coronary artery disease'],
    incompatibility: ['Cyclosporine', 'Gemfibrozil', 'Warfarin'],
    isPremium: true,
    category: 'Cardiovascular'
  },
  {
    name: 'Metformin + Glimepiride',
    genericName: 'Metformin/Glimepiride',
    brands: ['Amaryl M', 'Glimisave M', 'Glycomet GP'],
    composition: [
      { activeIngredient: 'Metformin', strength: '500mg' },
      { activeIngredient: 'Glimepiride', strength: '2mg' }
    ],
    sideEffects: ['Hypoglycemia', 'Nausea', 'Diarrhea', 'Weight gain'],
    dosageForms: ['Tablet'],
    disorders: ['Type 2 Diabetes', 'Insulin resistance'],
    incompatibility: ['Alcohol', 'Beta-blockers', 'Corticosteroids'],
    isPremium: true,
    category: 'Antidiabetic'
  },
  {
    name: 'Tramadol + Paracetamol',
    genericName: 'Tramadol/Acetaminophen',
    brands: ['Ultracet', 'Dolopar Plus', 'Tramacet'],
    composition: [
      { activeIngredient: 'Tramadol HCl', strength: '37.5mg' },
      { activeIngredient: 'Paracetamol', strength: '325mg' }
    ],
    sideEffects: ['Drowsiness', 'Nausea', 'Constipation', 'Dizziness'],
    dosageForms: ['Tablet'],
    disorders: ['Moderate to severe pain', 'Post-operative pain'],
    incompatibility: ['MAO inhibitors', 'Alcohol', 'CNS depressants'],
    isPremium: true,
    category: 'Analgesic'
  },
  {
    name: 'Cetirizine + Pseudoephedrine',
    genericName: 'Cetirizine/Pseudoephedrine',
    brands: ['Zyrtec-D', 'Alerid-D', 'Cetrizet-D'],
    composition: [
      { activeIngredient: 'Cetirizine HCl', strength: '5mg' },
      { activeIngredient: 'Pseudoephedrine HCl', strength: '120mg' }
    ],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Insomnia', 'Nervousness'],
    dosageForms: ['Extended Release Tablet'],
    disorders: ['Allergic rhinitis', 'Nasal congestion', 'Hay fever'],
    incompatibility: ['MAO inhibitors', 'Antihypertensives'],
    isPremium: true,
    category: 'Antihistamine'
  }
  // Add more drugs with various compositions
];

// Auto-correct functionality
export const getAutoCorrectSuggestion = (input: string): string | null => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Simple Levenshtein distance calculation
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  let bestMatch = null;
  let minDistance = Infinity;

  drugDatabase.forEach(drug => {
    const drugName = drug.name.toLowerCase();
    const distance = levenshteinDistance(normalizedInput, drugName);
    
    // Consider it a potential correction if distance is small relative to input length
    if (distance < minDistance && distance <= Math.max(2, normalizedInput.length * 0.4)) {
      minDistance = distance;
      bestMatch = drug.name;
    }

    // Also check brands
    drug.brands.forEach(brand => {
      const brandName = brand.toLowerCase();
      const brandDistance = levenshteinDistance(normalizedInput, brandName);
      if (brandDistance < minDistance && brandDistance <= Math.max(2, normalizedInput.length * 0.4)) {
        minDistance = brandDistance;
        bestMatch = brand;
      }
    });
  });

  return bestMatch;
};

export const searchDrugs = (query: string): Drug[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return drugDatabase.filter(drug => {
    return (
      drug.name.toLowerCase().includes(normalizedQuery) ||
      drug.genericName.toLowerCase().includes(normalizedQuery) ||
      drug.brands.some(brand => brand.toLowerCase().includes(normalizedQuery)) ||
      drug.composition.some(comp => comp.activeIngredient.toLowerCase().includes(normalizedQuery)) ||
      drug.sideEffects.some(effect => effect.toLowerCase().includes(normalizedQuery)) ||
      drug.disorders.some(disorder => disorder.toLowerCase().includes(normalizedQuery))
    );
  });
};
