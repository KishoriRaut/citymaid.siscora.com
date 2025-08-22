-- Drop the existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create or replace the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_role TEXT;
BEGIN
<<<<<<< HEAD
  -- Safely extract full_name from raw_user_meta_data
  BEGIN
    user_full_name := NEW.raw_user_meta_data->>'full_name';
  EXCEPTION WHEN OTHERS THEN
    user_full_name := NULL;
=======
  -- Safely extract data from raw_user_meta_data
  BEGIN
    user_full_name := NEW.raw_user_meta_data->>'full_name';
    -- Try to get role from raw_user_meta_data first
    user_role := NEW.raw_user_meta_data->>'role';
    
    -- If role is not in raw_user_meta_data, try to get it from the user's metadata
    IF user_role IS NULL THEN
      user_role := (NEW.raw_user_meta_data->>'role')::TEXT;
    END IF;
    
  EXCEPTION WHEN OTHERS THEN
    user_full_name := NULL;
    user_role := NULL;
>>>>>>> work-aug22
  END;

  -- Set default role if not provided
  user_role := COALESCE(
<<<<<<< HEAD
=======
    user_role,
>>>>>>> work-aug22
    (SELECT role FROM public.profiles WHERE id = NEW.id),
    'employer'::TEXT
  );

  -- Insert or update the profile
  INSERT INTO public.profiles (
    id, 
    email,
    full_name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id, 
    NEW.email,
    user_full_name,
    user_role,
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = timezone('utc'::text, now());
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
