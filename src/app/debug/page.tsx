'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DebugPage() {
  const { user, role, loading } = useAuth();
  const [localStorageData, setLocalStorageData] = useState<Record<string, any>>({});
  const [sessionStorageData, setSessionStorageData] = useState<Record<string, any>>({});
  const [profileData, setProfileData] = useState<any>(null);
  const [authState, setAuthState] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get all items from localStorage and sessionStorage
    const lsItems: Record<string, any> = {};
    const ssItems: Record<string, any> = {};
    
    // Read localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          lsItems[key] = localStorage.getItem(key);
        } catch (e) {
          console.error(`Error reading ${key} from localStorage`, e);
        }
      }
    }
    setLocalStorageData(lsItems);

    // Read sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        try {
          ssItems[key] = sessionStorage.getItem(key);
        } catch (e) {
          console.error(`Error reading ${key} from sessionStorage`, e);
        }
      }
    }
    setSessionStorageData(ssItems);

    // Get current auth state
    const getAuthState = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthState({
          session: {
            access_token: session?.access_token ? '***' : null,
            refresh_token: session?.refresh_token ? '***' : null,
            expires_at: session?.expires_at,
            expires_in: session?.expires_in,
            token_type: session?.token_type,
            user: {
              id: session?.user?.id,
              email: session?.user?.email,
              user_metadata: session?.user?.user_metadata,
              app_metadata: session?.user?.app_metadata,
              role: session?.user?.user_metadata?.role,
              email_confirmed_at: session?.user?.email_confirmed_at,
              last_sign_in_at: session?.user?.last_sign_in_at,
              created_at: session?.user?.created_at,
            }
          },
          isAuthenticated: !!session?.user,
        });

        // Get profile data if user is authenticated
        if (session?.user?.id) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (!error && profile) {
            setProfileData(profile);
          } else {
            console.error('Error fetching profile:', error);
          }
        }
      } catch (error) {
        console.error('Error getting auth state:', error);
      }
    };

    getAuthState();
  }, [user, role, loading]);

  if (loading) {
    return <div className="p-4">Loading auth state...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      {/* Auth State */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Auth State</h2>
        <div className="bg-gray-100 p-4 rounded overflow-x-auto">
          <h3 className="font-medium mb-2">User Context:</h3>
          <pre className="text-sm">
            {JSON.stringify({
              isAuthenticated: !!user,
              role: role,
              loading: loading,
              user: user ? {
                id: user.id,
                email: user.email,
                email_confirmed_at: user.email_confirmed_at,
                last_sign_in_at: user.last_sign_in_at,
                created_at: user.created_at,
                user_metadata: user.user_metadata,
                app_metadata: user.app_metadata
              } : 'Not authenticated'
            }, null, 2)}
          </pre>
          
          <h3 className="font-medium mt-4 mb-2">Session State:</h3>
          <pre className="text-sm">
            {authState ? JSON.stringify(authState, null, 2) : 'Loading session...'}
          </pre>
        </div>
      </div>

      {/* Profile Data */}
      {profileData && (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Profile Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(profileData, null, 2)}
          </pre>
        </div>
      )}

      {/* Local Storage */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Local Storage</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {Object.keys(localStorageData).length > 0 
            ? JSON.stringify(localStorageData, null, 2) 
            : 'No localStorage data found'}
        </pre>
      </div>

      {/* Session Storage */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Session Storage</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {Object.keys(sessionStorageData).length > 0 
            ? JSON.stringify(sessionStorageData, null, 2) 
            : 'No sessionStorage data found'}
        </pre>
      </div>
    </div>
  );
}
