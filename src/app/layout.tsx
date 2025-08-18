import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "City Maid Services - Find Domestic Helpers in Nepal",
  description: "Connect with verified maids, babysitters, and caregivers in Nepal. Fast, safe, and reliable domestic help services.",
  keywords: ["maid service nepal", "domestic helper kathmandu", "babysitter nepal", "elder care nepal", "house help nepal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">City Maid Services</h3>
                  <p className="text-gray-400">Connecting families with trusted domestic help</p>
                </div>
                <div className="flex space-x-6">
                  <a href="/about" className="text-gray-300 hover:text-white">About Us</a>
                  <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
                  <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
                  <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} City Maid Services. All rights reserved.
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
