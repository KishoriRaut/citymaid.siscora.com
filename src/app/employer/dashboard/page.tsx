'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
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
  HomeIcon
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

const quickActions = [
  { name: 'Dashboard', href: '/employer/dashboard', icon: HomeIcon, iconBackground: 'bg-gray-100', iconForeground: 'text-gray-700' },
  { name: 'Post a New Job', href: '/employer/post-job', icon: DocumentCheckIcon, iconBackground: 'bg-blue-100', iconForeground: 'text-blue-600' },
  { name: 'Browse Workers', href: '/employer/browse-workers', icon: UserGroupIcon, iconBackground: 'bg-green-100', iconForeground: 'text-green-600' },
  { name: 'View Analytics', href: '/employer/stats', icon: ChartBarIcon, iconBackground: 'bg-yellow-100', iconForeground: 'text-yellow-600' },
];

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

  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 bg-white/80 backdrop-blur border-r border-gray-200 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
              <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Quick Actions</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50/80 hover:text-gray-900 transition-all duration-200"
                >
                  <span className={`mr-3 flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center ${action.iconBackground} ${action.iconForeground}`}>
                    <action.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="truncate">{action.name}</span>
                  <svg className="ml-auto h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back, {user?.email?.split('@')[0] || 'Employer'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your job postings and applications today.
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4
            ">
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white/80 backdrop-blur border border-gray-200 overflow-hidden shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                  <Link href={stat.link} className="block">
                    <div className="p-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                            <stat.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                            <dd className="mt-1">
                              <div className="text-3xl font-semibold text-gray-900">{stat.value}</div>
                              <div className="mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {stat.changeType === 'increase' ? (
                                    <ArrowUpRightIcon className="-ml-0.5 mr-1 h-3 w-3 text-green-600" aria-hidden="true" />
                                  ) : (
                                    <ArrowDownRightIcon className="-ml-0.5 mr-1 h-3 w-3 text-red-600" aria-hidden="true" />
                                  )}
                                  {stat.change}
                                </span>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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
        </div>
      </div>
    </ProtectedRoute>
  );
}
