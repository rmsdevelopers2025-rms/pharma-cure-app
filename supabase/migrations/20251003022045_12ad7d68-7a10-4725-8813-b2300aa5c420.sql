-- Add additional profile fields for user registration
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS sex text,
ADD COLUMN IF NOT EXISTS age integer;

-- Update the handle_new_user function to save additional fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, date_of_birth, sex, age)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'date_of_birth')::date,
    new.raw_user_meta_data->>'sex',
    (new.raw_user_meta_data->>'age')::integer
  );
  RETURN new;
END;
$$;