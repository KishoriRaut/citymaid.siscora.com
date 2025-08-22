'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUser, FiBriefcase, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

type SidebarLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles?: ('employer' | 'maid')[];
};

export function Sidebar() {
  const pathname = usePathname();
  const { role, signOut } = useAuth();

  const links: SidebarLink[] = [
    {
      name: 'Dashboard',
      href: `/${role}/dashboard`,
      icon: <FiHome className="w-5 h-5" />,
    },
    {
      name: 'My Profile',
      href: `/${role}/profile`,
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      name: 'Jobs',
      href: `/${role}/jobs`,
      icon: <FiBriefcase className="w-5 h-5" />,
    },
    {
      name: 'Settings',
      href: `/${role}/settings`,
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  // Filter links based on user role if roles are specified
  const filteredLinks = links.filter(
    (link) => !link.roles || (role && link.roles.includes(role))
  );

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-800">
              {role === 'maid' ? 'Maid' : 'Employer'} Dashboard
            </h1>
          </div>
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-2 space-y-1 bg-white">
              {filteredLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
          <button
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-left text-gray-700 rounded-md group hover:bg-gray-50"
          >
            <FiLogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
