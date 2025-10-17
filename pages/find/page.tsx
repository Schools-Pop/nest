'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Listing {
  id: string;
  name: string;
  price: number;
  image: string;
  distanceFromSchool: number; // in km
  distanceFromBusStop: number; // in km
  bikeCostToSchool: number; // in RWF
  address: string;
  amenities: string[];
  rating: number;
  reviews: number;
}

interface School {
  id: string;
  name: string;
  location: string;
}

const SCHOOLS: School[] = [
  { id: '1', name: 'University of Rwanda', location: 'Kigali' },
  { id: '2', name: 'Rwanda Coding Academy', location: 'Kigali' },
  { id: '3', name: 'African Leadership University', location: 'Kigali' },
  { id: '4', name: 'National University of Rwanda', location: 'Huye' },
];

const DUMMY_LISTINGS: Listing[] = [
  {
    id: '1',
    name: 'Cozy Studio Near Campus',
    price: 150000,
    image: '🏠',
    distanceFromSchool: 0.5,
    distanceFromBusStop: 0.2,
    bikeCostToSchool: 500,
    address: 'Kigali, Nyamirambo',
    amenities: ['WiFi', 'Water', 'Electricity', 'Furnished'],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: '2',
    name: 'Modern 1-Bedroom Apartment',
    price: 250000,
    image: '🏢',
    distanceFromSchool: 1.2,
    distanceFromBusStop: 0.8,
    bikeCostToSchool: 800,
    address: 'Kigali, Gisozi',
    amenities: ['WiFi', 'Water', 'Kitchen', 'Balcony'],
    rating: 4.8,
    reviews: 24,
  },
  {
    id: '3',
    name: 'Budget-Friendly Room',
    price: 100000,
    image: '🏘️',
    distanceFromSchool: 2.1,
    distanceFromBusStop: 0.3,
    bikeCostToSchool: 1200,
    address: 'Kigali, Kimironko',
    amenities: ['Water', 'Electricity', 'Shared Kitchen'],
    rating: 4.0,
    reviews: 8,
  },
  {
    id: '4',
    name: 'Spacious 2-Bedroom Flat',
    price: 350000,
    image: '🏠',
    distanceFromSchool: 0.8,
    distanceFromBusStop: 1.1,
    bikeCostToSchool: 600,
    address: 'Kigali, Remera',
    amenities: ['WiFi', 'Water', 'Full Kitchen', 'Parking'],
    rating: 4.9,
    reviews: 31,
  },
  {
    id: '5',
    name: 'Comfortable Shared House',
    price: 180000,
    image: '🏘️',
    distanceFromSchool: 1.5,
    distanceFromBusStop: 0.5,
    bikeCostToSchool: 900,
    address: 'Kigali, Muhima',
    amenities: ['WiFi', 'Water', 'Shared Spaces', 'Garden'],
    rating: 4.3,
    reviews: 15,
  },
  {
    id: '6',
    name: 'Luxury Studio with View',
    price: 280000,
    image: '🏢',
    distanceFromSchool: 1.1,
    distanceFromBusStop: 0.9,
    bikeCostToSchool: 700,
    address: 'Kigali, Kacyiru',
    amenities: ['WiFi', 'Water', 'AC', 'Furnished', 'Balcony'],
    rating: 4.7,
    reviews: 19,
  },
];

export default function FindPage() {
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<number>(500000);
  const [maxDistanceFromSchool, setMaxDistanceFromSchool] = useState<number>(5);
  const [maxDistanceFromBusStop, setMaxDistanceFromBusStop] = useState<number>(2);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredListings = useMemo(() => {
    if (!selectedSchool) return [];

    return DUMMY_LISTINGS
      .filter(
        (listing) =>
          listing.price <= maxBudget &&
          listing.distanceFromSchool <= maxDistanceFromSchool &&
          listing.distanceFromBusStop <= maxDistanceFromBusStop
      )
      .sort((a, b) => a.distanceFromSchool - b.distanceFromSchool);
  }, [selectedSchool, maxBudget, maxDistanceFromSchool, maxDistanceFromBusStop]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            StudentNest
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {sidebarOpen ? '✕ Close' : '☰ Filters'}
          </button>
        </div>
      </nav>

      {/* School Selection Banner */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your School</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {SCHOOLS.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  selectedSchool === school.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-indigo-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900">{school.name}</h3>
                <p className="text-sm text-gray-500">{school.location}</p>
              </button>
            ))}
          </div>
          {selectedSchool && (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✓ Showing listings near {SCHOOLS.find((s) => s.id === selectedSchool)?.name}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

              {/* Budget Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Budget: {maxBudget.toLocaleString()} RWF
                </label>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50K</span>
                  <span>500K</span>
                </div>
              </div>

              {/* Distance from School Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Distance from School: {maxDistanceFromSchool.toFixed(1)} km
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={maxDistanceFromSchool}
                  onChange={(e) => setMaxDistanceFromSchool(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5 km</span>
                  <span>10 km</span>
                </div>
              </div>

              {/* Distance from Bus Stop Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Distance from Bus Stop: {maxDistanceFromBusStop.toFixed(1)} km
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={maxDistanceFromBusStop}
                  onChange={(e) => setMaxDistanceFromBusStop(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.1 km</span>
                  <span>5 km</span>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setMaxBudget(500000);
                  setMaxDistanceFromSchool(5);
                  setMaxDistanceFromBusStop(2);
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {!selectedSchool ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🏫</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a School</h3>
                <p className="text-gray-600">
                  Choose your school above to see available housing options nearby.
                </p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Listings Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more options.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {filteredListings.length} Listings Found
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sorted by distance from school
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
                    >
                      {/* Image */}
                      <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-5xl">
                        {listing.image}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {listing.name}
                          </h4>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-indigo-600">
                              {(listing.price / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-gray-500">/month</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{listing.address}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold text-gray-900">
                            {listing.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({listing.reviews} reviews)
                          </span>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-3 mb-4 bg-gray-50 p-4 rounded-lg">
                          <div className="text-center">
                            <div className="text-xs text-gray-600 mb-1">
                              📍 School
                            </div>
                            <p className="font-bold text-gray-900">
                              {listing.distanceFromSchool.toFixed(1)} km
                            </p>
                          </div>
                          <div className="text-center border-l border-r border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">
                              🚌 Bus Stop
                            </div>
                            <p className="font-bold text-gray-900">
                              {listing.distanceFromBusStop.toFixed(1)} km
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-600 mb-1">
                              🚴 Bike Cost
                            </div>
                            <p className="font-bold text-green-600">
                              {listing.bikeCostToSchool} RWF
                            </p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {listing.amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                          View Details
                        </button>
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
