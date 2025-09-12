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
  },
  {
    name: 'Hydroxyzine',
    genericName: 'Hydroxyzine Hydrochloride',
    brands: ['Atarax', 'Vistaril', 'Hyzine', 'Hydroxyzine HCl'],
    composition: [{ activeIngredient: 'Hydroxyzine HCl', strength: '25mg' }],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Constipation', 'Urinary retention'],
    dosageForms: ['Tablet', 'Syrup', 'Injection'],
    disorders: ['Anxiety', 'Allergic reactions', 'Urticaria', 'Pruritus', 'Insomnia'],
    incompatibility: ['CNS depressants', 'Alcohol', 'MAO inhibitors'],
    category: 'Antihistamine',
    therapeuticClass: 'H1 antihistamine with anxiolytic properties',
    pharmacologicalClass: 'Piperazine antihistamine',
    mechanism: 'Blocks H1 histamine receptors, has anticholinergic and CNS depressant effects',
    indications: ['Anxiety disorders', 'Allergic conditions', 'Pruritus', 'Sedation'],
    contraindications: ['Hypersensitivity', 'Early pregnancy', 'Prostatic hypertrophy'],
    warnings: ['Sedation', 'Anticholinergic effects', 'QT prolongation risk'],
    dosage: {
      adult: '25-100mg 3-4 times daily',
      pediatric: '0.6mg/kg/day in divided doses',
      elderly: 'Reduce dose by 50%'
    },
    pharmacokinetics: {
      absorption: 'Rapidly absorbed from GI tract',
      distribution: 'Widely distributed, crosses placenta',
      metabolism: 'Hepatic metabolism to cetirizine',
      elimination: 'Renal excretion',
      halfLife: '14-25 hours',
      bioavailability: '80%'
    },
    drugInteractions: ['CNS depressants', 'Anticholinergics', 'QT prolonging drugs'],
    monitoring: ['Sedation level', 'Anticholinergic effects', 'QT interval'],
    pregnancyCategory: 'Category C - Use with caution',
    lactation: 'Enters breast milk, avoid use',
    overdose: 'Supportive care, avoid stimulants',
    storage: 'Store at room temperature',
    availableStrengths: ['10mg', '25mg', '50mg', '100mg']
  },
  {
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    brands: ['Bayer', 'Ecosprin', 'Disprin', 'Aspro', 'Loprin'],
    composition: [{ activeIngredient: 'Acetylsalicylic Acid', strength: '75mg' }],
    sideEffects: ['Gastric irritation', 'Bleeding', 'Tinnitus', 'Nausea', 'Reye syndrome in children'],
    dosageForms: ['Tablet', 'Enteric coated tablet', 'Dispersible tablet'],
    disorders: ['Cardiovascular protection', 'Pain', 'Fever', 'Inflammation'],
    incompatibility: ['Warfarin', 'Methotrexate', 'ACE inhibitors'],
    category: 'Antiplatelet',
    therapeuticClass: 'NSAID with antiplatelet activity',
    pharmacologicalClass: 'Salicylate',
    mechanism: 'Irreversibly inhibits COX-1 and COX-2, prevents platelet aggregation',
    indications: ['MI prevention', 'Stroke prevention', 'Pain relief', 'Anti-inflammatory'],
    contraindications: ['Active bleeding', 'Peptic ulcer', 'Children with viral infections', 'Severe renal impairment'],
    warnings: ['GI bleeding risk', 'Reye syndrome in children', 'Increased bleeding risk'],
    dosage: {
      adult: '75-300mg daily for cardioprotection, 300-900mg for pain',
      pediatric: 'Avoid in <16 years due to Reye syndrome risk',
      elderly: 'Monitor for GI and renal effects'
    },
    pharmacokinetics: {
      absorption: 'Rapidly absorbed from stomach and small intestine',
      distribution: '50-80% protein bound',
      metabolism: 'Hepatic hydrolysis to salicylic acid',
      elimination: 'Renal excretion',
      halfLife: '15-20 minutes for aspirin, 2-3 hours for salicylates',
      bioavailability: '50-75%'
    },
    drugInteractions: ['Warfarin (bleeding)', 'Methotrexate (toxicity)', 'ACE inhibitors'],
    monitoring: ['Bleeding time', 'Renal function', 'Liver function'],
    pregnancyCategory: 'Category D - Avoid in third trimester',
    lactation: 'Compatible in low doses',
    overdose: 'Activated charcoal, alkaline diuresis, supportive care',
    storage: 'Store in cool, dry place',
    availableStrengths: ['75mg', '100mg', '150mg', '300mg', '325mg']
  },
  {
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    brands: ['Amoxil', 'Novamox', 'Polymox', 'Trimox'],
    composition: [{ activeIngredient: 'Amoxicillin', strength: '500mg' }],
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Vomiting', 'Candidiasis'],
    dosageForms: ['Capsule', 'Tablet', 'Suspension', 'Injection'],
    disorders: ['Bacterial infections', 'Respiratory infections', 'UTI', 'Skin infections'],
    incompatibility: ['Probenecid', 'Allopurinol', 'Oral contraceptives'],
    category: 'Antibiotic',
    therapeuticClass: 'Beta-lactam antibiotic',
    pharmacologicalClass: 'Penicillin',
    mechanism: 'Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins',
    indications: ['Strep throat', 'Pneumonia', 'UTI', 'Skin infections', 'H. pylori eradication'],
    contraindications: ['Penicillin allergy', 'Infectious mononucleosis'],
    warnings: ['Allergic reactions', 'C. difficile colitis', 'Rash in viral infections'],
    dosage: {
      adult: '250-500mg every 8 hours or 500-875mg every 12 hours',
      pediatric: '20-40mg/kg/day in divided doses',
      elderly: 'Adjust dose based on renal function'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally, not affected by food',
      distribution: 'Widely distributed, crosses placenta',
      metabolism: 'Minimal hepatic metabolism',
      elimination: 'Renal excretion unchanged',
      halfLife: '1-1.3 hours',
      bioavailability: '75-90%'
    },
    drugInteractions: ['Probenecid increases levels', 'May reduce OCP effectiveness'],
    monitoring: ['Signs of superinfection', 'Allergic reactions', 'Renal function'],
    pregnancyCategory: 'Category B - Safe in pregnancy',
    lactation: 'Compatible with breastfeeding',
    overdose: 'Generally well tolerated, supportive care',
    storage: 'Store capsules at room temperature, suspension refrigerated',
    availableStrengths: ['125mg', '250mg', '500mg', '875mg']
  },
  {
    name: 'Potassium Clavulanate',
    genericName: 'Clavulanic Acid Potassium',
    brands: ['Used in combination with Amoxicillin as Augmentin'],
    composition: [{ activeIngredient: 'Clavulanic Acid', strength: '125mg' }],
    sideEffects: ['GI upset', 'Diarrhea', 'Hepatotoxicity', 'Skin reactions'],
    dosageForms: ['Tablet (in combination)', 'Suspension (in combination)'],
    disorders: ['Beta-lactamase producing bacterial infections'],
    incompatibility: ['Probenecid', 'Allopurinol'],
    category: 'Beta-lactamase inhibitor',
    therapeuticClass: 'Beta-lactamase inhibitor',
    pharmacologicalClass: 'Clavulanic acid derivative',
    mechanism: 'Irreversibly inhibits beta-lactamases, protecting penicillins from degradation',
    indications: ['Used with penicillins for resistant organisms'],
    contraindications: ['Previous cholestatic jaundice with amoxicillin-clavulanate'],
    warnings: ['Hepatotoxicity', 'GI effects more common than with amoxicillin alone'],
    dosage: {
      adult: 'Always used in combination, typically 125mg with 500mg amoxicillin',
      pediatric: 'Combination dosing based on amoxicillin component',
      elderly: 'Monitor hepatic and renal function'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally',
      distribution: 'Similar to amoxicillin',
      metabolism: 'Extensive hepatic metabolism',
      elimination: 'Renal excretion',
      halfLife: '1 hour',
      bioavailability: '60%'
    },
    drugInteractions: ['Similar to amoxicillin combinations'],
    monitoring: ['Liver function', 'Signs of hepatotoxicity'],
    pregnancyCategory: 'Category B - Generally safe',
    lactation: 'Compatible when used with amoxicillin',
    overdose: 'Supportive care, monitor liver function',
    storage: 'Store according to combination product requirements',
    availableStrengths: ['62.5mg', '125mg', '200mg']
  },
  {
    name: 'Cyanocobalamin',
    genericName: 'Vitamin B12',
    brands: ['Cobal', 'Neurobion', 'B-12', 'Cyanokit'],
    composition: [{ activeIngredient: 'Cyanocobalamin', strength: '1000mcg' }],
    sideEffects: ['Injection site reactions', 'Nausea', 'Headache', 'Anxiety'],
    dosageForms: ['Tablet', 'Injection', 'Sublingual tablet', 'Nasal spray'],
    disorders: ['B12 deficiency', 'Pernicious anemia', 'Megaloblastic anemia'],
    incompatibility: ['Chloramphenicol', 'Colchicine'],
    category: 'Vitamin',
    therapeuticClass: 'Water-soluble vitamin',
    pharmacologicalClass: 'Cobalamin',
    mechanism: 'Essential cofactor for DNA synthesis and neurological function',
    indications: ['B12 deficiency', 'Pernicious anemia', 'Neurological disorders'],
    contraindications: ['Hypersensitivity to cobalt'],
    warnings: ['Hypokalemia may occur with treatment', 'Monitor potassium levels'],
    dosage: {
      adult: '1000mcg IM monthly for deficiency, 2.4mcg daily oral maintenance',
      pediatric: '0.4-2.8mcg daily based on age',
      elderly: 'Higher requirements due to absorption issues'
    },
    pharmacokinetics: {
      absorption: 'Requires intrinsic factor for absorption',
      distribution: 'Stored primarily in liver',
      metabolism: 'Converted to active methylcobalamin',
      elimination: 'Biliary and renal excretion',
      halfLife: '6 days',
      bioavailability: '56% oral in normal individuals'
    },
    drugInteractions: ['Metformin reduces absorption', 'PPIs reduce absorption'],
    monitoring: ['B12 levels', 'CBC', 'Potassium levels'],
    pregnancyCategory: 'Category A - Safe in pregnancy',
    lactation: 'Compatible and recommended',
    overdose: 'Water-soluble, excess excreted in urine',
    storage: 'Protect from light, store at room temperature',
    availableStrengths: ['100mcg', '500mcg', '1000mcg', '5000mcg']
  },
  {
    name: 'Ferrous Fumarate',
    genericName: 'Iron Fumarate',
    brands: ['Feostat', 'Hemocyte', 'Ircon', 'Ferro-Sequels'],
    composition: [{ activeIngredient: 'Ferrous Fumarate', strength: '200mg' }],
    sideEffects: ['Constipation', 'Nausea', 'Dark stools', 'Abdominal cramps', 'Diarrhea'],
    dosageForms: ['Tablet', 'Capsule', 'Liquid'],
    disorders: ['Iron deficiency anemia', 'Iron deficiency'],
    incompatibility: ['Tetracyclines', 'Quinolones', 'PPIs', 'Antacids'],
    category: 'Mineral supplement',
    therapeuticClass: 'Iron supplement',
    pharmacologicalClass: 'Iron salt',
    mechanism: 'Replaces iron stores, essential for hemoglobin synthesis',
    indications: ['Iron deficiency anemia', 'Prevention of iron deficiency'],
    contraindications: ['Hemochromatosis', 'Hemosiderosis', 'Active peptic ulcer'],
    warnings: ['GI irritation', 'Overdose toxicity in children', 'Drug interactions'],
    dosage: {
      adult: '200mg 1-3 times daily, preferably on empty stomach',
      pediatric: '3-6mg/kg/day elemental iron',
      elderly: 'Start with lower doses to minimize GI effects'
    },
    pharmacokinetics: {
      absorption: '10-15% absorbed, enhanced by vitamin C',
      distribution: 'Stored in liver, spleen, bone marrow',
      metabolism: 'Incorporated into hemoglobin',
      elimination: 'Minimal excretion, recycled',
      halfLife: 'Not applicable for iron',
      bioavailability: '10-15% of elemental iron'
    },
    drugInteractions: ['Reduces absorption of tetracyclines, quinolones', 'Antacids reduce iron absorption'],
    monitoring: ['Hemoglobin', 'Hematocrit', 'Iron studies', 'GI tolerance'],
    pregnancyCategory: 'Category A - Safe and needed in pregnancy',
    lactation: 'Compatible, monitor infant iron levels',
    overdose: 'Potentially fatal in children, use deferoxamine',
    storage: 'Store in tight container, away from children',
    availableStrengths: ['200mg', '325mg', '65mg elemental iron']
  },
  {
    name: 'Alpha Lipoic Acid',
    genericName: 'Thioctic Acid',
    brands: ['Thioctacid', 'Alpha-Lipon', 'Lipoicin'],
    composition: [{ activeIngredient: 'Alpha Lipoic Acid', strength: '300mg' }],
    sideEffects: ['Nausea', 'Skin rash', 'Hypoglycemia', 'Headache'],
    dosageForms: ['Tablet', 'Capsule', 'Injection'],
    disorders: ['Diabetic neuropathy', 'Antioxidant support'],
    incompatibility: ['Insulin', 'Oral hypoglycemics'],
    category: 'Antioxidant',
    therapeuticClass: 'Antioxidant and metabolic agent',
    pharmacologicalClass: 'Thioctic acid derivative',
    mechanism: 'Powerful antioxidant, regenerates vitamins C and E, improves glucose uptake',
    indications: ['Diabetic peripheral neuropathy', 'Antioxidant support'],
    contraindications: ['Hypersensitivity'],
    warnings: ['May cause hypoglycemia in diabetics', 'Monitor blood glucose'],
    dosage: {
      adult: '300-600mg daily, preferably on empty stomach',
      pediatric: 'Safety not established',
      elderly: 'Standard adult dosing'
    },
    pharmacokinetics: {
      absorption: '30% oral bioavailability',
      distribution: 'Widely distributed',
      metabolism: 'Hepatic metabolism',
      elimination: 'Renal excretion of metabolites',
      halfLife: '30 minutes',
      bioavailability: '30%'
    },
    drugInteractions: ['May enhance hypoglycemic effects of antidiabetic drugs'],
    monitoring: ['Blood glucose in diabetics', 'Neuropathy symptoms'],
    pregnancyCategory: 'Category C - Use with caution',
    lactation: 'Unknown excretion in breast milk',
    overdose: 'Generally well tolerated, supportive care',
    storage: 'Store in cool, dry place',
    availableStrengths: ['100mg', '200mg', '300mg', '600mg']
  },
  {
    name: 'Chromium Picolinate',
    genericName: 'Chromium Picolinate',
    brands: ['Chromax', 'ChromeMate'],
    composition: [{ activeIngredient: 'Chromium Picolinate', strength: '200mcg' }],
    sideEffects: ['Headache', 'Insomnia', 'Mood changes', 'GI upset'],
    dosageForms: ['Tablet', 'Capsule'],
    disorders: ['Glucose intolerance', 'Metabolic support'],
    incompatibility: ['Antacids', 'PPIs'],
    category: 'Mineral supplement',
    therapeuticClass: 'Trace mineral supplement',
    pharmacologicalClass: 'Chromium supplement',
    mechanism: 'Enhances insulin action, improves glucose tolerance',
    indications: ['Type 2 diabetes support', 'Glucose intolerance'],
    contraindications: ['Hypersensitivity to chromium'],
    warnings: ['May affect blood glucose levels', 'Limited evidence for efficacy'],
    dosage: {
      adult: '200-400mcg daily with meals',
      pediatric: 'Not recommended',
      elderly: 'Standard adult dosing'
    },
    pharmacokinetics: {
      absorption: '0.4-2.5% absorbed',
      distribution: 'Concentrated in liver, kidney, spleen',
      metabolism: 'Not metabolized',
      elimination: 'Primarily renal excretion',
      halfLife: 'Not well defined',
      bioavailability: '0.4-2.5%'
    },
    drugInteractions: ['May enhance hypoglycemic effects'],
    monitoring: ['Blood glucose levels', 'Renal function'],
    pregnancyCategory: 'Category C - Use with caution',
    lactation: 'Unknown safety',
    overdose: 'Rare, supportive care',
    storage: 'Store at room temperature',
    availableStrengths: ['200mcg', '400mcg']
  },
  {
    name: 'Methylcobalamin',
    genericName: 'Methylcobalamin',
    brands: ['Methycobal', 'Mecoblend', 'Nervijen'],
    composition: [{ activeIngredient: 'Methylcobalamin', strength: '500mcg' }],
    sideEffects: ['Injection site pain', 'Nausea', 'Headache', 'Dizziness'],
    dosageForms: ['Tablet', 'Injection', 'Sublingual tablet'],
    disorders: ['B12 deficiency', 'Peripheral neuropathy', 'Neurological disorders'],
    incompatibility: ['Chloramphenicol', 'Heavy metals'],
    category: 'Vitamin',
    therapeuticClass: 'Active form of Vitamin B12',
    pharmacologicalClass: 'Methylcobalamin',
    mechanism: 'Active coenzyme form of B12, directly involved in methylation reactions',
    indications: ['Diabetic neuropathy', 'B12 deficiency', 'Neurological support'],
    contraindications: ['Hypersensitivity to cobalt'],
    warnings: ['Monitor potassium levels during initial treatment'],
    dosage: {
      adult: '500-1500mcg daily or 1500mcg IM weekly',
      pediatric: 'Based on clinical need and age',
      elderly: 'Standard adult dosing'
    },
    pharmacokinetics: {
      absorption: 'Better absorbed than cyanocobalamin',
      distribution: 'Concentrated in liver and nervous tissue',
      metabolism: 'Direct utilization as coenzyme',
      elimination: 'Biliary and renal excretion',
      halfLife: '6 days',
      bioavailability: 'Higher than cyanocobalamin'
    },
    drugInteractions: ['Metformin may reduce B12 levels'],
    monitoring: ['B12 levels', 'Neurological symptoms', 'CBC'],
    pregnancyCategory: 'Category A - Safe in pregnancy',
    lactation: 'Compatible and beneficial',
    overdose: 'Water-soluble, excess excreted',
    storage: 'Protect from light, store at room temperature',
    availableStrengths: ['500mcg', '1000mcg', '1500mcg']
  },
  {
    name: 'Magnesium',
    genericName: 'Magnesium Supplement',
    brands: ['Mag-Ox', 'Magnesium Oxide', 'Slow-Mag'],
    composition: [{ activeIngredient: 'Magnesium Oxide', strength: '400mg' }],
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal cramping', 'Hypermagnesemia'],
    dosageForms: ['Tablet', 'Capsule', 'Liquid', 'Injection'],
    disorders: ['Magnesium deficiency', 'Muscle cramps', 'Constipation'],
    incompatibility: ['Tetracyclines', 'Quinolones', 'Bisphosphonates'],
    category: 'Mineral supplement',
    therapeuticClass: 'Mineral supplement',
    pharmacologicalClass: 'Magnesium salt',
    mechanism: 'Essential cofactor in >300 enzymatic reactions',
    indications: ['Hypomagnesemia', 'Muscle cramps', 'Constipation', 'Migraine prevention'],
    contraindications: ['Severe renal impairment', 'Heart block'],
    warnings: ['Diarrhea with high doses', 'Renal impairment'],
    dosage: {
      adult: '400-800mg daily, divided doses with meals',
      pediatric: '3-6mg/kg/day',
      elderly: 'Monitor renal function'
    },
    pharmacokinetics: {
      absorption: '30-50% absorbed in small intestine',
      distribution: '60% in bone, 39% intracellular',
      metabolism: 'Not metabolized',
      elimination: 'Renal excretion',
      halfLife: 'Not applicable',
      bioavailability: '30-50%'
    },
    drugInteractions: ['Reduces absorption of tetracyclines, quinolones'],
    monitoring: ['Serum magnesium', 'Renal function', 'GI tolerance'],
    pregnancyCategory: 'Category A - Safe in pregnancy',
    lactation: 'Compatible',
    overdose: 'Hypermagnesemia, supportive care',
    storage: 'Store in dry place',
    availableStrengths: ['200mg', '400mg', '500mg']
  },
  {
    name: 'Promethazine',
    genericName: 'Promethazine Hydrochloride',
    brands: ['Phenergan', 'Promethegan', 'Avomine'],
    composition: [{ activeIngredient: 'Promethazine HCl', strength: '25mg' }],
    sideEffects: ['Sedation', 'Dry mouth', 'Blurred vision', 'Constipation', 'Extrapyramidal symptoms'],
    dosageForms: ['Tablet', 'Syrup', 'Injection', 'Suppository'],
    disorders: ['Nausea', 'Vomiting', 'Motion sickness', 'Allergic reactions'],
    incompatibility: ['CNS depressants', 'Alcohol', 'MAO inhibitors'],
    category: 'Antihistamine',
    therapeuticClass: 'Phenothiazine antihistamine',
    pharmacologicalClass: 'H1 antihistamine with antiemetic properties',
    mechanism: 'Blocks H1 receptors, has anticholinergic and dopamine antagonist effects',
    indications: ['Motion sickness', 'Nausea/vomiting', 'Allergic reactions', 'Sedation'],
    contraindications: ['Children <2 years', 'Comatose states', 'Severe CNS depression'],
    warnings: ['Respiratory depression in children', 'Extrapyramidal reactions', 'Neuroleptic malignant syndrome'],
    dosage: {
      adult: '12.5-25mg every 4-6 hours as needed',
      pediatric: '>2 years: 0.25-1mg/kg every 4-6 hours',
      elderly: 'Reduce dose due to increased sensitivity'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally',
      distribution: 'Widely distributed, crosses blood-brain barrier',
      metabolism: 'Extensive hepatic metabolism',
      elimination: 'Renal and biliary excretion',
      halfLife: '12-15 hours',
      bioavailability: '25% due to first-pass metabolism'
    },
    drugInteractions: ['CNS depressants (additive effects)', 'Anticholinergics', 'MAO inhibitors'],
    monitoring: ['Sedation level', 'Respiratory status', 'Extrapyramidal symptoms'],
    pregnancyCategory: 'Category C - Use with caution',
    lactation: 'Excreted in breast milk, avoid use',
    overdose: 'CNS depression, anticholinergic effects, supportive care',
    storage: 'Store at room temperature, protect from light',
    availableStrengths: ['12.5mg', '25mg', '50mg']
  },
  {
    name: 'Ticagrelor',
    genericName: 'Ticagrelor',
    brands: ['Brilinta', 'Brilique'],
    composition: [{ activeIngredient: 'Ticagrelor', strength: '90mg' }],
    sideEffects: ['Bleeding', 'Dyspnea', 'Headache', 'Dizziness', 'Nausea'],
    dosageForms: ['Tablet'],
    disorders: ['Acute coronary syndrome', 'MI prevention', 'Stroke prevention'],
    incompatibility: ['Strong CYP3A4 inhibitors', 'Warfarin', 'Aspirin >100mg'],
    category: 'Antiplatelet',
    therapeuticClass: 'P2Y12 platelet inhibitor',
    pharmacologicalClass: 'Cyclopentyl-triazolo-pyrimidine',
    mechanism: 'Reversibly binds to P2Y12 receptor, prevents ADP-mediated platelet activation',
    indications: ['Acute coronary syndrome', 'MI with PCI', 'Stroke prevention with aspirin'],
    contraindications: ['Active bleeding', 'History of intracranial hemorrhage', 'Severe hepatic impairment'],
    warnings: ['Bleeding risk', 'Dyspnea', 'Avoid high-dose aspirin', 'CYP3A4 interactions'],
    dosage: {
      adult: '180mg loading dose, then 90mg twice daily with aspirin 75-100mg',
      pediatric: 'Safety not established',
      elderly: 'No dose adjustment needed'
    },
    pharmacokinetics: {
      absorption: 'Rapid absorption, food doesn\'t affect significantly',
      distribution: '>99% protein bound',
      metabolism: 'Hepatic via CYP3A4 to active metabolite',
      elimination: 'Biliary excretion primarily',
      halfLife: '7 hours (parent), 9 hours (active metabolite)',
      bioavailability: '36%'
    },
    drugInteractions: ['CYP3A4 inhibitors increase levels', 'Warfarin increases bleeding risk'],
    monitoring: ['Bleeding signs', 'Platelet function if needed', 'Dyspnea'],
    pregnancyCategory: 'Category C - Use only if benefits outweigh risks',
    lactation: 'Unknown excretion, use caution',
    overdose: 'Increased bleeding risk, supportive care, platelet transfusion if severe',
    storage: 'Store at room temperature',
    availableStrengths: ['60mg', '90mg']
  },
  {
    name: 'Azelnidipine',
    genericName: 'Azelnidipine',
    brands: ['Calblock', 'Aztel'],
    composition: [{ activeIngredient: 'Azelnidipine', strength: '8mg' }],
    sideEffects: ['Peripheral edema', 'Headache', 'Flushing', 'Dizziness', 'Palpitations'],
    dosageForms: ['Tablet'],
    disorders: ['Hypertension', 'Angina pectoris'],
    incompatibility: ['CYP3A4 inhibitors', 'Grapefruit juice'],
    category: 'Antihypertensive',
    therapeuticClass: 'Calcium channel blocker',
    pharmacologicalClass: 'Dihydropyridine calcium antagonist',
    mechanism: 'Blocks L-type calcium channels in vascular smooth muscle',
    indications: ['Essential hypertension', 'Chronic stable angina'],
    contraindications: ['Cardiogenic shock', 'Severe aortic stenosis', 'Pregnancy'],
    warnings: ['Hypotension', 'Heart failure exacerbation', 'Peripheral edema'],
    dosage: {
      adult: '8-16mg once daily, may increase to 32mg',
      pediatric: 'Safety not established',
      elderly: 'Start with 8mg daily'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally',
      distribution: '>95% protein bound',
      metabolism: 'Extensive hepatic metabolism via CYP3A4',
      elimination: 'Biliary and renal excretion',
      halfLife: '50-60 hours',
      bioavailability: '3% due to high first-pass metabolism'
    },
    drugInteractions: ['CYP3A4 inhibitors increase levels', 'Grapefruit juice'],
    monitoring: ['Blood pressure', 'Heart rate', 'Edema', 'Heart failure signs'],
    pregnancyCategory: 'Category C - Avoid in pregnancy',
    lactation: 'Unknown excretion, avoid use',
    overdose: 'Hypotension, reflex tachycardia, supportive care',
    storage: 'Store at room temperature',
    availableStrengths: ['8mg', '16mg', '32mg']
  },
  {
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    brands: ['Zithromax', 'Z-Pack', 'Azee', 'Azimax'],
    composition: [{ activeIngredient: 'Azithromycin', strength: '500mg' }],
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'QT prolongation', 'Hepatotoxicity'],
    dosageForms: ['Tablet', 'Suspension', 'Injection', 'Eye drops'],
    disorders: ['Respiratory infections', 'Skin infections', 'STDs', 'Atypical pneumonia'],
    incompatibility: ['Ergot alkaloids', 'Warfarin', 'Digoxin'],
    category: 'Antibiotic',
    therapeuticClass: 'Macrolide antibiotic',
    pharmacologicalClass: 'Azalide',
    mechanism: 'Binds to 50S ribosomal subunit, inhibits protein synthesis',
    indications: ['Community-acquired pneumonia', 'Skin infections', 'Chlamydia', 'Mycobacterium avium'],
    contraindications: ['Hypersensitivity to macrolides', 'History of cholestatic jaundice'],
    warnings: ['QT prolongation', 'C. difficile colitis', 'Hepatotoxicity', 'Myasthenia gravis exacerbation'],
    dosage: {
      adult: '500mg on day 1, then 250mg daily for 4 days, or 500mg daily for 3 days',
      pediatric: '10mg/kg on day 1, then 5mg/kg for 4 days',
      elderly: 'No dose adjustment needed'
    },
    pharmacokinetics: {
      absorption: 'Rapidly absorbed, food reduces absorption',
      distribution: 'Extensive tissue distribution, long tissue half-life',
      metabolism: 'Hepatic metabolism',
      elimination: 'Biliary excretion primarily',
      halfLife: '68 hours',
      bioavailability: '37%'
    },
    drugInteractions: ['QT prolonging drugs', 'Warfarin (monitor INR)', 'Cyclosporine'],
    monitoring: ['Liver function', 'QT interval', 'Signs of superinfection'],
    pregnancyCategory: 'Category B - Generally safe in pregnancy',
    lactation: 'Compatible with breastfeeding',
    overdose: 'GI symptoms, supportive care',
    storage: 'Store at room temperature, suspension after reconstitution as directed',
    availableStrengths: ['250mg', '500mg', '600mg', '200mg/5ml suspension']
  },
  {
    name: 'Voglibose',
    genericName: 'Voglibose',
    brands: ['Vogli', 'Volibo', 'Voglinorm'],
    composition: [{ activeIngredient: 'Voglibose', strength: '0.2mg' }],
    sideEffects: ['Flatulence', 'Diarrhea', 'Abdominal pain', 'Skin reactions'],
    dosageForms: ['Tablet'],
    disorders: ['Type 2 diabetes mellitus', 'Postprandial hyperglycemia'],
    incompatibility: ['Digestive enzymes', 'Charcoal', 'Neomycin'],
    category: 'Antidiabetic',
    therapeuticClass: 'Alpha-glucosidase inhibitor',
    pharmacologicalClass: 'Pseudotetrasaccharide',
    mechanism: 'Inhibits alpha-glucosidases in small intestine, delays carbohydrate absorption',
    indications: ['Type 2 diabetes with postprandial hyperglycemia', 'Adjunct to diet and exercise'],
    contraindications: ['Diabetic ketoacidosis', 'Inflammatory bowel disease', 'Severe renal impairment'],
    warnings: ['GI side effects', 'Hypoglycemia risk with insulin/sulfonylureas', 'Liver enzyme elevation'],
    dosage: {
      adult: '0.2mg three times daily with first bite of each meal',
      pediatric: 'Safety not established',
      elderly: 'Standard adult dosing, monitor GI tolerance'
    },
    pharmacokinetics: {
      absorption: 'Minimal systemic absorption (<2%)',
      distribution: 'Acts locally in GI tract',
      metabolism: 'Metabolized by intestinal bacteria and enzymes',
      elimination: 'Fecal excretion primarily',
      halfLife: 'Not applicable due to minimal absorption',
      bioavailability: '<2%'
    },
    drugInteractions: ['May enhance hypoglycemic effects of other antidiabetics'],
    monitoring: ['Blood glucose', 'HbA1c', 'Liver enzymes', 'GI tolerance'],
    pregnancyCategory: 'Category C - Use with caution',
    lactation: 'Minimal systemic exposure, likely compatible',
    overdose: 'GI symptoms, supportive care',
    storage: 'Store at room temperature in dry place',
    availableStrengths: ['0.2mg', '0.3mg']
  },
  {
    name: 'Benfotiamine',
    genericName: 'Benfotiamine',
    brands: ['Milgamma', 'Benfocin'],
    composition: [{ activeIngredient: 'Benfotiamine', strength: '100mg' }],
    sideEffects: ['Nausea', 'Stomach upset', 'Allergic reactions (rare)'],
    dosageForms: ['Tablet', 'Capsule'],
    disorders: ['Diabetic neuropathy', 'Thiamine deficiency', 'Alcoholic neuropathy'],
    incompatibility: ['None significant'],
    category: 'Vitamin',
    therapeuticClass: 'Fat-soluble thiamine derivative',
    pharmacologicalClass: 'Thiamine analog',
    mechanism: 'Fat-soluble form of thiamine with better bioavailability, supports nerve function',
    indications: ['Diabetic polyneuropathy', 'Thiamine deficiency', 'Alcoholic neuropathy'],
    contraindications: ['Hypersensitivity to thiamine derivatives'],
    warnings: ['Generally well tolerated, monitor for allergic reactions'],
    dosage: {
      adult: '100-300mg daily, preferably with meals',
      pediatric: 'Safety not established',
      elderly: 'Standard adult dosing'
    },
    pharmacokinetics: {
      absorption: 'Better absorbed than thiamine due to lipophilicity',
      distribution: 'Concentrated in nervous tissue',
      metabolism: 'Converted to thiamine phosphate',
      elimination: 'Renal excretion',
      halfLife: 'Similar to thiamine',
      bioavailability: '5-25 times higher than thiamine'
    },
    drugInteractions: ['None significant reported'],
    monitoring: ['Neuropathy symptoms', 'Thiamine levels if available'],
    pregnancyCategory: 'Category A - Safe in pregnancy',
    lactation: 'Likely compatible',
    overdose: 'Generally safe, water-soluble vitamins are excreted',
    storage: 'Store in cool, dry place',
    availableStrengths: ['50mg', '100mg', '150mg', '300mg']
  },
  {
    name: 'Pyridoxine',
    genericName: 'Vitamin B6',
    brands: ['B6', 'Pyridoxine HCl', 'Hexa-Betalin'],
    composition: [{ activeIngredient: 'Pyridoxine HCl', strength: '50mg' }],
    sideEffects: ['Neuropathy (high doses)', 'Nausea', 'Headache', 'Photosensitivity'],
    dosageForms: ['Tablet', 'Capsule', 'Injection'],
    disorders: ['B6 deficiency', 'Morning sickness', 'PMS', 'Peripheral neuropathy'],
    incompatibility: ['Levodopa', 'Phenytoin'],
    category: 'Hormone',
    therapeuticClass: 'Estrogen hormone replacement',
    pharmacologicalClass: '17β-estradiol',
    mechanism: 'Binds to estrogen receptors, regulates gene transcription',
    indications: ['Menopausal symptoms', 'Osteoporosis prevention', 'Hypoestrogenism'],
    contraindications: ['Breast cancer', 'Endometrial cancer', 'Active thromboembolism', 'Pregnancy'],
    warnings: ['Increased risk of stroke, MI, breast cancer, thromboembolism'],
    dosage: {
      adult: '0.5-2mg daily orally, adjust based on response',
      pediatric: 'For hypogonadism in adolescents',
      elderly: 'Use lowest effective dose'
    },
    pharmacokinetics: {
      absorption: 'Well absorbed orally, extensive first-pass metabolism',
      distribution: '98% protein bound to SHBG and albumin',
      metabolism: 'Hepatic metabolism via CYP3A4',
      elimination: 'Renal and biliary excretion',
      halfLife: '13-20 hours',
      bioavailability: '5% oral due to first-pass effect'
    },
    drugInteractions: ['CYP3A4 inducers reduce levels', 'May affect warfarin'],
    monitoring: ['Breast/pelvic exams', 'Mammography', 'Endometrial assessment', 'Lipids'],
    pregnancyCategory: 'Category X - Contraindicated in pregnancy',
    lactation: 'May reduce milk production, generally avoid',
    overdose: 'Nausea, breast tenderness, irregular bleeding',
    storage: 'Store at room temperature',
    availableStrengths: ['0.5mg', '1mg', '2mg', 'Various patch strengths']
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
