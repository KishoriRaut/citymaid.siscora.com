-- Drop the existing trigger and function to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a new function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- First, try to get the role from the user's metadata
  DECLARE
    user_role TEXT := 'employer';
  BEGIN
    -- Check if role is in raw_user_meta_data
    IF NEW.raw_user_meta_data ? 'role' AND 
       (NEW.raw_user_meta_data->>'role' = 'maid' OR NEW.raw_user_meta_data->>'role' = 'employer') THEN
      user_role := NEW.raw_user_meta_data->>'role';
    END IF;
    
    -- Insert the new profile with the determined role
    INSERT INTO public.profiles (
      id, 
      email, 
      full_name, 
      role, 
      created_at, 
      updated_at
    ) VALUES (
      NEW.id, 
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      user_role,
      NOW(),
      NOW()
    );
    
    RETURN NEW;
  EXCEPTION WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile: %', SQLERRM;
    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies to be more permissive during development
-- This helps with debugging and development
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

-- Recreate policies with better error handling
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);
