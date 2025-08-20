'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type Testimonial = {
  id: number;
  content: string;
  author: string;
  location: string;
};

type MaidProfile = {
  id: number;
  name: string;
  experience: string;
  skills: string;
  location: string;
};

type JobPost = {
  id: number;
  title: string;
  location: string;
  timing: string;
  salary: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "City Maid Services helped us find a trustworthy babysitter in just 2 days. Highly recommended!",
    author: "Anjali",
    location: "Kathmandu"
  },
  {
    id: 2,
    content: "Very professional service. I could easily compare profiles before hiring.",
    author: "Ramesh",
    location: "Lalitpur"
  }
];

const maidProfiles: MaidProfile[] = [
  {
    id: 1,
    name: "Sita",
    experience: "3+ Years Experience",
    skills: "Cooking & Babysitting",
    location: "Available in Kathmandu"
  },
  {
    id: 2,
    name: "Maya",
    experience: "2+ Years Experience",
    skills: "Elder Care & Cleaning",
    location: "Available in Lalitpur"
  }
];

const jobPosts: JobPost[] = [
  {
    id: 1,
    title: "Babysitter Needed",
    location: "Bhaisepati",
    timing: "8am–4pm",
    salary: "NPR 18,000/month"
  },
  {
    id: 2,
    title: "Full-time Cook & Cleaner",
    location: "Baneshwor",
    timing: "Full-time",
    salary: "Negotiable"
  }
];

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Reliable, Verified Domestic Helpers in Nepal</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Fast, Safe, and Stress-Free. Connect with trusted maids, babysitters, caregivers, and more – all background-checked for your peace of mind.</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/browse/maids" 
              className="w-full sm:w-auto bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2"
            >
              👩‍🍳 Browse Maids
            </Link>
            <Link 
              href="/browse/jobs" 
              className="w-full sm:w-auto bg-blue-700 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center justify-center gap-2"
            >
              💼 Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Profiles & Jobs</h3>
              <p className="text-gray-600">Explore verified maid profiles and available jobs without logging in.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Choose the Right Match</h3>
              <p className="text-gray-600">Compare skills, experience, and availability to find what fits your needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Hire with Confidence</h3>
              <p className="text-gray-600">All helpers are background-checked and trusted by hundreds of families in Nepal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Maid Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Maid Profiles</h2>
            <Link href="/maids" className="text-blue-600 hover:underline">Browse All Maids →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maidProfiles.map((maid) => (
              <div key={maid.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{maid.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{maid.experience}</p>
                  <p className="text-gray-600 mb-2">{maid.skills}</p>
                  <p className="text-gray-500 text-sm">{maid.location}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Job Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Job Posts</h2>
            <Link href="/jobs" className="text-blue-600 hover:underline">Browse All Jobs →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {jobPosts.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">📍 {job.location}</p>
                  <p className="text-gray-600">⏰ {job.timing}</p>
                  <p className="text-gray-600">💰 {job.salary}</p>
                </div>
                <button className="mt-4 text-blue-600 font-medium hover:underline">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose City Maid Services?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "✅ Verified & Background Checked Helpers",
              "✅ Wide Range of Services – Babysitting, Elder Care, Cooking, Cleaning, Gardening & More",
              "✅ Easy & Secure Payment with Khalti",
              "✅ 24/7 Customer Support"
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                <p className="font-semibold">– {testimonial.author}, {testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Looking for a trusted maid or a reliable job?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Start today with City Maid Services</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/maids" className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300">
              🔍 Find Maids
            </Link>
            <Link href="/post-job" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300">
              📋 Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest maid profiles and job posts</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">City Maid Services</h3>
              <p className="text-gray-400">Connecting families with reliable domestic help across Nepal.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">📞</span> 9841317273
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✉️</span> citymaidservicesnepal@gmail.com
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📍</span>
                  <span>Serving all major cities of Nepal</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} City Maid Services. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
