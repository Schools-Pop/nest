'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
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

export default function RoommatesPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState(300000);

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

  // Get unique locations from listings
  const locations = useMemo(() => {
    const locs = new Set(['all']);
    listings.forEach(listing => locs.add(listing.location));
    return Array.from(locs);
  }, [listings]);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchSearch =
        listing.owner_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.owner_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLocation =
        selectedLocation === 'all' || listing.location === selectedLocation;

      const matchGender =
        selectedGender === 'all' || listing.gender_required === selectedGender;

      const matchPrice = parseInt(listing.rent) <= maxPrice;

      return matchSearch && matchLocation && matchGender && matchPrice;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [listings, searchTerm, selectedLocation, selectedGender, maxPrice]);

  const parseAmenities = (amenitiesStr: string) => {
    return amenitiesStr?.split(',').map(a => a.trim()).filter(a => a) || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find a Room</h1>
            <p className="text-sm sm:text-base text-gray-600">Browse available rooms from house owners</p>
          </div>
          <Link
            href="/addroommate"
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
          >
            + List Your Room
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Search by Owner Name, Title, or Location
              </label>
              <input
                type="text"
                placeholder="e.g., Sarah, Single Room, Gisozi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="text-gray-900">
                      {loc === 'all' ? 'All Locations' : loc}
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
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="all">All Preferences</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Price: {maxPrice.toLocaleString()} RWF
                </label>
                <input
                  type="range"
                  min="50000"
                  max="300000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

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

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              {filteredListings.length} Room{filteredListings.length !== 1 ? 's' : ''} Available
            </h2>
          </div>
        )}

        {/* No Listings Found */}
        {!loading && filteredListings.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Rooms Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more available rooms</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedGender('all');
                setMaxPrice(300000);
              }}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Listings */}
        {!loading && filteredListings.length > 0 && (
          <div className="space-y-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Owner Header */}
                <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">👤</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {listing.owner_first_name} {listing.owner_last_name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Room Owner</p>
                      <p className="text-gray-700">{listing.description}</p>
                      <p className="text-sm text-gray-600 mt-2">📍 {listing.location}</p>
                    </div>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-1">{listing.title}</h4>
                        <p className="text-sm text-gray-600">{listing.description}</p>
                      </div>
                      <span className="text-3xl font-bold text-indigo-600 whitespace-nowrap ml-4">
                        {(parseInt(listing.rent) / 1000).toFixed(0)}K RWF
                      </span>
                    </div>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold">Monthly Rent</p>
                        <p className="text-lg font-bold text-gray-900">{(parseInt(listing.rent) / 1000).toFixed(0)}K RWF</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold">Bike to School</p>
                        <p className="text-lg font-bold text-gray-900">{listing.bike_cost_to_school} RWF</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold">Gender</p>
                        <p className="text-lg font-bold text-gray-900 capitalize">{listing.gender_required}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 font-semibold">Listed</p>
                        <p className="text-lg font-bold text-gray-900">
                          {new Date(listing.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Amenities Included:</p>
                      <div className="flex flex-wrap gap-2">
                        {parseAmenities(listing.amenities).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-6 bg-gray-50 border-t flex gap-3">
                  <a
                    href={`tel:${listing.owner_phone}`}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                  >
                    📞 Call: {listing.owner_phone}
                  </a>
                  <a
                    href={`mailto:${listing.owner_email}`}
                    className="flex-1 px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition text-center text-sm"
                  >
                    ✉️ Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
