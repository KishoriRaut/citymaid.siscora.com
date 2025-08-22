import { createClient } from '@supabase/supabase-js';

// Hardcoded values for development
const supabaseUrl = 'https://bshtwgqehwvljkvaqsie.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaHR3Z3FlaHd2bGprdmFxc2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Njk4MTYsImV4cCI6MjA2NzA0NTgxNn0.YKGG3mrGidnzIcxPI5FKNZlscjANVxeP2qL9HGM6RyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }
});
