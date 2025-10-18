'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Filters from '@/components/Filters';

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
}

interface School {
  id: string;
  name: string;
  location: string;
}

const SCHOOLS: School[] = [
  { id: '1', name: 'Carnegie Mellon University Africa', location: 'Kigali' },
  { id: '2', name: 'African Leadership University', location: 'Kigali' },
  { id: '3', name: 'University of Rwanda', location: 'Kigali' },
  { id: '4', name: 'National University of Rwanda', location: 'Huye' },
];

const DUMMY_LISTINGS: Listing[] = [
  // Budget & Close to School
  { id: '1', name: 'Cozy Studio Near Campus', price: 100000, image: '🏠', distanceFromSchool: 0.3, distanceFromBusStop: 0.2, bikeCostToSchool: 400, address: 'Kigali, Nyamirambo', amenities: ['WiFi', 'Water', 'Electricity'], rating: 4.5, reviews: 12 },
  { id: '2', name: 'Compact Room - Ultra Close', price: 95000, image: '🏘️', distanceFromSchool: 0.4, distanceFromBusStop: 0.3, bikeCostToSchool: 450, address: 'Kigali, Nyamirambo', amenities: ['Water', 'Electricity'], rating: 4.2, reviews: 8 },
  { id: '3', name: 'Budget Studio with Basics', price: 85000, image: '🏠', distanceFromSchool: 0.6, distanceFromBusStop: 0.5, bikeCostToSchool: 500, address: 'Kigali, Nyamirambo', amenities: ['Water', 'Electricity', 'Furnished'], rating: 4.0, reviews: 6 },
  
  // Mid-Range & Close to School
  { id: '4', name: 'Modern 1-Bedroom Apartment', price: 200000, image: '🏢', distanceFromSchool: 0.8, distanceFromBusStop: 0.7, bikeCostToSchool: 600, address: 'Kigali, Gisozi', amenities: ['WiFi', 'Water', 'Kitchen', 'Balcony'], rating: 4.8, reviews: 24 },
  { id: '5', name: 'Comfortable Shared House', price: 150000, image: '🏘️', distanceFromSchool: 1.0, distanceFromBusStop: 0.6, bikeCostToSchool: 550, address: 'Kigali, Remera', amenities: ['WiFi', 'Water', 'Shared Kitchen'], rating: 4.3, reviews: 15 },
  { id: '6', name: 'Spacious 1-Bed with WiFi', price: 180000, image: '🏠', distanceFromSchool: 1.2, distanceFromBusStop: 0.8, bikeCostToSchool: 700, address: 'Kigali, Muhima', amenities: ['WiFi', 'Water', 'Full Kitchen'], rating: 4.4, reviews: 18 },
  
  // Premium & Close to School
  { id: '7', name: 'Luxury Studio with View', price: 280000, image: '🏢', distanceFromSchool: 1.1, distanceFromBusStop: 0.9, bikeCostToSchool: 700, address: 'Kigali, Kacyiru', amenities: ['WiFi', 'Water', 'AC', 'Furnished', 'Balcony'], rating: 4.7, reviews: 19 },
  { id: '8', name: 'Spacious 2-Bedroom Flat', price: 350000, image: '🏠', distanceFromSchool: 0.8, distanceFromBusStop: 1.1, bikeCostToSchool: 600, address: 'Kigali, Remera', amenities: ['WiFi', 'Water', 'Full Kitchen', 'Parking'], rating: 4.9, reviews: 31 },
  { id: '9', name: 'Premium 2-Bed Apartment', price: 320000, image: '🏢', distanceFromSchool: 1.5, distanceFromBusStop: 1.0, bikeCostToSchool: 800, address: 'Kigali, Kimironko', amenities: ['WiFi', 'Water', 'AC', 'Full Kitchen', 'Parking', 'Garden'], rating: 4.8, reviews: 28 },

  // Budget & Medium Distance
  { id: '10', name: 'Budget-Friendly Room', price: 100000, image: '🏘️', distanceFromSchool: 2.1, distanceFromBusStop: 0.3, bikeCostToSchool: 1200, address: 'Kigali, Kimironko', amenities: ['Water', 'Electricity', 'Shared Kitchen'], rating: 4.0, reviews: 8 },
  { id: '11', name: 'Affordable Student House', price: 110000, image: '🏠', distanceFromSchool: 2.5, distanceFromBusStop: 0.4, bikeCostToSchool: 1400, address: 'Kigali, Bugesera', amenities: ['Water', 'Electricity', 'Shared Spaces'], rating: 3.9, reviews: 7 },
  { id: '12', name: 'Economy Studio', price: 95000, image: '🏘️', distanceFromSchool: 2.8, distanceFromBusStop: 0.5, bikeCostToSchool: 1600, address: 'Kigali, Kabeza', amenities: ['Water', 'Electricity'], rating: 3.8, reviews: 5 },

  // Mid-Range & Medium Distance
  { id: '13', name: 'Nice 1-Bed in Gisozi', price: 160000, image: '🏢', distanceFromSchool: 2.0, distanceFromBusStop: 0.6, bikeCostToSchool: 900, address: 'Kigali, Gisozi', amenities: ['WiFi', 'Water', 'Kitchen'], rating: 4.3, reviews: 14 },
  { id: '14', name: 'Cozy 1-Bedroom', price: 140000, image: '🏠', distanceFromSchool: 2.3, distanceFromBusStop: 0.7, bikeCostToSchool: 1000, address: 'Kigali, Rebero', amenities: ['WiFi', 'Water', 'Furnished'], rating: 4.1, reviews: 11 },
  { id: '15', name: 'Comfortable Studio', price: 130000, image: '🏘️', distanceFromSchool: 2.2, distanceFromBusStop: 0.8, bikeCostToSchool: 1050, address: 'Kigali, Kiyovu', amenities: ['WiFi', 'Water', 'AC'], rating: 4.2, reviews: 12 },

  // Premium & Medium Distance
  { id: '16', name: 'Executive Apartment', price: 300000, image: '🏢', distanceFromSchool: 2.4, distanceFromBusStop: 0.9, bikeCostToSchool: 1200, address: 'Kigali, Kacyiru', amenities: ['WiFi', 'Water', 'AC', 'Full Kitchen', 'Parking'], rating: 4.7, reviews: 22 },
  { id: '17', name: 'Upscale 2-Bed', price: 330000, image: '🏠', distanceFromSchool: 2.6, distanceFromBusStop: 1.0, bikeCostToSchool: 1300, address: 'Kigali, Muhima', amenities: ['WiFi', 'Water', 'AC', 'Full Kitchen', 'Parking', 'Garden'], rating: 4.8, reviews: 26 },
  { id: '18', name: 'Luxury 1-Bed Suite', price: 270000, image: '🏢', distanceFromSchool: 2.1, distanceFromBusStop: 0.7, bikeCostToSchool: 950, address: 'Kigali, Remera', amenities: ['WiFi', 'Water', 'AC', 'Furnished', 'Balcony', 'Parking'], rating: 4.6, reviews: 20 },

  // Budget & Far Distance
  { id: '19', name: 'Very Affordable Room', price: 70000, image: '🏘️', distanceFromSchool: 5.0, distanceFromBusStop: 0.2, bikeCostToSchool: 2000, address: 'Kigali, Bugesera', amenities: ['Water', 'Electricity'], rating: 3.7, reviews: 4 },
  { id: '20', name: 'Budget Shared Space', price: 80000, image: '🏠', distanceFromSchool: 4.5, distanceFromBusStop: 0.3, bikeCostToSchool: 1800, address: 'Kigali, Kabeza', amenities: ['Water', 'Shared Kitchen'], rating: 3.8, reviews: 6 },
  { id: '21', name: 'Economy Housing', price: 90000, image: '🏘️', distanceFromSchool: 5.5, distanceFromBusStop: 0.4, bikeCostToSchool: 2200, address: 'Kigali, Rebero', amenities: ['Water'], rating: 3.6, reviews: 3 },

  // Mid-Range & Far Distance
  { id: '22', name: 'Distant 1-Bed Option', price: 120000, image: '🏢', distanceFromSchool: 4.8, distanceFromBusStop: 0.5, bikeCostToSchool: 1700, address: 'Kigali, Kiyovu', amenities: ['WiFi', 'Water', 'Kitchen'], rating: 4.0, reviews: 9 },
];

export default function FindPage() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<string>('1');
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

  const calculateWalkingTime = (distanceKm: number): string => {
    const walkingSpeedKmPerHour = 5;
    const timeHours = distanceKm / walkingSpeedKmPerHour;
    const timeMinutes = Math.round(timeHours * 60);
    
    if (timeMinutes < 1) return '< 1 min';
    if (timeMinutes < 60) return `${timeMinutes} min`;
    
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleViewDetails = (listingId: string) => {
    router.push(`/find/${listingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      {/* School Selection Filter */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Select Your School
          </label>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 mb-4 text-gray-900"
          >
            {SCHOOLS.map((school) => (
              <option key={school.id} value={school.id} className="text-gray-900">
                {school.name} ({school.location})
              </option>
            ))}
          </select>
          {selectedSchool && (
            <p className="text-sm text-green-600 font-medium">
              ✓ Showing listings near {SCHOOLS.find((s) => s.id === selectedSchool)?.name}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* People Looking for Roommates Section */}
        {selectedSchool && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      🤝 Looking for Roommates?
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Connect with students searching for roommates to share housing costs and build community. Browse profiles and find your perfect roommate match!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/roommates"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center"
                      >
                        See Roommate Profiles →
                      </Link>
                      <Link
                        href="/addroommate"
                        className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition text-center"
                      >
                        Post Your Profile
                      </Link>
                    </div>
                  </div>
                  <div className="text-6xl">👥</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <Filters
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              maxDistanceFromSchool={maxDistanceFromSchool}
              setMaxDistanceFromSchool={setMaxDistanceFromSchool}
              maxDistanceFromBusStop={maxDistanceFromBusStop}
              setMaxDistanceFromBusStop={setMaxDistanceFromBusStop}
              onReset={() => {
                setMaxBudget(500000);
                setMaxDistanceFromSchool(5);
                setMaxDistanceFromBusStop(2);
              }}
            />
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {!selectedSchool ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🏫</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a School</h3>
                <p className="text-gray-600">
                  Choose your school from the dropdown above to see available housing options nearby.
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
                            <p className="text-xs text-gray-600 mt-1">
                              ({calculateWalkingTime(listing.distanceFromSchool)} walk)
                            </p>
                          </div>
                          <div className="text-center border-l border-r border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">
                              🚌 Bus Stop
                            </div>
                            <p className="font-bold text-gray-900">
                              {listing.distanceFromBusStop.toFixed(1)} km
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              ({calculateWalkingTime(listing.distanceFromBusStop)} walk)
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
                        <button
                          onClick={() => handleViewDetails(listing.id)}
                          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                        >
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
