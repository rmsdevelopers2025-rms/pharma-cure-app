-- Add height and weight fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS height numeric,
ADD COLUMN IF NOT EXISTS weight numeric;

-- Update the handle_new_user function to save height and weight
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, date_of_birth, sex, age, height, weight)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'date_of_birth')::date,
    new.raw_user_meta_data->>'sex',
    (new.raw_user_meta_data->>'age')::integer,
    (new.raw_user_meta_data->>'height')::numeric,
    (new.raw_user_meta_data->>'weight')::numeric
  );
  RETURN new;
END;
$$;