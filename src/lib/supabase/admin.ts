import { createClient } from '@supabase/supabase-js';

// Get environment variables - handle both server and client side
const getEnvVar = (key: string, isPublic = false): string => {
  // Always available in both server and client components
  const fullKey = isPublic ? `NEXT_PUBLIC_${key}` : key;
  const value = process.env[fullKey] || process.env[`NEXT_PUBLIC_${key}`] || '';
  
  if (!value && process.env.NODE_ENV !== 'test') {
    console.warn(`Missing environment variable: ${fullKey}`);
  }
  
  return value;
};

const supabaseUrl = getEnvVar('SUPABASE_URL', true);
const supabaseServiceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

// Create a more robust client that handles missing env vars gracefully
export const supabaseAdmin = (() => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase Admin: Missing required environment variables. Some features may not work.');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  } catch (error) {
    console.error('Failed to initialize Supabase Admin client:', error);
    return null;
  }
})();
