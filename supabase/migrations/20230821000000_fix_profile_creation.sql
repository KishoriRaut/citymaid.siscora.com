-- Create a function to handle profile creation with proper error handling
CREATE OR REPLACE FUNCTION public.create_profile_for_user(
  user_id uuid,
  user_email text,
  user_role text,
  user_full_name text
) 
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First try to insert the profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    user_email,
    user_full_name,
    user_role,
    NOW(),
    NOW()
  );
  
  EXCEPTION WHEN unique_violation THEN
    -- If the profile already exists, just update it
    UPDATE public.profiles
    SET 
      email = user_email,
      full_name = COALESCE(user_full_name, full_name),
      role = COALESCE(user_role, role, 'employer'),
      updated_at = NOW()
    WHERE id = user_id;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.create_profile_for_user TO service_role;
GRANT EXECUTE ON FUNCTION public.create_profile_for_user TO authenticated;

-- Update the trigger function to use the new profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_role TEXT;
BEGIN
  -- Safely extract data from raw_user_meta_data
  BEGIN
    user_full_name := NEW.raw_user_meta_data->>'full_name';
    user_role := NEW.raw_user_meta_data->>'role';
  EXCEPTION WHEN OTHERS THEN
    user_full_name := NULL;
    user_role := NULL;
  END;

  -- Set default values if not provided
  user_full_name := COALESCE(user_full_name, split_part(NEW.email, '@', 1));
  user_role := COALESCE(user_role, 'employer');

  -- Use the new profile creation function
  PERFORM public.create_profile_for_user(
    NEW.id,
    NEW.email,
    user_role,
    user_full_name
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies if needed
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they're correct
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Server can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Server can update profiles" ON public.profiles;

-- Recreate policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Allow service_role to manage profiles (for triggers and admin functions)
CREATE POLICY "Service role can manage profiles"
ON public.profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
