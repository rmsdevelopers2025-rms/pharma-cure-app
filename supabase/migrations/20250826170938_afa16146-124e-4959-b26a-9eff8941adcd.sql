-- Fix the search_path security issue in handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    age, 
    height, 
    weight, 
    sex, 
    medical_info
  )
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NULL),
    CASE 
      WHEN NEW.raw_user_meta_data->>'age' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'age')::integer 
      ELSE NULL 
    END,
    CASE 
      WHEN NEW.raw_user_meta_data->>'height' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'height')::integer 
      ELSE NULL 
    END,
    CASE 
      WHEN NEW.raw_user_meta_data->>'weight' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'weight')::integer 
      ELSE NULL 
    END,
    COALESCE(NEW.raw_user_meta_data->>'sex', NULL),
    COALESCE(NEW.raw_user_meta_data->>'medicalInfo', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, profiles.name),
    age = COALESCE(EXCLUDED.age, profiles.age),
    height = COALESCE(EXCLUDED.height, profiles.height),
    weight = COALESCE(EXCLUDED.weight, profiles.weight),
    sex = COALESCE(EXCLUDED.sex, profiles.sex),
    medical_info = COALESCE(EXCLUDED.medical_info, profiles.medical_info),
    updated_at = now();
  RETURN NEW;
END;
$function$;