-- Update the handle_new_user function to better handle role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_role TEXT;
  user_email TEXT;
  user_metadata JSONB;
  role_from_meta TEXT;
BEGIN
  -- Initialize variables
  user_full_name := NULL;
  user_role := NULL;
  user_email := NEW.email;
  
  -- Debug: Log the raw metadata
  RAISE NOTICE 'Raw user meta data: %', NEW.raw_user_meta_data::text;
  
  -- Extract data from raw_user_meta_data if it exists
  IF NEW.raw_user_meta_data IS NOT NULL THEN
    BEGIN
      -- Get the full user metadata object
      user_metadata := NEW.raw_user_meta_data;
      
      -- Try to get full_name from various possible locations
      user_full_name := COALESCE(
        user_metadata->>'full_name',
        user_metadata->'user_metadata'->>'full_name',
        user_metadata->'user_metadata'->>'name',
        split_part(NEW.email, '@', 1)  -- Fallback to email prefix
      );
      
      -- Debug log the role extraction
      RAISE NOTICE 'Trying to extract role from: %', user_metadata::text;
      
      -- Try to get role from all possible locations
      user_role := COALESCE(
        -- Direct role in root
        (user_metadata->>'role')::text,
        -- Nested in user_metadata
        (user_metadata->'user_metadata'->>'role')::text,
        -- Check for role in app_metadata
        (user_metadata->'app_metadata'->>'role')::text,
        -- Check for role in provider metadata
        (user_metadata->'provider'->>'role')::text
      );
      
      -- Debug log the extracted role
      RAISE NOTICE 'Extracted role: %', user_role;
    EXCEPTION WHEN OTHERS THEN
      -- If there's an error parsing the JSON, just use defaults
      RAISE NOTICE 'Error parsing user metadata: %', SQLERRM;
    END;
  END IF;
  
  -- Set default role if not provided
  user_role := COALESCE(
    user_role,
    (SELECT role FROM public.profiles WHERE id = NEW.id LIMIT 1),
    'employer'::TEXT
  );
  
  -- Log the values for debugging
  RAISE NOTICE 'Creating profile for user % (ID: %), role: %', user_email, NEW.id, user_role;

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
    user_email,
    user_full_name,
    user_role,
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    role = COALESCE(EXCLUDED.role, profiles.role),
    updated_at = timezone('utc'::text, now())
  WHERE profiles.id = EXCLUDED.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate the trigger to ensure it's using the latest function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
