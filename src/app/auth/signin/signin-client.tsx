'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import SignInForm from '@/components/auth/SignInForm';
import { useAuth } from '@/context/AuthContext';

export default function SignInClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithEmail, loading: authLoading, user } = useAuth();

  // Redirect if already signed in
  useEffect(() => {
    if (user && !authLoading) {
      const redirectTo = searchParams.get('redirectedFrom') || 
                       (user.user_metadata?.role === 'maid' ? '/maid/dashboard' : '/employer/dashboard');
      router.replace(redirectTo);
    }
  }, [user, authLoading, router, searchParams]);

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <SignInForm />
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <button
            onClick={() => {
              // Handle Google sign-in
            }}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with Google</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-center text-sm">
          <Link 
            href="/auth/forgot-password" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="text-center text-sm mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <Link 
            href="/auth/signup" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
