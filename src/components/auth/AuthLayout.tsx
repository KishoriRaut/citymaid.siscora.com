import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-blue-100">{subtitle}</p>
              )}
            </div>
            
            {/* Form container */}
            <div className="px-6 py-8 sm:px-10">
              {children}
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} CityMaid. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
