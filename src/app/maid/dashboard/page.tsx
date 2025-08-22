'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MaidDashboard() {
  const { user, signOut } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['maid']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center opacity-10"></div>
              <div className="relative px-8 py-12 sm:py-16 md:py-20">
                <div className="max-w-3xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome back, {user?.name || 'Maid'}</h1>
                  <p className="text-lg text-blue-100 mb-8">
                    Here's what's happening with your job applications and profile today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                      View Available Jobs
                    </button>
                    <button 
                      onClick={signOut}
                      className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Applied Jobs</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-medium text-green-600">
                    <svg className="-ml-1 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M2.5 0L0 2.5h5L2.5 0z" />
                      <path d="M0 2.5v3h8v-3H0z" />
                      <path d="M0 5.5L2.5 8l2.5-2.5H0z" />
                    </svg>
                    12% from last month
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Interviews</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-medium text-green-600">
                    <svg className="-ml-1 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M2.5 0L0 2.5h5L2.5 0z" />
                      <path d="M0 2.5v3h8v-3H0z" />
                      <path d="M0 5.5L2.5 8l2.5-2.5H0z" />
                    </svg>
                    8% from last month
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Profile Views</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-medium text-green-600">
                    <svg className="-ml-1 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
                      <path d="M2.5 0L0 2.5h5L2.5 0z" />
                      <path d="M0 2.5v3h8v-3H0z" />
                      <path d="M0 5.5L2.5 8l2.5-2.5H0z" />
                    </svg>
                    19.8% from last month
                  </span>
                </div>
              </div>
            </div>
            
            {/* Recent Job Matches */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Job Matches</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recent job matches</h3>
                <p className="mt-1 text-sm text-gray-500">We'll notify you when we find jobs that match your profile.</p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Update Profile Preferences
                  </button>
                </div>
              </div>
            </div>
            
            {/* Profile Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Your Profile Status</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-800">Profile 70% Complete</h3>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="mt-2 text-sm text-blue-700">Complete your profile to increase your chances of getting hired</p>
                  </div>
                  <div className="ml-auto">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Complete Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
