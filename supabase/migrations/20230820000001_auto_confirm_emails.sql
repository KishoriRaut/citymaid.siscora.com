-- Create a function to automatically confirm new users' emails
CREATE OR REPLACE FUNCTION public.auto_confirm_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-confirm the user's email
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, NOW());
  
  -- Set the user as confirmed
  NEW.confirmed_at = COALESCE(NEW.confirmed_at, NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger to run on user creation
DROP TRIGGER IF EXISTS on_auth_user_created_confirm ON auth.users;
CREATE TRIGGER on_auth_user_created_confirm
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_signup();

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
