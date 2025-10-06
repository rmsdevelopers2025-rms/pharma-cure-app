-- Drop and recreate the search_drugs function with correct columns
DROP FUNCTION IF EXISTS public.search_drugs(text);

CREATE OR REPLACE FUNCTION public.search_drugs(q text)
RETURNS SETOF drugs
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $function$
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
     OR d.category ILIKE '%' || q || '%'
     OR EXISTS (
       SELECT 1 FROM unnest(d.indications) i WHERE i ILIKE '%' || q || '%'
     )
  ORDER BY d.name
  LIMIT 50;
$function$;