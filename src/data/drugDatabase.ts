
export interface DrugComposition {
  activeIngredient: string;
  strength: string;
}

export interface Pharmacokinetics {
  absorption: string;
  distribution: string;
  metabolism: string;
  elimination: string;
  halfLife: string;
  bioavailability: string;
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
  therapeuticClass: string;
  pharmacologicalClass: string;
  mechanism: string;
  indications: string[];
  contraindications: string[];
  warnings: string[];
  dosage: {
    adult: string;
    pediatric: string;
    elderly: string;
  };
  pharmacokinetics: Pharmacokinetics;
  drugInteractions: string[];
  monitoring: string[];
  pregnancyCategory: string;
  lactation: string;
  overdose: string;
  storage: string;
  availableStrengths: string[];
}

export const drugDatabase: Drug[] = [
  {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    brands: ['Tylenol', 'Panadol', 'Crocin', 'Dolo', 'Calpol', 'Fevadol'],
    composition: [{ activeIngredient: 'Paracetamol', strength: '500mg' }],
    sideEffects: ['Nausea', 'Stomach pain', 'Skin rash', 'Hepatotoxicity (overdose)', 'Thrombocytopenia (rare)'],
    dosageForms: ['Tablet', 'Syrup', 'Injection', 'Suppository', 'Oral drops', 'Effervescent tablet'],
    disorders: ['Pain', 'Fever', 'Headache', 'Dental pain', 'Musculoskeletal pain'],
    incompatibility: ['Alcohol', 'Warfarin', 'Carbamazepine', 'Phenytoin'],
    isPremium: false,
    category: 'Analgesic',
    therapeuticClass: 'Non-opioid analgesic and antipyretic',
    pharmacologicalClass: 'Para-aminophenol derivative',
    mechanism: 'Inhibits prostaglandin synthesis in CNS, blocks pain impulses peripherally',
    indications: ['Mild to moderate pain', 'Fever reduction', 'Headache', 'Toothache', 'Menstrual cramps'],
    contraindications: ['Severe hepatic impairment', 'Hypersensitivity to paracetamol'],
    warnings: ['Hepatotoxicity with overdose', 'Chronic alcohol use increases risk', 'Maximum daily dose 4g'],
    dosage: {
      adult: '500-1000mg every 4-6 hours, max 4g/day',
      pediatric: '10-15mg/kg every 4-6 hours, max 75mg/kg/day',
      elderly: 'Reduce dose in hepatic impairment'
    },
    pharmacokinetics: {
      absorption: 'Rapid and complete from GI tract',
      distribution: 'Widely distributed, 25% protein bound',
      metabolism: 'Hepatic conjugation with glucuronide and sulfate',
      elimination: 'Renal excretion of metabolites',
      halfLife: '1-4 hours',
      bioavailability: '63-89%'
    },
    drugInteractions: ['Warfarin (enhance anticoagulation)', 'Alcohol (hepatotoxicity)', 'Carbamazepine (reduce efficacy)'],
    monitoring: ['Liver function tests with long-term use', 'Signs of hepatotoxicity'],
    pregnancyCategory: 'Category B - Safe in pregnancy',
    lactation: 'Compatible with breastfeeding',
    overdose: 'N-acetylcysteine as antidote, supportive care, liver transplant if severe',
    storage: 'Store below 30°C, protect from moisture',
    availableStrengths: ['125mg', '250mg', '500mg', '650mg', '1000mg']
  },
  {
    name: 'Amoxicillin + Clavulanic Acid',
    genericName: 'Co-amoxiclav',
    brands: ['Augmentin', 'Clavam', 'Megaclav', 'Amoxyclav', 'Clavulin', 'Amoclan'],
    composition: [
      { activeIngredient: 'Amoxicillin', strength: '500mg' },
      { activeIngredient: 'Clavulanic Acid', strength: '125mg' }
    ],
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal pain', 'Skin rash', 'Vaginal candidiasis', 'Pseudomembranous colitis'],
    dosageForms: ['Tablet', 'Oral Suspension', 'Injection', 'Dry syrup', 'Extended release tablet'],
    disorders: ['Bacterial infections', 'Respiratory tract infections', 'UTI', 'Skin infections', 'Dental infections'],
    incompatibility: ['Probenecid', 'Allopurinol', 'Methotrexate'],
    isPremium: true,
    category: 'Antibiotic',
    therapeuticClass: 'Beta-lactam antibiotic with beta-lactamase inhibitor',
    pharmacologicalClass: 'Penicillin antibiotic combination',
    mechanism: 'Amoxicillin inhibits bacterial cell wall synthesis, clavulanic acid inhibits beta-lactamases',
    indications: ['Lower respiratory tract infections', 'Otitis media', 'Sinusitis', 'Skin and soft tissue infections', 'UTI'],
    contraindications: ['Penicillin allergy', 'Previous cholestatic jaundice with amoxicillin-clavulanate', 'Infectious mononucleosis'],
    warnings: ['C. difficile colitis risk', 'Hepatotoxicity', 'Rash in viral infections', 'Adjust dose in renal impairment'],
    dosage: {
      adult: '500/125mg every 8 hours or 875/125mg every 12 hours',
      pediatric: '20-40mg/kg/day of amoxicillin component in divided doses',
      elderly: 'Dose adjustment based on renal function'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally, food enhances absorption',
      distribution: 'Widely distributed, crosses placenta',
      metabolism: 'Minimal hepatic metabolism',
      elimination: 'Renal excretion unchanged',
      halfLife: '1-1.3 hours',
      bioavailability: '90%'
    },
    drugInteractions: ['Probenecid (increases levels)', 'Warfarin (enhance anticoagulation)', 'Methotrexate (toxicity)'],
    monitoring: ['Renal function', 'Liver function', 'Signs of superinfection', 'C. difficile colitis'],
    pregnancyCategory: 'Category B - Generally safe in pregnancy',
    lactation: 'Compatible, monitor infant for diarrhea and candidiasis',
    overdose: 'Supportive care, hemodialysis if severe renal impairment',
    storage: 'Store tablets at room temperature, suspension refrigerated after reconstitution',
    availableStrengths: ['250/125mg', '500/125mg', '875/125mg', '1000/62.5mg']
  },
  {
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brands: ['Lipitor', 'Atorva', 'Tonact', 'Storvas', 'Atocor', 'Lipvas'],
    composition: [{ activeIngredient: 'Atorvastatin Calcium', strength: '20mg' }],
    sideEffects: ['Muscle pain', 'Headache', 'Nausea', 'Diarrhea', 'Elevated liver enzymes', 'Rhabdomyolysis (rare)'],
    dosageForms: ['Tablet', 'Film-coated tablet'],
    disorders: ['Hypercholesterolemia', 'Mixed dyslipidemia', 'Cardiovascular disease prevention'],
    incompatibility: ['Cyclosporine', 'Gemfibrozil', 'Erythromycin', 'Grapefruit juice'],
    isPremium: true,
    category: 'Cardiovascular',
    therapeuticClass: 'Antilipemic agent',
    pharmacologicalClass: 'HMG-CoA reductase inhibitor (Statin)',
    mechanism: 'Inhibits HMG-CoA reductase, rate-limiting enzyme in cholesterol synthesis',
    indications: ['Primary hypercholesterolemia', 'Mixed dyslipidemia', 'Primary prevention of CVD', 'Secondary prevention post-MI'],
    contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding', 'Hypersensitivity'],
    warnings: ['Myopathy and rhabdomyolysis', 'Hepatotoxicity', 'Diabetes mellitus risk', 'Drug interactions'],
    dosage: {
      adult: '10-80mg once daily, start 10-20mg',
      pediatric: 'Not recommended <10 years, 10-20mg daily for familial hypercholesterolemia',
      elderly: 'Start with lower doses'
    },
    pharmacokinetics: {
      absorption: 'Rapidly absorbed, food decreases absorption',
      distribution: '98% protein bound, limited tissue distribution',
      metabolism: 'Extensive hepatic metabolism via CYP3A4',
      elimination: 'Primarily biliary excretion',
      halfLife: '14 hours for parent drug, 20-30 hours for active metabolites',
      bioavailability: '12%'
    },
    drugInteractions: ['CYP3A4 inhibitors increase levels', 'Warfarin (monitor INR)', 'Digoxin levels may increase'],
    monitoring: ['Lipid profile', 'Liver function tests', 'CPK if muscle symptoms', 'Blood glucose'],
    pregnancyCategory: 'Category X - Contraindicated in pregnancy',
    lactation: 'Contraindicated in breastfeeding',
    overdose: 'Supportive care, monitor for rhabdomyolysis',
    storage: 'Store at room temperature, protect from moisture',
    availableStrengths: ['10mg', '20mg', '40mg', '80mg']
  },
  {
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    brands: ['Glucophage', 'Glycomet', 'Obimet', 'Dianol', 'Formet', 'Bigomet'],
    composition: [{ activeIngredient: 'Metformin HCl', strength: '500mg' }],
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Metallic taste', 'Vitamin B12 deficiency', 'Lactic acidosis (rare)'],
    dosageForms: ['Tablet', 'Extended-release tablet', 'Oral solution'],
    disorders: ['Type 2 diabetes mellitus', 'Polycystic ovary syndrome', 'Prediabetes'],
    incompatibility: ['Contrast agents', 'Alcohol', 'Cimetidine'],
    isPremium: true,
    category: 'Antidiabetic',
    therapeuticClass: 'Biguanide antidiabetic',
    pharmacologicalClass: 'Insulin sensitizer',
    mechanism: 'Decreases hepatic glucose production, increases insulin sensitivity, delays glucose absorption',
    indications: ['Type 2 diabetes mellitus', 'PCOS', 'Prediabetes prevention'],
    contraindications: ['Renal impairment (eGFR <30)', 'Metabolic acidosis', 'Diabetic ketoacidosis', 'Severe liver disease'],
    warnings: ['Lactic acidosis risk', 'Vitamin B12 deficiency', 'Contrast-induced nephropathy', 'Surgery/illness discontinuation'],
    dosage: {
      adult: '500mg twice daily, increase gradually to max 2000mg daily',
      pediatric: '>10 years: 500mg twice daily, max 2000mg daily',
      elderly: 'Use with caution, monitor renal function'
    },
    pharmacokinetics: {
      absorption: '50-60% absorbed from GI tract',
      distribution: 'Negligible protein binding, distributes to tissues',
      metabolism: 'Not metabolized',
      elimination: 'Renal excretion unchanged',
      halfLife: '6.2 hours',
      bioavailability: '50-60%'
    },
    drugInteractions: ['Contrast agents (nephrotoxicity)', 'Alcohol (lactic acidosis)', 'Cationic drugs compete for elimination'],
    monitoring: ['Renal function', 'Vitamin B12 levels', 'Blood glucose', 'Signs of lactic acidosis'],
    pregnancyCategory: 'Category B - May be used in pregnancy',
    lactation: 'Present in breast milk, generally compatible',
    overdose: 'Risk of lactic acidosis, supportive care, hemodialysis',
    storage: 'Store at room temperature, protect from moisture',
    availableStrengths: ['500mg', '850mg', '1000mg', 'XR 500mg', 'XR 750mg']
  },
  {
    name: 'Losartan + Hydrochlorothiazide',
    genericName: 'Losartan/HCTZ',
    brands: ['Hyzaar', 'Losazide', 'Losar-H', 'Cozaar Plus', 'Losaheb-H'],
    composition: [
      { activeIngredient: 'Losartan Potassium', strength: '50mg' },
      { activeIngredient: 'Hydrochlorothiazide', strength: '12.5mg' }
    ],
    sideEffects: ['Dizziness', 'Fatigue', 'Hyperkalemia', 'Hypotension', 'Electrolyte imbalance', 'Photosensitivity'],
    dosageForms: ['Tablet', 'Film-coated tablet'],
    disorders: ['Hypertension', 'Heart failure', 'Diabetic nephropathy', 'Stroke prevention'],
    incompatibility: ['Lithium', 'NSAIDs', 'Potassium supplements', 'ACE inhibitors'],
    isPremium: true,
    category: 'Antihypertensive',
    therapeuticClass: 'ARB + Thiazide diuretic combination',
    pharmacologicalClass: 'Angiotensin receptor blocker with diuretic',
    mechanism: 'Losartan blocks AT1 receptors, HCTZ inhibits sodium reabsorption in distal tubule',
    indications: ['Hypertension', 'Diabetic nephropathy', 'Heart failure', 'Cardiovascular risk reduction'],
    contraindications: ['Pregnancy', 'Anuria', 'Hypersensitivity to sulfonamides', 'Severe renal/hepatic impairment'],
    warnings: ['Hyperkalemia', 'Hypotension', 'Renal impairment', 'Electrolyte imbalance', 'Photosensitivity'],
    dosage: {
      adult: '50/12.5mg once daily, may increase to 100/25mg',
      pediatric: 'Safety not established',
      elderly: 'Start with lower doses, monitor closely'
    },
    pharmacokinetics: {
      absorption: 'Losartan 33% bioavailable, HCTZ 65-75%',
      distribution: 'Losartan 99% protein bound, HCTZ 68%',
      metabolism: 'Losartan hepatic to active metabolite, HCTZ minimal',
      elimination: 'Both primarily renal',
      halfLife: 'Losartan 2h, active metabolite 6-9h; HCTZ 5.6-14.8h',
      bioavailability: 'Losartan 33%, HCTZ 65-75%'
    },
    drugInteractions: ['Lithium toxicity', 'NSAIDs reduce efficacy', 'Potassium-sparing drugs increase hyperkalemia risk'],
    monitoring: ['Blood pressure', 'Electrolytes', 'Renal function', 'Liver function'],
    pregnancyCategory: 'Category D - Avoid in pregnancy',
    lactation: 'Unknown if excreted, use caution',
    overdose: 'Hypotension, electrolyte imbalance, supportive care',
    storage: 'Store at room temperature, protect from moisture and light',
    availableStrengths: ['50/12.5mg', '100/12.5mg', '100/25mg']
  },
  {
    name: 'Amlodipine + Atorvastatin',
    genericName: 'Amlodipine/Atorvastatin',
    brands: ['Caduet', 'Amlodac-AT', 'Stamlo-A', 'Amcard-AT'],
    composition: [
      { activeIngredient: 'Amlodipine', strength: '5mg' },
      { activeIngredient: 'Atorvastatin', strength: '10mg' }
    ],
    sideEffects: ['Muscle pain', 'Peripheral edema', 'Headache', 'Fatigue', 'Flushing', 'Elevated liver enzymes'],
    dosageForms: ['Tablet', 'Film-coated tablet'],
    disorders: ['Hypertension', 'Hyperlipidemia', 'Coronary artery disease', 'Cardiovascular risk reduction'],
    incompatibility: ['CYP3A4 inhibitors', 'Gemfibrozil', 'Warfarin'],
    isPremium: true,
    category: 'Cardiovascular',
    therapeuticClass: 'Calcium channel blocker + HMG-CoA reductase inhibitor',
    pharmacologicalClass: 'Antihypertensive and antilipemic combination',
    mechanism: 'Amlodipine blocks calcium channels, atorvastatin inhibits HMG-CoA reductase',
    indications: ['Hypertension with dyslipidemia', 'CAD with multiple risk factors', 'Primary prevention in high-risk patients'],
    contraindications: ['Pregnancy', 'Breastfeeding', 'Active liver disease', 'Cardiogenic shock'],
    warnings: ['Hepatotoxicity', 'Myopathy', 'Hypotension', 'Heart failure exacerbation'],
    dosage: {
      adult: '2.5-10mg/10-80mg once daily, titrate based on response',
      pediatric: 'Not recommended',
      elderly: 'Start with lower amlodipine doses'
    },
    pharmacokinetics: {
      absorption: 'Both well absorbed orally',
      distribution: 'Amlodipine 93% bound, atorvastatin 98% bound',
      metabolism: 'Both hepatic via CYP3A4',
      elimination: 'Primarily hepatic and biliary',
      halfLife: 'Amlodipine 30-50h, atorvastatin 14h',
      bioavailability: 'Amlodipine 64-90%, atorvastatin 12%'
    },
    drugInteractions: ['CYP3A4 inhibitors increase both drug levels', 'Simvastatin contraindicated', 'Monitor digoxin levels'],
    monitoring: ['Blood pressure', 'Lipid profile', 'Liver function', 'CPK if muscle symptoms'],
    pregnancyCategory: 'Category X - Contraindicated in pregnancy',
    lactation: 'Contraindicated in breastfeeding',
    overdose: 'Hypotension, reflex tachycardia, supportive care',
    storage: 'Store at room temperature, protect from moisture',
    availableStrengths: ['2.5/10mg', '5/10mg', '5/20mg', '10/10mg', '10/20mg', '10/40mg']
  },
  {
    name: 'Tramadol + Paracetamol',
    genericName: 'Tramadol/Acetaminophen',
    brands: ['Ultracet', 'Dolopar Plus', 'Tramacet', 'Tapal-P', 'Dolotram'],
    composition: [
      { activeIngredient: 'Tramadol HCl', strength: '37.5mg' },
      { activeIngredient: 'Paracetamol', strength: '325mg' }
    ],
    sideEffects: ['Drowsiness', 'Nausea', 'Constipation', 'Dizziness', 'Dry mouth', 'Seizures (high doses)'],
    dosageForms: ['Tablet', 'Film-coated tablet'],
    disorders: ['Moderate to severe pain', 'Post-operative pain', 'Chronic pain', 'Dental pain'],
    incompatibility: ['MAO inhibitors', 'SSRIs', 'Tricyclic antidepressants', 'Alcohol'],
    isPremium: true,
    category: 'Analgesic',
    therapeuticClass: 'Opioid analgesic + Non-opioid analgesic combination',
    pharmacologicalClass: 'Centrally acting analgesic combination',
    mechanism: 'Tramadol: opioid receptor agonist + monoamine reuptake inhibition; Paracetamol: COX inhibition',
    indications: ['Moderate to severe acute pain', 'Chronic pain management', 'Post-surgical pain'],
    contraindications: ['Significant respiratory depression', 'Acute intoxication', 'MAO inhibitor use', 'Severe hepatic impairment'],
    warnings: ['Seizure risk', 'Serotonin syndrome', 'Respiratory depression', 'Addiction potential', 'Hepatotoxicity'],
    dosage: {
      adult: '1-2 tablets every 4-6 hours, max 8 tablets/day',
      pediatric: 'Not recommended <12 years',
      elderly: 'Reduce dose and increase dosing interval'
    },
    pharmacokinetics: {
      absorption: 'Rapidly absorbed, food may delay but not reduce absorption',
      distribution: 'Tramadol 20% bound, paracetamol 25% bound',
      metabolism: 'Tramadol hepatic via CYP2D6, paracetamol glucuronidation',
      elimination: 'Renal excretion of metabolites',
      halfLife: 'Tramadol 5-7h, paracetamol 1-4h',
      bioavailability: 'Tramadol 75%, paracetamol 85%'
    },
    drugInteractions: ['MAO inhibitors (serotonin syndrome)', 'Warfarin (bleeding risk)', 'CNS depressants (additive effects)'],
    monitoring: ['Pain relief', 'Respiratory status', 'Signs of abuse', 'Liver function'],
    pregnancyCategory: 'Category C - Use only if benefits outweigh risks',
    lactation: 'Present in breast milk, avoid if possible',
    overdose: 'Respiratory depression, seizures, hepatotoxicity; naloxone may help',
    storage: 'Store at room temperature, keep secure due to abuse potential',
    availableStrengths: ['37.5/325mg', '75/650mg']
  },
  {
    name: 'Cetirizine + Pseudoephedrine',
    genericName: 'Cetirizine/Pseudoephedrine',
    brands: ['Zyrtec-D', 'Alerid-D', 'Cetrizet-D', 'Okacet-D'],
    composition: [
      { activeIngredient: 'Cetirizine HCl', strength: '5mg' },
      { activeIngredient: 'Pseudoephedrine HCl', strength: '120mg' }
    ],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Insomnia', 'Nervousness', 'Headache', 'Palpitations'],
    dosageForms: ['Extended Release Tablet', 'Immediate release tablet'],
    disorders: ['Allergic rhinitis', 'Nasal congestion', 'Hay fever', 'Seasonal allergies'],
    incompatibility: ['MAO inhibitors', 'Antihypertensives', 'Beta-blockers'],
    isPremium: true,
    category: 'Antihistamine',
    therapeuticClass: 'Antihistamine + Decongestant combination',
    pharmacologicalClass: 'H1 antihistamine with sympathomimetic decongestant',
    mechanism: 'Cetirizine blocks H1 receptors, pseudoephedrine stimulates alpha-adrenergic receptors',
    indications: ['Seasonal allergic rhinitis with congestion', 'Perennial allergic rhinitis', 'Chronic urticaria with congestion'],
    contraindications: ['Severe hypertension', 'Severe CAD', 'MAO inhibitor use', 'Hypersensitivity'],
    warnings: ['Cardiovascular effects', 'CNS stimulation', 'Prostatic hypertrophy', 'Diabetes mellitus'],
    dosage: {
      adult: '1 tablet twice daily, may reduce to once daily',
      pediatric: 'Not recommended <12 years',
      elderly: 'Monitor for cardiovascular effects'
    },
    pharmacokinetics: {
      absorption: 'Both rapidly absorbed, food doesn\'t affect significantly',
      distribution: 'Cetirizine 93% bound, pseudoephedrine minimal binding',
      metabolism: 'Cetirizine minimal, pseudoephedrine hepatic',
      elimination: 'Cetirizine renal unchanged, pseudoephedrine renal',
      halfLife: 'Cetirizine 8.3h, pseudoephedrine 5.5-8h',
      bioavailability: 'Cetirizine >95%, pseudoephedrine 38%'
    },
    drugInteractions: ['Antihypertensives (reduce efficacy)', 'CNS depressants (with cetirizine)', 'Digoxin (arrhythmia risk)'],
    monitoring: ['Blood pressure', 'Heart rate', 'Symptom relief', 'Sleep disturbances'],
    pregnancyCategory: 'Category B - Generally safe but avoid in first trimester',
    lactation: 'Both drugs enter breast milk, avoid if possible',
    overdose: 'Hypertensive crisis possible, supportive care, avoid beta-blockers',
    storage: 'Store at room temperature, protect from moisture',
    availableStrengths: ['5/120mg', '10/240mg']
  }
];

// Auto-correct functionality with enhanced algorithm
export const getAutoCorrectSuggestion = (input: string): string | null => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Enhanced Levenshtein distance calculation
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
  const maxDistance = Math.max(2, Math.floor(normalizedInput.length * 0.4));

  drugDatabase.forEach(drug => {
    // Check drug name
    const drugName = drug.name.toLowerCase();
    const distance = levenshteinDistance(normalizedInput, drugName);
    
    if (distance < minDistance && distance <= maxDistance) {
      minDistance = distance;
      bestMatch = drug.name;
    }

    // Check generic name
    const genericDistance = levenshteinDistance(normalizedInput, drug.genericName.toLowerCase());
    if (genericDistance < minDistance && genericDistance <= maxDistance) {
      minDistance = genericDistance;
      bestMatch = drug.genericName;
    }

    // Check brands
    drug.brands.forEach(brand => {
      const brandName = brand.toLowerCase();
      const brandDistance = levenshteinDistance(normalizedInput, brandName);
      if (brandDistance < minDistance && brandDistance <= maxDistance) {
        minDistance = brandDistance;
        bestMatch = brand;
      }
    });

    // Check therapeutic class
    const therapeuticDistance = levenshteinDistance(normalizedInput, drug.therapeuticClass.toLowerCase());
    if (therapeuticDistance < minDistance && therapeuticDistance <= maxDistance) {
      minDistance = therapeuticDistance;
      bestMatch = drug.name;
    }
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
      drug.disorders.some(disorder => disorder.toLowerCase().includes(normalizedQuery)) ||
      drug.therapeuticClass.toLowerCase().includes(normalizedQuery) ||
      drug.pharmacologicalClass.toLowerCase().includes(normalizedQuery) ||
      drug.indications.some(indication => indication.toLowerCase().includes(normalizedQuery)) ||
      drug.category.toLowerCase().includes(normalizedQuery)
    );
  });
};
