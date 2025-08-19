'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

type UserRole = 'employer' | 'maid' | null;

interface AuthContextType {
  user: any;
  role: UserRole;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ user: any; session: any } | undefined>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and set the user
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // First, try to get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // If there's an error, clear the session
        if (sessionError) {
          console.log('Session error, signing out:', sessionError);
          await supabase.auth.signOut();
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }
        
        if (session?.user) {
          setUser(session.user);
          
          // First, try to get the user's role
          try {
            // Try to fetch the profile
            const { data, error } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.log('Profile fetch error, attempting to create profile...');
              
              // Try to create the profiles table if it doesn't exist
              try {
                await supabase.rpc('create_profiles_table_if_not_exists');
              } catch (tableError) {
                console.log('Could not create profiles table, will use default role');
              }
              
              // Set a default role
              setRole('employer');
              
              // Try to create the profile in the background
              (async () => {
                try {
                  const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([
                      { 
                        id: session.user.id, 
                        email: session.user.email,
                        role: 'employer',
                        created_at: new Date().toISOString()
                      }
                    ]);
                  
                  if (insertError) {
                    console.log('Background profile creation failed:', insertError);
                  } else {
                    console.log('Background profile creation successful');
                  }
                } catch (e) {
                  console.log('Background profile creation error:', e);
                }
              })();
              
            } else {
              // If we got the profile, set the role
              setRole(data?.role || 'employer');
            }
          } catch (err) {
            console.error('Error in profile handling:', err);
            // Default to employer role if anything goes wrong
            setRole('employer');
          }
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    
    // Initialize auth state
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        if (session?.user) {
          setUser(session.user);
          try {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            setRole(data?.role || 'employer');
          } catch (error) {
            console.error('Error fetching profile:', error);
            setRole('employer');
          }
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    try {
      const role = localStorage.getItem('signup_role') as UserRole || 'employer';
      
      // 1. Sign up the user with email and password
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            email: email,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;
      if (!authData?.user) throw new Error('No user data returned from sign up');

      // 2. Use the service role client to bypass RLS for profile creation
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      // 3. Update local state
      setUser(authData.user);
      setRole(role);
      
      // 4. Force refresh the session to ensure it's up to date
      const { data: { session }, error: sessionError } = await supabase.auth.refreshSession();
      
      if (sessionError) {
        console.error('Error refreshing session:', sessionError);
        throw sessionError;
      }
      
      return { 
        user: { 
          ...authData.user, 
          role: profileData?.role || role 
        }, 
        session 
      };
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    role,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
