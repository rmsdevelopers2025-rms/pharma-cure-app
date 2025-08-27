-- Backfill existing user profile data from auth metadata
UPDATE profiles 
SET 
  name = COALESCE(profiles.name, (
    SELECT raw_user_meta_data->>'name' 
    FROM auth.users 
    WHERE id = profiles.id
  )),
  age = COALESCE(profiles.age, (
    SELECT CASE 
      WHEN raw_user_meta_data->>'age' IS NOT NULL 
      THEN (raw_user_meta_data->>'age')::integer 
      ELSE NULL 
    END
    FROM auth.users 
    WHERE id = profiles.id
  )),
  height = COALESCE(profiles.height, (
    SELECT CASE 
      WHEN raw_user_meta_data->>'height' IS NOT NULL 
      THEN (raw_user_meta_data->>'height')::integer 
      ELSE NULL 
    END
    FROM auth.users 
    WHERE id = profiles.id
  )),
  weight = COALESCE(profiles.weight, (
    SELECT CASE 
      WHEN raw_user_meta_data->>'weight' IS NOT NULL 
      THEN (raw_user_meta_data->>'weight')::integer 
      ELSE NULL 
    END
    FROM auth.users 
    WHERE id = profiles.id
  )),
  sex = COALESCE(profiles.sex, (
    SELECT raw_user_meta_data->>'sex' 
    FROM auth.users 
    WHERE id = profiles.id
  )),
  medical_info = COALESCE(profiles.medical_info, (
    SELECT raw_user_meta_data->>'medicalInfo' 
    FROM auth.users 
    WHERE id = profiles.id
  )),
  updated_at = now()
WHERE EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = profiles.id 
  AND raw_user_meta_data IS NOT NULL
);