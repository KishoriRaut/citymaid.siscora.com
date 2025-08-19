'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Auth state:', { loading, user, role, allowedRoles });
    
    if (!loading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        router.push('/login');
      } else if (user && role) {
        console.log('User and role found:', { role, allowedRoles });
        if (!allowedRoles.includes(role)) {
          console.log('Role not allowed, redirecting to appropriate dashboard');
          router.push(role === 'maid' ? '/maid/dashboard' : '/employer/dashboard');
        }
      } else if (user && !role) {
        console.log('User authenticated but no role assigned, checking database...');
        // Add a small delay to allow for role to be set
        const timer = setTimeout(() => {
          if (!role) {
            console.log('Still no role, redirecting to login');
            router.push('/login');
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, role, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-600">Please log in to continue</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(role || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
