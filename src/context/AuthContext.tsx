'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

type UserRole = 'employer' | 'maid' | null;

interface AuthContextType {
  user: any;
  role: UserRole;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string, role: 'employer' | 'maid') => Promise<{ user: any; session: any } | undefined>;
  signInWithEmail: (email: string, password: string) => Promise<{ user: any; session: any } | undefined>;
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
          
          try {
            // Try to get the user's role with better error handling
            let profile = null;
            let profileError = null;
            
            try {
              const result = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();
              
              profile = result.data;
              profileError = result.error;
              
              if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = no rows returned
                throw profileError;
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              profileError = error;
            }

            if (!profile) {
              console.log('Profile not found, creating new profile...');
              try {
                const { error: createError } = await supabase
                  .from('profiles')
                  .upsert({
                    id: session.user.id,
                    email: session.user.email,
                    full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
                    role: 'employer',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  });

                if (createError) {
                  console.error('Failed to create profile:', createError);
                  // Try a direct insert if upsert fails
                  const { error: insertError } = await supabase.rpc('create_profile_for_user', {
                    user_id: session.user.id,
                    user_email: session.user.email,
                    user_role: 'employer',
                    user_full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0]
                  });
                  
                  if (insertError) {
                    console.error('Failed to create profile with RPC:', insertError);
                    throw insertError;
                  }
                }
                
                console.log('Profile created successfully');
                setRole('employer');
              } catch (createError) {
                console.error('Error in profile creation:', createError);
                // Continue with default role even if profile creation fails
                setRole('employer');
              }
            } else {
              console.log('Found profile with role:', profile?.role);
              setRole(profile?.role || 'employer');
            }
          } catch (error) {
            console.error('Error in profile handling:', error);
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
      // Get role from localStorage or default to 'employer'
      const storedRole = localStorage.getItem('signup_role');
      console.log('Google sign-in - Stored role:', storedRole);
      
      // Validate the role
      const validRole = (storedRole === 'maid' || storedRole === 'employer') 
        ? storedRole 
        : 'employer';
      
      console.log('Initiating Google sign-in with role:', validRole);
      
      // Store the role in sessionStorage as a fallback
      sessionStorage.setItem('temp_role', validRole);
      
      // Include role in both state and queryParams for redundancy
      const state = `role_${validRole}`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            state: state,
            role: validRole // Add role as a query parameter too
          },
        },
      });
      
      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string, role: 'employer' | 'maid') => {
    try {
      // Validate the role
      if (!['employer', 'maid'].includes(role)) {
        throw new Error('Invalid user role');
      }
      
      console.log('Starting sign up with role:', role);
      
      // Store the role in sessionStorage as a fallback
      sessionStorage.setItem('temp_role', role);
      
      // 1. First, create the user with minimal data
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      console.log('Auth signup response:', { authData, signUpError });
      
      if (signUpError) throw signUpError;
      if (!authData?.user) throw new Error('No user data returned from sign up');
      
      // 2. Use the RPC function to ensure role is set
      console.log('Updating role using RPC function for user:', authData.user.id);
      const { error: rpcError } = await supabase.rpc('update_user_role', {
        user_id: authData.user.id,
        new_role: role
      });
      
      if (rpcError) {
        console.error('RPC function error:', rpcError);
        // Continue even if RPC fails, we'll try direct update next
      } else {
        console.log('Successfully updated role via RPC');
      }
      
      // 3. Update the profile directly as a fallback
      console.log('Updating profile directly for user:', authData.user.id);
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
        // Don't throw here - the user is created, just the profile update failed
        // The database trigger should handle creating the profile with the role
      } else {
        console.log('Successfully updated profile');
      }
      
      // 4. If we have a session, update local state and redirect
      if (authData.session) {
        setUser(authData.user);
        setRole(role);
        // Redirect to the appropriate dashboard
        router.push(`/${role}/dashboard`);
      } else {
        // If email confirmation is required, show a message
        console.log('Email confirmation required');
      }
      
      // 5. Return the user data
      return { 
        user: { 
          ...authData.user, 
          role: role
        }, 
        session: authData.session
      };
    } catch (error) {
      console.error('Error in signUpWithEmail:', error);
      throw error;
    }
    
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // First sign in the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data?.user) {
        // Get the user's profile to get their role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Default to employer if profile fetch fails
          setRole('employer');
          router.push('/employer/dashboard');
        } else {
          // Set the role from profile
          const userRole = profile?.role || 'employer';
          setRole(userRole);
          console.log('User signed in with role:', userRole);
          
          // Redirect based on role
          const redirectPath = userRole === 'maid' ? '/maid/dashboard' : '/employer/dashboard';
          router.push(redirectPath);
        }
      }
      
      return data;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
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
