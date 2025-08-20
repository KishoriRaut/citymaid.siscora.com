'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function EmployerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Dashboard', href: '/employer/dashboard', icon: HomeIcon, current: pathname === '/employer/dashboard' },
    { name: 'Post a Job', href: '/employer/post-job', icon: BriefcaseIcon, current: pathname === '/employer/post-job' },
    { name: 'Find Maids', href: '/employer/find-maids', icon: UserGroupIcon, current: pathname.startsWith('/employer/find-maids') },
    { name: 'My Contacts', href: '/employer/contacts', icon: UserCircleIcon, current: pathname.startsWith('/employer/contacts') },
    { name: 'Payments', href: '/employer/payments', icon: CreditCardIcon, current: pathname.startsWith('/employer/payments') },
    { name: 'Settings', href: '/employer/settings', icon: Cog6ToothIcon, current: pathname.startsWith('/employer/settings') },
    { name: 'Help & Support', href: '/employer/help', icon: QuestionMarkCircleIcon, current: pathname.startsWith('/employer/help') },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-16 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-2xl font-bold text-white">Employer Portal</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/auth/signout"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                >
                  <ArrowRightOnRectangleIcon
                    className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                    aria-hidden="true"
                  />
                  Sign out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex-1">
        <div className="py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
