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
              Stop juggling countless apps and groups — find housing, roommates, opportunities, and quiclkly sell items you nolonger need, all in one trusted student platform.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => router.push('/find')}
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
              >
                🏠 Find Housing
              </button>
              {/* <Link
                href="/auth/register"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600 transition text-lg"
              >
                Get Started
              </Link> */}
            </div>

            {/* AI Assistant Quick Access */}
            {/* <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition cursor-pointer group" onClick={() => router.push('/ask')}>
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-indigo-100 mb-1">Need Help?</p>
                    <p className="text-lg text-white font-bold group-hover:text-yellow-300 transition">
                      🤖 Ask our AI Assistant anything about student life
                    </p>
                  </div>
                  <div className="text-3xl ml-4">✨</div>
                </div>
                <p className="text-xs text-indigo-100 mt-3">Get instant answers about courses, housing, events, and more</p>
              </div>
            </div> */}
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
              Three essential services designed for international students at CMU Africa
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
                      <span className="text-indigo-600 font-bold">✓</span> Distance to bus stop
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Transport costs
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-indigo-600 font-bold">✓</span> Landlord contact
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
              {/* <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full">
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
              </div> */}

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
                      <span className="text-green-600 font-bold">✓</span> List an item for sale
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Buy an Item
                    </li>
                    {/* <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span> Easy transactions
                    </li> */}
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

      {/* Roommates Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Roommate
            </h2>
            <p className="text-xl text-gray-600">
              Connect with students looking for roommates and share your accommodation
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-6">🤝</div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Looking for Roommates?</h3>
                    <p className="text-gray-700 text-lg mb-8">
                      Find students searching for roommates to share housing costs and build a community. Split rent, share experiences, and make new friends!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/roommates"
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-center text-base"
                    >
                      Search Profiles →
                    </Link>
                    <Link
                      href="/addroommate"
                      className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-center text-base"
                    >
                      Post Your Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Resource Center Section */}
      {/* <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Get Instant Answers
            </h2>
            <p className="text-xl text-gray-600">
              AI-powered resource center for student questions and support
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-6">🤖</div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Resource Center</h3>
                    <p className="text-gray-700 text-lg mb-8">
                      Ask questions about courses, services, housing, and anything else about student life. Get instant answers powered by AI from our knowledge base of student resources and FAQs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl">
                      <p className="text-2xl mb-2">🤖</p>
                      <h4 className="font-bold text-gray-900 mb-1">AI Assistant</h4>
                      <p className="text-sm text-gray-600">Instant responses to your questions</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl">
                      <p className="text-2xl mb-2">📚</p>
                      <h4 className="font-bold text-gray-900 mb-1">Rich Knowledge Base</h4>
                      <p className="text-sm text-gray-600">Comprehensive info on all services</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl">
                      <p className="text-2xl mb-2">⚡</p>
                      <h4 className="font-bold text-gray-900 mb-1">24/7 Available</h4>
                      <p className="text-sm text-gray-600">Always ready to help anytime</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/ask"
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-center text-base"
                    >
                      Ask a Question →
                    </Link>
                    <Link
                      href="/ask"
                      className="flex-1 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition text-center text-base"
                    >
                      Browse Resources
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose StudentNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📍',
                title: 'Everything in One Place',
                desc: 'Access housing, food, opportunities, roommates, and student resources all from a single platform. No need to search across multiple apps and websites.',
              },
              {
                icon: '⚡',
                title: 'Quick & Fast Information',
                desc: 'Get instant answers with our AI-powered resource center. Find housing listings in seconds, discover restaurants instantly, and access opportunities as soon as they\'re posted.',
              },
              {
                icon: '🤝',
                title: 'Community Sharing',
                desc: 'Share recommendations, post opportunities, and connect with thousands of fellow students. Build a supportive community where everyone helps each other succeed.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
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
              { num: 1, title: 'Sign Up', desc: 'Create your free account in minutes with your email' },
              { num: 2, title: 'Explore', desc: 'Browse housing, restaurants, opportunities, roommates, and student resources' },
              { num: 3, title: 'Connect & Share', desc: 'Post opportunities, share recommendations, and build community with fellow students' },
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
            <p>&copy; 2025 StudentNest. Simplifying student life in at CMU Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
