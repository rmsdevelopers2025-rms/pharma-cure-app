-- Create required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create drugs table
CREATE TABLE IF NOT EXISTS public.drugs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  generic_name TEXT,
  brands TEXT[] NOT NULL DEFAULT '{}'::text[],
  composition JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{activeIngredient, strength}]
  side_effects TEXT[] NOT NULL DEFAULT '{}'::text[],
  dosage_forms TEXT[] NOT NULL DEFAULT '{}'::text[],
  disorders TEXT[] NOT NULL DEFAULT '{}'::text[],
  incompatibility TEXT[] NOT NULL DEFAULT '{}'::text[],
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  category TEXT,
  therapeutic_class TEXT,
  pharmacological_class TEXT,
  mechanism TEXT,
  indications TEXT[] NOT NULL DEFAULT '{}'::text[],
  contraindications TEXT[] NOT NULL DEFAULT '{}'::text[],
  warnings TEXT[] NOT NULL DEFAULT '{}'::text[],
  dosage JSONB NOT NULL DEFAULT jsonb_build_object('adult','', 'pediatric','', 'elderly',''),
  pharmacokinetics JSONB NOT NULL DEFAULT jsonb_build_object('absorption','', 'distribution','', 'metabolism','', 'elimination','', 'halfLife','', 'bioavailability',''),
  drug_interactions TEXT[] NOT NULL DEFAULT '{}'::text[],
  monitoring TEXT[] NOT NULL DEFAULT '{}'::text[],
  pregnancy_category TEXT,
  lactation TEXT,
  overdose TEXT,
  storage TEXT,
  available_strengths TEXT[] NOT NULL DEFAULT '{}'::text[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS and add policies (public read-only)
ALTER TABLE public.drugs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'drugs' AND policyname = 'Drugs are publicly readable'
  ) THEN
    CREATE POLICY "Drugs are publicly readable" ON public.drugs
    FOR SELECT USING (true);
  END IF;
END$$;

-- updated_at trigger
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_drugs_updated_at'
  ) THEN
    CREATE TRIGGER trigger_update_drugs_updated_at
    BEFORE UPDATE ON public.drugs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END$$;

-- Indexes for faster search
CREATE INDEX IF NOT EXISTS idx_drugs_name_trgm ON public.drugs USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_drugs_generic_name_trgm ON public.drugs USING GIN (generic_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_drugs_brands_gin ON public.drugs USING GIN (brands);
CREATE INDEX IF NOT EXISTS idx_drugs_indications_gin ON public.drugs USING GIN (indications);

-- RPC: search drugs by multiple fields
CREATE OR REPLACE FUNCTION public.search_drugs(q text)
RETURNS SETOF public.drugs
LANGUAGE sql STABLE
AS $$
  SELECT *
  FROM public.drugs d
  WHERE d.name ILIKE '%' || q || '%'
     OR d.generic_name ILIKE '%' || q || '%'
     OR EXISTS (
       SELECT 1 FROM unnest(d.brands) b WHERE b ILIKE '%' || q || '%'
     )
     OR EXISTS (
       SELECT 1 FROM jsonb_array_elements(d.composition) elem
       WHERE elem ->> 'activeIngredient' ILIKE '%' || q || '%'
     )
     OR d.therapeutic_class ILIKE '%' || q || '%'
     OR d.pharmacological_class ILIKE '%' || q || '%'
     OR d.category ILIKE '%' || q || '%'
     OR EXISTS (
       SELECT 1 FROM unnest(d.indications) i WHERE i ILIKE '%' || q || '%'
     )
  ORDER BY d.name
  LIMIT 50;
$$;

-- RPC: auto-correct suggestion using trigram similarity
CREATE OR REPLACE FUNCTION public.get_auto_correct_suggestion(q text)
RETURNS text
LANGUAGE sql STABLE
AS $$
  SELECT d.name
  FROM public.drugs d
  ORDER BY similarity(d.name, q) DESC
  LIMIT 1;
$$;