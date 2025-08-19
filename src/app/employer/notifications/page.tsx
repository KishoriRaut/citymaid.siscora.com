'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const notifications = [
  {
    id: 1,
    title: 'New Application Received',
    message: 'Maria G. has applied for your Housekeeper position.',
    time: '2 hours ago',
    read: false,
    type: 'application',
  },
  {
    id: 2,
    title: 'Payment Confirmed',
    message: 'Your payment of $29.99 for Premium Membership has been processed.',
    time: '1 day ago',
    read: true,
    type: 'payment',
  },
  {
    id: 3,
    title: 'Profile Viewed',
    message: 'Your employer profile was viewed by 5 potential candidates.',
    time: '2 days ago',
    read: true,
    type: 'profile',
  },
  // Add more sample notifications as needed
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationsList(notificationsList.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const filteredNotifications = activeTab === 'all' 
    ? notificationsList 
    : notificationsList.filter(n => n.type === activeTab);

  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          </div>
          
          <div className="flex border-b border-gray-200 mb-6">
            {[
              { id: 'all', name: 'All' },
              { id: 'application', name: 'Applications' },
              { id: 'message', name: 'Messages' },
              { id: 'payment', name: 'Payments' },
              { id: 'profile', name: 'Profile' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <li key={notification.id} className={!notification.read ? 'bg-blue-50' : ''}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="mt-2">
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-12 text-center">
                  <p className="text-gray-500">No notifications to display</p>
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Preferences</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Manage how you receive notifications.</p>
                </div>
                <div className="mt-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p className="text-gray-500">Get notified via email for important updates.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="push-notifications"
                        name="push-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="push-notifications" className="font-medium text-gray-700">
                        Push notifications
                      </label>
                      <p className="text-gray-500">Get browser notifications when you're active on the site.</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save preferences
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
