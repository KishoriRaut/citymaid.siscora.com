const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testSignup() {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'password123';
  const testName = 'Test User';
  const testRole = 'maid';

  console.log('Testing signup with:', { email: testEmail, role: testRole });

  try {
    // 1. Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: testName,
          role: testRole,
          user_metadata: {
            full_name: testName,
            role: testRole
          },
          app_metadata: {
            role: testRole
          }
        }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user data returned');

    console.log('Signup successful! User ID:', data.user.id);
    
    // 2. Wait a moment for the trigger to run
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Check the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;
    
    console.log('Profile data:', profile);
    console.log('Role in profile:', profile.role);
    
    if (profile.role === testRole) {
      console.log('✅ Role was saved correctly!');
    } else {
      console.error('❌ Role was not saved correctly. Expected:', testRole, 'Got:', profile.role);
    }
    
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testSignup();
