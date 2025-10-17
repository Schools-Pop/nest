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
        <style jsx>{`
          @keyframes float-right {
            0%, 100% {
              transform: translateX(0px) translateY(0px);
            }
            50% {
              transform: translateX(30px) translateY(-30px);
            }
          }

          @keyframes float-left {
            0%, 100% {
              transform: translateX(0px) translateY(0px);
            }
            50% {
              transform: translateX(-30px) translateY(30px);
            }
          }

          .circle-right {
            animation: float-right 6s ease-in-out infinite;
          }

          .circle-left {
            animation: float-left 8s ease-in-out infinite;
          }
        `}</style>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full circle-right"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full circle-left"></div>
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
              Find your perfect home, discover trusted restaurants, explore opportunities, and quickly sell items you no longer need.
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
              Five essential services designed for international students in Rwanda
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {/* Housing Card */}
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-5xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Housing</h3>
                  <p className="text-gray-600 mb-4 text-sm flex-1">
                    Find verified student-friendly accommodations with real-time distance to campus and transport costs.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Distance to campus
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Transport costs
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Landlord contact
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Pre-arrival booking
                    </li>
                  </ul>
                  <Link
                    href="/find"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                  >
                    Browse →
                  </Link>
                </div>
              </div>

              {/* Food Card */}
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-5xl mb-4">🍽️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Food Guide</h3>
                  <p className="text-gray-600 mb-4 text-sm flex-1">
                    Discover authentic African restaurants recommended by fellow students with real reviews.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-orange-600 font-bold">✓</span> Peer reviews
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-orange-600 font-bold">✓</span> Authentic cuisine
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-orange-600 font-bold">✓</span> Student favorites
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-orange-600 font-bold">✓</span> Price range shown
                    </li>
                  </ul>
                  <Link
                    href="/food"
                    className="w-full px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition text-center text-sm"
                  >
                    Explore →
                  </Link>
                </div>
              </div>

              {/* Opportunities Card */}
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Opportunities</h3>
                  <p className="text-gray-600 mb-4 text-sm flex-1">
                    Discover internships, scholarships, events, and career opportunities from organizations and students.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span> Internships & jobs
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span> Scholarships
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span> Events & workshops
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span> Post your own
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <Link
                      href="/opportunity"
                      className="flex-1 px-3 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition text-center text-xs"
                    >
                      Browse
                    </Link>
                    <Link
                      href="/addopportunity"
                      className="flex-1 px-3 py-2 border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition text-center text-xs"
                    >
                      Post
                    </Link>
                  </div>
                </div>
              </div>

              {/* Marketplace Card */}
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Marketplace</h3>
                  <p className="text-gray-600 mb-4 text-sm flex-1">
                    Quickly sell items you no longer need to fellow students at student-friendly prices.
                  </p>
                  <ul className="space-y-2 mb-6 text-xs">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Fast listings
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Trusted community
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Easy transactions
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Support peers
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <Link
                      href="/buy"
                      className="flex-1 px-3 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-center text-xs"
                    >
                      Buy
                    </Link>
                    <Link
                      href="/sell"
                      className="flex-1 px-3 py-2 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition text-center text-xs"
                    >
                      Sell
                    </Link>
                  </div>
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
              { icon: '⚡', title: 'Fast & Reliable', desc: 'Quick responses and same-day availability' },
              { icon: '🔒', title: 'Secure', desc: 'Your data is protected with industry-standard security' },
              { icon: '📚', title: 'Share Opportunities', desc: 'Post and discover career & academic opportunities' },
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
              { num: 2, title: 'Explore', desc: 'Browse housing, restaurants, and marketplace' },
              { num: 3, title: 'Connect', desc: 'Message landlords, share reviews, or buy/sell items' },
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
              { stat: '200+', label: 'Restaurants' },
              { stat: '500+', label: 'Opportunities' },
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
              <p className="text-sm">Your complete student platform for housing, food, opportunities, and community.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/find" className="hover:text-white transition">🏠 Find Housing</Link></li>
                <li><Link href="/food" className="hover:text-white transition">🍽️ Restaurant Guide</Link></li>
                <li><Link href="/opportunity" className="hover:text-white transition">📚 Opportunities</Link></li>
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
              <p className="text-sm">📞 +250 796 590 496</p>
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
