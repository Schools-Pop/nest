'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Listing {
  id: string;
  name: string;
  price: number;
  image: string;
  distanceFromSchool: number;
  distanceFromBusStop: number;
  bikeCostToSchool: number;
  address: string;
  amenities: string[];
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  landlord: {
    name: string;
    avatar: string;
    responseTime: string;
    phone: string;
    email: string;
  };
  reviews_list: Array<{
    author: string;
    rating: number;
    date: string;
    text: string;
    avatar: string;
  }>;
  services: string[];
  rules: string[];
  leaseTerms: string;
  availableFrom: string;
}

const DUMMY_LISTINGS: { [key: string]: Listing } = {
  '1': {
    id: '1',
    name: 'Cozy Studio Near Campus',
    price: 150000,
    image: '🏠',
    distanceFromSchool: 0.5,
    distanceFromBusStop: 0.2,
    bikeCostToSchool: 500,
    address: 'Kigali, Nyamirambo',
    description: 'A cozy and well-maintained studio apartment located just 500m from campus. Perfect for international students looking for convenience and proximity to their university. The apartment features a comfortable living space with modern amenities.',
    amenities: ['WiFi', 'Water', 'Electricity', 'Furnished', 'AC', 'Shared Kitchen'],
    rating: 4.5,
    reviews: 12,
    images: ['🏠', '🛏️', '🚪', '🪟', '🛁', '🍳'],
    landlord: {
      name: 'Jean Claude',
      avatar: '👨',
      responseTime: 'Within 1 hour',
      phone: '+250 788 123 456',
      email: 'jean.claude@email.com',
    },
    reviews_list: [
      {
        author: 'Michael O.',
        rating: 5,
        date: 'Dec 2023',
        text: 'Excellent location! Very close to campus and the landlord is super responsive. Highly recommend!',
        avatar: '👨‍🎓',
      },
      {
        author: 'Sarah K.',
        rating: 4,
        date: 'Nov 2023',
        text: 'Great apartment for the price. Water and electricity are reliable. Only minor issue with WiFi stability.',
        avatar: '👩‍🎓',
      },
      {
        author: 'David M.',
        rating: 4.5,
        date: 'Oct 2023',
        text: 'Perfect for students. Clean, safe neighborhood, and very convenient.',
        avatar: '👨‍🎓',
      },
    ],
    services: ['WiFi (5 Mbps)', 'Water 24/7', 'Electricity', 'Laundry Service', 'Security (24/7)', 'Garbage Collection'],
    rules: ['No loud noise after 10 PM', 'No smoking inside', 'No pets allowed', 'Visitors allowed until 9 PM', 'Keep common areas clean'],
    leaseTerms: '12 months minimum',
    availableFrom: 'January 15, 2024',
  },
  '2': {
    id: '2',
    name: 'Modern 1-Bedroom Apartment',
    price: 250000,
    image: '🏢',
    distanceFromSchool: 1.2,
    distanceFromBusStop: 0.8,
    bikeCostToSchool: 800,
    address: 'Kigali, Gisozi',
    description: 'A modern and spacious 1-bedroom apartment with contemporary furnishings. Features include a separate kitchen, living area, and full bathroom. Perfect for students who want more space and comfort.',
    amenities: ['WiFi', 'Water', 'Kitchen', 'Balcony', 'AC', 'Furnished'],
    rating: 4.8,
    reviews: 24,
    images: ['🏢', '🛏️', '🛋️', '🍳', '🛁', '🪟'],
    landlord: {
      name: 'Marie Jeanne',
      avatar: '👩',
      responseTime: 'Within 30 minutes',
      phone: '+250 788 234 567',
      email: 'marie.jeanne@email.com',
    },
    reviews_list: [
      {
        author: 'Emma L.',
        rating: 5,
        date: 'Dec 2023',
        text: 'Absolutely love this apartment! Modern, clean, and the landlord is amazing. Would definitely recommend.',
        avatar: '👩‍🎓',
      },
      {
        author: 'John P.',
        rating: 5,
        date: 'Nov 2023',
        text: 'Best place I\'ve lived. Great balcony view, good WiFi, and landlord is very professional.',
        avatar: '👨‍🎓',
      },
    ],
    services: ['High-speed WiFi (20 Mbps)', 'Water 24/7', 'Electricity', 'Security', 'Cleaning Service (weekly)'],
    rules: ['No loud parties', 'No smoking', 'Respect quiet hours (10 PM - 8 AM)', 'Visitors welcome'],
    leaseTerms: '6-12 months flexible',
    availableFrom: 'Immediately',
  },
  '3': {
    id: '3',
    name: 'Budget-Friendly Room',
    price: 100000,
    image: '🏘️',
    distanceFromSchool: 2.1,
    distanceFromBusStop: 0.3,
    bikeCostToSchool: 1200,
    address: 'Kigali, Kimironko',
    description: 'Affordable shared house in a vibrant neighborhood. This is a great option for budget-conscious students. Share common areas with other students and enjoy a community atmosphere.',
    amenities: ['Water', 'Electricity', 'Shared Kitchen', 'WiFi (shared)', 'Shared Living Room'],
    rating: 4.0,
    reviews: 8,
    images: ['🏘️', '🛏️', '🍳', '🪑', '🌳', '🚪'],
    landlord: {
      name: 'Robert K.',
      avatar: '👨',
      responseTime: 'Within 2 hours',
      phone: '+250 788 345 678',
      email: 'robert.k@email.com',
    },
    reviews_list: [
      {
        author: 'Peter N.',
        rating: 4,
        date: 'Nov 2023',
        text: 'Good value for money. Bus stop is very close. Roommates are friendly.',
        avatar: '👨‍🎓',
      },
    ],
    services: ['Shared WiFi', 'Water', 'Electricity', 'Shared Kitchen', 'Garden'],
    rules: ['Keep room clean', 'Contribute to cleaning shared spaces', 'Quiet hours 10 PM - 8 AM'],
    leaseTerms: '3-12 months',
    availableFrom: 'February 1, 2024',
  },
};

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [contactMessage, setContactMessage] = useState('');

  const listing = DUMMY_LISTINGS[params.id];

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <Link href="/find" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* <Link href="/" className="text-2xl font-bold text-indigo-600">
            StudentNest
          </Link> */}
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-indigo-600 hover:bg-gray-100 rounded-lg transition"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Images Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-8xl">
                {listing.image}
              </div>
              <div className="grid grid-cols-6 gap-2 p-4">
                {listing.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:opacity-75 transition"
                  >
                    {img}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-5xl font-bold text-indigo-600 mb-2">
                  {(listing.price / 1000).toFixed(0)}K
                </p>
                <p className="text-gray-600">/month RWF</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b">
                <span className="text-2xl text-yellow-400">★</span>
                <span className="text-xl font-bold text-gray-900">{listing.rating}</span>
                <span className="text-sm text-gray-600">({listing.reviews} reviews)</span>
              </div>

              {/* Key Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">📍 Distance to School</p>
                  <p className="text-lg font-semibold text-gray-900">{listing.distanceFromSchool} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">🚌 Distance to Bus Stop</p>
                  <p className="text-lg font-semibold text-gray-900">{listing.distanceFromBusStop} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">🚴 Bike Cost to School</p>
                  <p className="text-lg font-semibold text-green-600">{listing.bikeCostToSchool} RWF</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">📅 Available From</p>
                  <p className="text-lg font-semibold text-gray-900">{listing.availableFrom}</p>
                </div>
              </div>

              {/* Contact Button */}
              <button className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mb-3">
                Contact Landlord
              </button>
              <button className="w-full px-4 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
                Save Listing
              </button>
            </div>
          </div>
        </div>

        {/* Main Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
          <p className="text-gray-600 mb-4">{listing.address}</p>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="flex border-b">
            {['overview', 'amenities', 'services', 'rules', 'landlord', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold transition capitalize ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Facts</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>✓ <strong>Lease Terms:</strong> {listing.leaseTerms}</li>
                      <li>✓ <strong>Type:</strong> Fully Furnished</li>
                      <li>✓ <strong>Verified:</strong> Yes</li>
                      <li>✓ <strong>Utilities:</strong> Water & Electricity Included</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Location Highlights</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>📍 {listing.distanceFromSchool} km to campus</li>
                      <li>🚌 {listing.distanceFromBusStop} km to bus stop</li>
                      <li>🛒 Close to supermarkets & shops</li>
                      <li>🏥 Near medical facilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                      <span className="text-2xl">✓</span>
                      <span className="text-gray-900">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                      <span className="text-green-600 text-xl mt-1">✓</span>
                      <span className="text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules Tab */}
            {activeTab === 'rules' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">House Rules</h3>
                <div className="space-y-3">
                  {listing.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-indigo-600 text-lg">•</span>
                      <span className="text-gray-900">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord Tab */}
            {activeTab === 'landlord' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Meet Your Landlord</h3>
                <div className="flex items-start gap-6 p-6 bg-indigo-50 rounded-lg mb-6">
                  <div className="text-6xl">{listing.landlord.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{listing.landlord.name}</h4>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p>📞 <strong>Phone:</strong> {listing.landlord.phone}</p>
                      <p>✉️ <strong>Email:</strong> {listing.landlord.email}</p>
                      <p>⏱️ <strong>Response Time:</strong> {listing.landlord.responseTime}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  Send Message to Landlord
                </button>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Reviews</h3>
                <div className="space-y-6">
                  {listing.reviews_list.map((review, idx) => (
                    <div key={idx} className="pb-6 border-b last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{review.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.author}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{review.rating}/5</span>
                          </div>
                          <p className="text-gray-700">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
