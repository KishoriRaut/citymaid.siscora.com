'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import AuthLayout from '@/components/auth/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ 
    text: '', 
    type: '' 
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ text: 'Please enter your email', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setMessage({ 
        text: 'Password reset link sent! Please check your email.', 
        type: 'success' 
      });
      
      // Clear the form
      setEmail('');
    } catch (error: any) {
      setMessage({ 
        text: error.message || 'An error occurred. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password"
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
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
        />

        <Button 
          type="submit" 
          className="w-full"
          size="lg"
          isLoading={loading}
        >
          Send reset link
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
