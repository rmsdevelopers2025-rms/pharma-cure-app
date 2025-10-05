import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DrugRow {
  id: string;
  generic_name: string;
  brand_name: string;
  side_effects: string;
  dosage_forms: string;
  disorders: string;
  incompatibility: string;
  category: string;
  storage: string;
  dosage: string;
  overdose: string;
  available_strength: string;
  composition: string;
  contraindications: string;
  indications: string;
  drug_interactions: string;
  warnings: string;
}

function parseCSV(text: string): DrugRow[] {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  return lines.slice(1).map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

function splitArray(value: string): string[] {
  if (!value || value === 'None' || value === '') return [];
  return value.split(',').map(v => v.trim()).filter(v => v);
}

function transformDrugData(row: DrugRow) {
  return {
    name: row.brand_name || row.generic_name,
    generic_name: row.generic_name,
    brands: [row.brand_name].filter(Boolean),
    side_effects: splitArray(row.side_effects),
    dosage_forms: splitArray(row.dosage_forms),
    disorders: splitArray(row.disorders),
    incompatibility: splitArray(row.incompatibility),
    category: row.category,
    storage: row.storage,
    overdose: row.overdose,
    available_strengths: splitArray(row.available_strength),
    composition: row.composition ? [{
      activeIngredient: row.composition,
      strength: row.available_strength?.split(',')[0]?.trim() || ''
    }] : [],
    contraindications: splitArray(row.contraindications),
    indications: splitArray(row.indications),
    drug_interactions: splitArray(row.drug_interactions),
    warnings: splitArray(row.warnings),
    dosage: {
      adult: row.dosage || '',
      pediatric: '',
      elderly: ''
    },
    therapeutic_class: '',
    pharmacological_class: '',
    mechanism: '',
    pharmacokinetics: {
      absorption: '',
      distribution: '',
      metabolism: '',
      elimination: '',
      halfLife: '',
      bioavailability: ''
    },
    monitoring: [],
    pregnancy_category: '',
    lactation: '',
    is_premium: false
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Read all CSV files
    const files = ['drugs.csv', 'drugs_26_50.csv', 'drugs_51_100.csv'];
    const allDrugs: any[] = [];

    for (const fileName of files) {
      const filePath = new URL(`./${fileName}`, import.meta.url).pathname;
      const csvText = await Deno.readTextFile(filePath);
      const rows = parseCSV(csvText);
      const transformedRows = rows.map(transformDrugData);
      allDrugs.push(...transformedRows);
    }

    console.log(`Importing ${allDrugs.length} drugs...`);

    // Insert drugs in batches
    const batchSize = 50;
    let imported = 0;
    let errors = 0;

    for (let i = 0; i < allDrugs.length; i += batchSize) {
      const batch = allDrugs.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('drugs')
        .upsert(batch, { onConflict: 'name' });

      if (error) {
        console.error(`Batch ${i / batchSize + 1} error:`, error);
        errors += batch.length;
      } else {
        imported += batch.length;
        console.log(`Imported batch ${i / batchSize + 1}: ${imported} drugs`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        imported,
        errors,
        total: allDrugs.length,
        message: `Successfully imported ${imported} drugs with ${errors} errors`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
