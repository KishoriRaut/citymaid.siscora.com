'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DebugPage() {
  const { user, role, loading } = useAuth();
  const [localStorageData, setLocalStorageData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Get all items from localStorage
    const items: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          items[key] = localStorage.getItem(key);
        } catch (e) {
          console.error(`Error reading ${key} from localStorage`, e);
        }
      }
    }
    setLocalStorageData(items);
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Auth State</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify({
            isAuthenticated: !!user,
            user: user ? {
              id: user.id,
              email: user.email,
              email_confirmed_at: user.email_confirmed_at,
              role: role,
            } : 'Not authenticated',
            loading
          }, null, 2)}
        </pre>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Local Storage</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify(localStorageData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
