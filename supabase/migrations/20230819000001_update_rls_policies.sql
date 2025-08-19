-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Recreate policies with proper security

-- 1. Allow public read access to profiles (adjust if you want to restrict this)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

-- 2. Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 3. Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Allow server-side inserts (for the trigger function)
CREATE POLICY "Server can insert profiles"
ON public.profiles
FOR INSERT
TO service_role
WITH CHECK (true);

-- 5. Allow server-side updates (for the trigger function)
CREATE POLICY "Server can update profiles"
ON public.profiles
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
