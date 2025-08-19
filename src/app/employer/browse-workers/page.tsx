'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const workers = [
  {
    id: 1,
    name: 'Maria Garcia',
    photo: '/placeholder-avatar.jpg',
    skills: ['Housekeeping', 'Cooking', 'Childcare'],
    location: 'New York, NY',
    salary: '$1200 - $1500',
    rating: 4.8,
  },
  // Add more sample workers as needed
];

export default function BrowseWorkersPage() {
  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Browse Domestic Helpers</h1>
            <div className="w-64">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search workers..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <div key={worker.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={worker.photo}
                      alt={worker.name}
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-500">{worker.location}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">{worker.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{worker.salary}/month</span>
                    <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Unlock Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Load More
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
