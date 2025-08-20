'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  DocumentCheckIcon, 
  ClockIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  BellIcon,
  CalendarIcon,
  UserGroupIcon,
  HomeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const stats = [
  { id: 1, name: 'Active Jobs', value: '3', icon: BriefcaseIcon, change: '+2.5%', changeType: 'increase', link: '/employer/my-jobs' },
  { id: 2, name: 'New Applications', value: '12', icon: DocumentCheckIcon, change: '+30.1%', changeType: 'increase', link: '/employer/my-jobs' },
  { id: 3, name: 'Shortlisted', value: '5', icon: UsersIcon, change: '+1.8%', changeType: 'decrease', link: '/employer/my-jobs' },
  { id: 4, name: 'Upcoming Interviews', value: '2', icon: CalendarIcon, change: '+0.5%', changeType: 'increase', link: '#' },
];

const recentActivity = [
  { id: 1, type: 'application', description: 'Maria G. applied for Housekeeper position', time: '2h ago', read: false },
  { id: 2, type: 'message', description: 'New message from Sarah M.', time: '5h ago', read: true },
  { id: 3, type: 'payment', description: 'Payment received for Premium Membership', time: '1d ago', read: true },
  { id: 4, type: 'job', description: 'Your job post has been approved', time: '2d ago', read: true },
];

// Quick actions will be defined inside the component to access the signOut function

function ChartBarIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}

export default function EmployerDashboard() {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState([
    { id: 1, name: 'Active Jobs', value: '0', icon: BriefcaseIcon, change: '+0%', changeType: 'increase', link: '/employer/dashboard' },
    { id: 2, name: 'Unlocked Contacts', value: '0', icon: UserGroupIcon, change: '+0%', changeType: 'increase', link: '/employer/contacts' },
    { id: 3, name: 'New Messages', value: '0', icon: BellIcon, change: '+0%', changeType: 'increase', link: '#' },
  ]);

  // Handle sign out from layout
  useEffect(() => {
    const handleSignOut = () => signOut();
    window.addEventListener('signOut', handleSignOut);
    return () => window.removeEventListener('signOut', handleSignOut);
  }, [signOut]);

  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.email?.split('@')[0] || 'Employer'}</h1>
            <p className="mt-2 text-gray-600">Here's what's happening with your job postings and contacts today.</p>
          </div>
        </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Link 
                key={stat.id} 
                href={stat.link}
                className="block bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.changeType === 'increase' ? (
                      <span className="inline-flex items-center">
                        <ArrowUpRightIcon className="h-4 w-4 mr-1" />
                        {stat.change}
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <ArrowDownRightIcon className="h-4 w-4 mr-1" />
                        {stat.change}
                      </span>
                    )}
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
                    <Link href="/employer/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View all
                    </Link>
                  </div>
                  <div className="mt-6 flow-root">
                    <ul className="-mb-8">
                      {recentActivity.map((activity, activityIdx) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {activityIdx !== recentActivity.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                    activity.type === 'application'
                                      ? 'bg-green-100 text-green-700'
                                      : activity.type === 'message'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-purple-100 text-purple-700'
                                  }`}
                                >
                                  {activity.type === 'application' ? (
                                    <DocumentCheckIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : activity.type === 'message' ? (
                                    <BellIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <BriefcaseIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-800">
                                    {activity.description}
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <time dateTime={activity.time}>{activity.time}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <div className="bg-white/80 backdrop-blur border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                          <CalendarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Interview with Sarah M.</p>
                        <p className="text-sm text-gray-500">Tomorrow, 10:00 AM - 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100">
                          <DocumentCheckIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Review new applications</p>
                        <p className="text-sm text-gray-500">5 new applications to review</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                          <UsersIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Team meeting</p>
                        <p className="text-sm text-gray-500">Friday, 11:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="#"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all tasks
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-white/80 backdrop-blur border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Profile Completion</p>
                        <p className="text-sm font-medium text-gray-900">85%</p>
                      </div>
                      <div className="mt-1.5 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 w-[85%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Active Job Posts</p>
                        <p className="text-sm font-medium text-gray-900">3/5</p>
                      </div>
                      <div className="mt-1.5 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-500 h-2.5 w-[60%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Response Rate</p>
                        <p className="text-sm font-medium text-gray-900">92%</p>
                      </div>
                      <div className="mt-1.5 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 h-2.5 w-[92%]"></div>
                      </div>
                    </div>
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
