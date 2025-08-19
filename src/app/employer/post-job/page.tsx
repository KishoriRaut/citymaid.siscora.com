'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

import { 
  PaperClipIcon, BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, 
  UserIcon, CalendarIcon, UsersIcon, GlobeAsiaAustraliaIcon,
  ClockIcon, DocumentTextIcon, CheckCircleIcon, UserGroupIcon,
  CakeIcon, UserCircleIcon
} from '@heroicons/react/24/outline';

const cities = [
  'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Patan', 'Kirtipur', 'Pokhara',
  'Biratnagar', 'Bharatpur', 'Birgunj', 'Butwal', 'Dharan',
  'Bhimdatta', 'Dhangadhi', 'Nepalgunj', 'Itahari', 'Hetauda', 'Janakpur',
  'Dhankuta', 'Tansen', 'Siddharthanagar', 'Birendranagar', 'Tikapur', 'Ghorahi'
].sort();

const skills = [
  'Cleaning', 'Cooking', 'Babysitting', 'Elder Care', 
  'Postnatal Care', 'Sick Care', 'Pet Care', 'Gardening'
];

const experienceLevels = [
  'No experience required',
  '1-2 years',
  '3-5 years',
  '5+ years'
];

const workTypes = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'live-in', label: 'Live-in' },
  { id: 'live-out', label: 'Live-out' }
];

const paymentFrequencies = [
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: 'Daily' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'negotiable', label: 'Negotiable' }
];

const genderPreferences = [
  { id: 'female', label: 'Female', icon: UserCircleIcon },
  { id: 'male', label: 'Male', icon: UserCircleIcon },
  { id: 'no-preference', label: 'No preference', icon: UserGroupIcon }
];

export default function PostJobPage() {
  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Post a New Job</h1>
            <p className="mt-3 text-lg text-gray-500">Fill in the details below to find the perfect candidate</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur shadow-xl ring-1 ring-gray-100 rounded-2xl overflow-hidden">
            <div className="p-5 sm:p-8">
              <form className="space-y-6 sm:space-y-8">
                {/* Job Title */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Job Title</label>
                  </div>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="e.g. Professional Housekeeper, Babysitter, Cook"
                    required
                  />
                </div>
                
                {/* Job Description */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Job Description</label>
                  </div>
                  <div className="mt-1">
                    <textarea
                      rows={6}
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      placeholder="• List key responsibilities\n• Required skills and experience\n• Work schedule (days/hours)\n• Benefits and perks"
                      required
                    />
                  </div>
                </div>
                
                {/* Location and Salary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
                    </div>
                    <div className="relative">
                      <select
                        id="city"
                        className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6 appearance-none"
                        required
                        aria-label="Select city"
                        title="Select city"
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Area/Neighborhood */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2 opacity-0" />
                      <label className="block text-sm font-semibold text-gray-700">Area/Neighborhood</label>
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      placeholder="e.g. Baneshwor, New Baneshwor"
                      required
                    />
                  </div>
                </div>
                
                {/* Salary and Payment Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <label className="block text-sm font-semibold text-gray-700">Salary / Payment</label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                        placeholder="e.g. NPR 15,000 – 20,000 / month"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <label className="block text-sm font-semibold text-gray-700">Payment Frequency</label>
                    </div>
                    <div className="relative">
                      <select
                        id="paymentFrequency"
                        name="paymentFrequency"
                        className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6 appearance-none"
                        defaultValue="monthly"
                        aria-label="Payment frequency"
                        title="Payment frequency"
                      >
                        {paymentFrequencies.map((freq) => (
                          <option key={freq.id} value={freq.id}>
                            {freq.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Type */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Work Type</label>
                  </div>
                  <div className="relative">
                    <select
                      id="workType"
                      name="workType"
                      className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6 appearance-none"
                      defaultValue="full-time"
                      aria-label="Work type"
                      title="Work type"
                    >
                      {workTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Required Skills</label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {skills.map((skill) => (
                      <label key={skill} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          name="skills"
                          value={skill}
                          className="peer sr-only"
                        />
                        <span className="inline-flex items-center justify-center w-full rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm text-gray-700 shadow-sm peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:ring-2 peer-checked:ring-blue-200 transition-colors">
                          {skill}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Experience */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <label htmlFor="experience" className="block text-sm font-semibold text-gray-700">Experience Preference</label>
                    </div>
                    <div className="relative">
                      <select
                        id="experience"
                        name="experience"
                        className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6 appearance-none"
                        required
                        aria-label="Experience preference"
                        title="Experience preference"
                      >
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700">Start Date</label>
                    </div>
                    <div className="relative">
                      <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                        required
                        aria-label="Start date"
                        title="Start date"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gender Preference */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Preferred Gender (Optional)</label>
                  </div>
                  <div className="relative">
                    <select
                      id="genderPreference"
                      name="genderPreference"
                      className="block w-full rounded-xl border border-gray-200 bg-white/60 py-3 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6 appearance-none"
                      defaultValue="no-preference"
                      aria-label="Preferred gender"
                      title="Preferred gender"
                    >
                      {genderPreferences.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Age Range */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CakeIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Preferred Age Range (Optional)</label>
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="e.g. 20–40 years"
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <label className="block text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
                  </div>
                  <textarea
                    rows={3}
                    className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Any additional requirements or information"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-3 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                  >
                    Post Job Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-gray-500">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="hover:text-gray-700">About Us</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Contact</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
            </div>
            <p>© {new Date().getFullYear()} City Maid Services. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
