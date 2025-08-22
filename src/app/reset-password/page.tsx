'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import AuthLayout from '@/components/auth/AuthLayout';

type MessageType = {
  text: string;
  type: 'success' | 'error' | '';
};

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({ text: '', type: '' });
  const [validLink, setValidLink] = useState<boolean | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type');

  // Check if it's a password recovery
  useEffect(() => {
    if (type === 'recovery' && token) {
      // The link is valid, allow password reset
      setValidLink(true);
    } else {
      setValidLink(false);
      setMessage({ 
        text: 'Invalid or expired reset link. Please request a new one.', 
        type: 'error' 
      });
    }
  }, [token, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setMessage({ text: 'Please enter and confirm your new password', type: 'error' });
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (password.length < 8) {
      setMessage({ 
        text: 'Password must be at least 8 characters long', 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (!token) throw new Error('Invalid or expired reset link');
      
      // Update the password using the token
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      
      setMessage({ 
        text: 'Your password has been updated successfully!', 
        type: 'success' 
      });
      
      // Clear the form
      setPassword('');
      setConfirmPassword('');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (error: any) {
      setMessage({ 
        text: error.message || 'An error occurred. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (validLink === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!validLink) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="The password reset link is invalid or has expired. Please request a new one."
      >
        <div className="space-y-6">
          <Button 
            as="a"
            href="/forgot-password"
            className="w-full"
            size="lg"
          >
            Request New Reset Link
          </Button>
          
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Please enter your new password below"
    >
      {message.text && (
        <div 
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-50 border-l-4 border-red-500' 
              : 'bg-green-50 border-l-4 border-green-500'
          }`}
        >
          <p className={`text-sm ${message.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
            {message.text}
          </p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="New password"
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />

          <Input
            label="Confirm new password"
            id="confirm-password"
            name="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>Your password must be at least 8 characters long.</p>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          size="lg"
          isLoading={loading}
          disabled={message.type === 'success'}
        >
          Update Password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link 
          href="/login" 
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
