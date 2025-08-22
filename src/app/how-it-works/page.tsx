'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and create a detailed profile highlighting your skills, experience, and availability.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      number: '02',
      title: 'Browse Jobs',
      description: 'Explore available job postings that match your skills and preferences.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      number: '03',
      title: 'Apply & Connect',
      description: 'Submit your application and connect with potential employers through our messaging system.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      number: '04',
      title: 'Get Hired',
      description: 'Complete the hiring process and start your new job with confidence.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600'
    }
  ];

  const faqs = [
    {
      question: 'How do I create a maid profile?',
      answer: 'Creating a profile is simple! Click on "Sign Up", select "I\'m a Maid", and fill in your details including your experience, skills, and availability. Make sure to add a professional photo and detailed description to attract more employers.'
    },
    {
      question: 'How do I get paid for my services?',
      answer: 'All payments are processed securely through our platform. After completing a job, the payment will be released to your account once the employer confirms the service. You can withdraw your earnings to your bank account or mobile money wallet, with processing times of 1-3 business days.'
    },
    {
      question: 'What kind of background checks are done?',
      answer: 'We conduct thorough background checks including identity verification, criminal record checks, and reference verification. All maids on our platform are vetted to ensure safety and reliability. You\'ll see a verification badge on profiles that have completed all checks.'
    },
    {
      question: 'How do I handle difficult clients?',
      answer: 'Your safety is our priority. If you encounter any issues with a client, you can report them through our platform. We have a 24/7 support team ready to assist. You\'re never obligated to continue working in an uncomfortable situation - your well-being comes first.'
    },
    {
      question: 'What are the service fees?',
      answer: 'We charge a small service fee of 15% per booking. This helps us maintain the platform, provide 24/7 support, and continuously improve our services. There are no hidden fees - you\'ll always see the exact amount you\'ll earn before accepting a job.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              How It Works
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to find your perfect job match and start earning today
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/auth/signup"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="#faq"
                className="px-6 py-3 rounded-lg bg-white text-gray-700 font-medium shadow-md hover:bg-gray-50 transition-all duration-300 border border-gray-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Start working in 4 simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative bg-white p-6 rounded-2xl h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                    <div className={step.textColor}>
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-gray-700">{step.number}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about finding work on CityMaid
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full px-6 py-4 text-left rounded-xl transition-all duration-300 flex justify-between items-center ${
                      activeFaq === index 
                        ? 'bg-white shadow-lg border border-gray-100' 
                        : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to start your journey?</span>
              <span className="block">Create your profile today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who found their dream jobs through CityMaid.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3 rounded-lg bg-white text-blue-700 font-medium shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-lg bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
