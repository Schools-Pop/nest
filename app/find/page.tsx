'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import { getListings } from '@/lib/supabase/queries';

interface Listing {
  id: string;
  owner_first_name: string;
  owner_last_name: string;
  owner_email: string;
  owner_phone: string;
  title: string;
  description: string;
  location: string;
  rent: string;
  bike_cost_to_school: string;
  gender_required: string;
  amenities: string;
  created_at: string;
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

export default function FindPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('1');
  const [maxBudget, setMaxBudget] = useState<number>(500000);
  const [maxBikeCost, setMaxBikeCost] = useState<number>(2000);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch listings from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await getListings();
        if (response.success) {
          setListings(response.data || []);
        } else {
          setError(response.error || 'Failed to load listings');
        }
      } catch (err) {
        setError('Failed to load listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(['all']);
    listings.forEach(listing => locs.add(listing.location));
    return Array.from(locs);
  }, [listings]);

  const filteredListings = useMemo(() => {
    if (!selectedSchool) return [];

    return listings
      .filter(
        (listing) =>
          parseInt(listing.rent) <= maxBudget &&
          parseInt(listing.bike_cost_to_school) <= maxBikeCost &&
          (selectedGender === 'all' || listing.gender_required === selectedGender) &&
          (selectedLocation === 'all' || listing.location === selectedLocation)
      )
      .sort((a, b) => parseInt(a.bike_cost_to_school) - parseInt(b.bike_cost_to_school));
  }, [selectedSchool, maxBudget, maxBikeCost, selectedGender, selectedLocation, listings]);

  const parseAmenities = (amenitiesStr: string) => {
    return amenitiesStr?.split(',').map(a => a.trim()).filter(a => a) || [];
  };

  const handleViewDetails = (listingId: string) => {
    router.push(`/find/${listingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header with List Room Button */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-6">
        <div className=" flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Housing</h1>
          <Link
            href="/addroommate"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm whitespace-nowrap"
          >
            + List a Room
          </Link>
        </div>
      </div>

      {/* People Looking for Roommates Section */}
      {/* {selectedSchool && (
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
      )} */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* {selectedSchool && (
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
        )} */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              
              {/* Budget Filter */}
              <div>
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
              </div>

              {/* Bike Cost Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Bike Cost: {maxBikeCost.toLocaleString()} RWF
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={maxBikeCost}
                  onChange={(e) => setMaxBikeCost(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 text-sm"
                >
                  <option value="all">All Locations</option>
                  {locations.filter(loc => loc !== 'all').map((location) => (
                    <option key={location} value={location} className="text-gray-900">
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Gender Preference
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 text-sm"
                >
                  <option value="all">All Preferences</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setMaxBudget(500000);
                  setMaxBikeCost(2000);
                  setSelectedGender('all');
                  setSelectedLocation('all');
                }}
                className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-6">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-3xl mb-4">⏳</div>
                <p className="text-gray-600">Loading listings...</p>
              </div>
            )}

            {!loading && !selectedSchool ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🏫</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a School</h3>
                <p className="text-gray-600">
                  Choose your school from the dropdown above to see available housing options nearby.
                </p>
              </div>
            ) : !loading && filteredListings.length === 0 && !error ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Listings Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more options.
                </p>
                <button
                  onClick={() => {
                    setMaxBudget(500000);
                    setMaxBikeCost(2000);
                    setSelectedGender('all');
                    setSelectedLocation('all');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : !loading && filteredListings.length > 0 ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {filteredListings.length} Listings Found
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sorted by bike cost to school
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
                        🏠
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                              {listing.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              by {listing.owner_first_name} {listing.owner_last_name}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-indigo-600">
                              {(parseInt(listing.rent) / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-gray-500">/month</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
                        <p className="text-sm text-gray-600 mb-4">📍 {listing.location}</p>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
                          <div className="text-center">
                            <div className="text-xs text-gray-600 mb-1">
                              💰 Rent
                            </div>
                            <p className="font-bold text-gray-900 text-sm">
                              {(parseInt(listing.rent) / 1000).toFixed(0)}K RWF
                            </p>
                          </div>
                          <div className="text-center border-l border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">
                              🚴 Bike Cost to School
                            </div>
                            <p className="font-bold text-green-600 text-sm">
                              {listing.bike_cost_to_school} RWF
                            </p>
                          </div>
                        </div>

                        {/* Gender Preference */}
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-600 font-semibold mb-1">Gender Preference</p>
                          <p className="text-sm font-bold text-blue-900 capitalize">
                            {listing.gender_required}
                          </p>
                        </div>

                        {/* Amenities */}
                        {parseAmenities(listing.amenities).length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Amenities:</p>
                            <div className="flex flex-wrap gap-2">
                              {parseAmenities(listing.amenities).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contact */}
                        <div className="flex gap-2">
                          <a
                            href={`tel:${listing.owner_phone}`}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-xs"
                          >
                            📞 Call
                          </a>
                          <a
                            href={`mailto:${listing.owner_email}`}
                            className="flex-1 px-3 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition text-center text-xs"
                          >
                            ✉️ Email
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
