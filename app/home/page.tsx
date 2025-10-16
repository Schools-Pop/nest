'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Your Student Life,<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Find your perfect home, discover amazing food, and support your peers through our integrated student community platform.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => router.push('/find')}
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
              >
                🏠 Find Housing
              </button>
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600 transition text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Three essential services designed for international students in Rwanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Housing Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="p-8 relative z-10">
                <div className="text-7xl mb-6">🏠</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Smart Housing</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Find verified student-friendly accommodations with real-time distance to campus, bus stops, and transport costs.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> Distance to campus
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> Transport cost estimates
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> Direct landlord contact
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> Pre-arrival booking
                  </li>
                </ul>
                <Link
                  href="/find"
                  className="inline-block w-full text-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  Browse Houses →
                </Link>
              </div>
            </div>

            {/* Food Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="p-8 relative z-10">
                <div className="text-7xl mb-6">🍽️</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Food Marketplace</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Discover authentic African cuisine from restaurants across Kigali. Food delivery designed for student budgets.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-orange-600">✓</span> African cuisines
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-orange-600">✓</span> Budget-friendly prices
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-orange-600">✓</span> Fast delivery
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-orange-600">✓</span> Real reviews
                  </li>
                </ul>
                <Link
                  href="/food"
                  className="inline-block w-full text-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
                >
                  Order Food →
                </Link>
              </div>
            </div>

            {/* Marketplace Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-600 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="p-8 relative z-10">
                <div className="text-7xl mb-6">🛒</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Student Marketplace</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Buy and sell items from fellow students. Furniture, electronics, books, and more at student-friendly prices.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> Furniture & home items
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> Electronics & gadgets
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> Books & supplies
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> Support your peers
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Link
                    href="/buy"
                    className="flex-1 text-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    Buy →
                  </Link>
                  <Link
                    href="/sale"
                    className="flex-1 text-center px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition"
                  >
                    Sell →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose StudentNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '✅', title: 'Verified & Safe', desc: 'All listings verified and student-friendly with genuine reviews' },
              { icon: '📱', title: 'Easy to Use', desc: 'Intuitive platform designed specifically for students' },
              { icon: '💰', title: 'Affordable', desc: 'Budget-friendly options from landlords and sellers' },
              { icon: '🌍', title: 'Community', desc: 'Connect with international students and support each other' },
              { icon: '⚡', title: 'Fast & Reliable', desc: 'Quick responses and same-day delivery options' },
              { icon: '🔒', title: 'Secure', desc: 'Your data is protected with industry-standard security' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
            Get Started in 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Sign Up', desc: 'Create your free account in minutes' },
              { num: 2, title: 'Explore', desc: 'Browse housing, food, and marketplace' },
              { num: 3, title: 'Connect', desc: 'Message landlords, order food, or buy/sell items' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {step.num < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-4xl text-indigo-300">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '5,000+', label: 'Active Students' },
              { stat: '1,200+', label: 'Verified Houses' },
              { stat: '150+', label: 'Restaurants' },
              { stat: '10,000+', label: 'Marketplace Items' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <p className="text-xl text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Simplify Your Student Life?</h2>
          <p className="text-2xl text-indigo-100 mb-8">Join thousands of international students already using StudentNest</p>
          <Link
            href="/auth/register"
            className="inline-block px-12 py-4 bg-white text-indigo-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition"
          >
            Get Started Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">StudentNest</h4>
              <p className="text-sm">Your complete student platform for housing, food, and community.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/find" className="hover:text-white transition">🏠 Find Housing</Link></li>
                <li><Link href="/food" className="hover:text-white transition">🍽️ Order Food</Link></li>
                <li><Link href="/buy" className="hover:text-white transition">🛒 Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <p className="text-sm">📧 info@studentnest.rw</p>
              <p className="text-sm">📞 +250 XXX XXX XXX</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 StudentNest. Simplifying student life in Rwanda.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
