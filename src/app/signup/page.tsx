'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpPage() {
  const [role, setRole] = useState<'maid' | 'employer'>('employer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const router = useRouter();

  const handleGoogleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      localStorage.setItem('signup_role', role);
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      localStorage.setItem('signup_role', role);
      const result = await signUpWithEmail(email, password, fullName);
      
      if (!result) {
        throw new Error('No response from server');
      }
      
      if (result.session) {
        // Successfully signed up and got a session
        router.push(role === 'maid' ? '/maid/dashboard' : '/employer/dashboard');
      } else {
        // Email confirmation required
        setError('Please check your email to verify your account');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of employers and domestic helpers today
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am looking to
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 ${
                  role === 'employer'
                    ? 'bg-blue-600 text-white border-transparent shadow-md transform scale-[1.02]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Hire Help
              </button>
              <button
                type="button"
                onClick={() => setRole('maid')}
                className={`py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 ${
                  role === 'maid'
                    ? 'bg-blue-600 text-white border-transparent shadow-md transform scale-[1.02]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Find Work
              </button>
            </div>
          </div>

          {/* Divider */}
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

          {/* Google Sign In */}
          <div>
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              {isLoading ? 'Signing up...' : 'Continue with Google'}
            </button>
          </div>

          {/* Email Sign Up Form */}
          <form className="mt-6 space-y-4" onSubmit={handleEmailSignUp}>
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
