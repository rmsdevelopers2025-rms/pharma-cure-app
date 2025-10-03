-- Add medical_information field to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS medical_information text;

-- Update the handle_new_user function to save medical information
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, sex, age, height, weight, medical_information)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'sex',
    (new.raw_user_meta_data->>'age')::integer,
    (new.raw_user_meta_data->>'height')::numeric,
    (new.raw_user_meta_data->>'weight')::numeric,
    new.raw_user_meta_data->>'medical_information'
  );
  RETURN new;
END;
$$;