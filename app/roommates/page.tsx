'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Room {
  id: string;
  title: string;
  description: string;
  type: 'single' | 'shared' | 'apartment';
  price: number;
  amenities: string[];
}

interface HouseOwnerProfile {
  id: string;
  name: string;
  age: number;
  university: string;
  image: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  availableRooms: Room[];
}

const HOUSE_OWNERS: HouseOwnerProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 26,
    university: 'Carnegie Mellon University Africa',
    image: '👩‍🏫',
    description: 'Friendly house owner, well-maintained property in prime location.',
    location: 'Gisozi, Kigali',
    phone: '+250 788 123 456',
    email: 'sarah.johnson@cmu.edu',
    rating: 4.8,
    reviews: 12,
    availableRooms: [
      {
        id: 'r1',
        title: 'Spacious Single Room',
        description: 'Bright and airy room with large window, perfect for students',
        type: 'single',
        price: 150000,
        amenities: ['WiFi', 'Furnished', 'Kitchen Access', 'Water', 'Electricity'],
      },
      {
        id: 'r2',
        title: 'Cozy Shared Room',
        description: 'Share with one other student, great for social people',
        type: 'shared',
        price: 100000,
        amenities: ['WiFi', 'Furnished', 'Kitchen Access', 'Water'],
      },
    ],
  },
  {
    id: '2',
    name: 'James Mutua',
    age: 28,
    university: 'Carnegie Mellon University Africa',
    image: '👨‍💼',
    description: 'Professional landlord, quiet neighborhood, secure compound.',
    location: 'Nyamirambo, Kigali',
    phone: '+250 788 234 567',
    email: 'james.mutua@alu.edu',
    rating: 4.9,
    reviews: 18,
    availableRooms: [
      {
        id: 'r3',
        title: 'Premium Single Room with AC',
        description: 'Air-conditioned room with en-suite bathroom, top floor',
        type: 'single',
        price: 180000,
        amenities: ['WiFi', 'AC', 'En-suite', 'Parking', 'Water', 'Electricity'],
      },
    ],
  },
  {
    id: '3',
    name: 'Amina Hassan',
    age: 30,
    university: 'Carnegie Mellon University Africa',
    image: '👩‍🏠',
    description: 'Experienced property manager, student-friendly environment.',
    location: 'Remera, Kigali',
    phone: '+250 788 345 678',
    email: 'amina.hassan@ur.edu',
    rating: 4.7,
    reviews: 15,
    availableRooms: [
      {
        id: 'r4',
        title: 'Modern Apartment',
        description: 'Full apartment with living area, bedroom, and kitchen',
        type: 'apartment',
        price: 250000,
        amenities: ['WiFi', 'Furnished', 'Full Kitchen', 'AC', 'Parking', 'Balcony'],
      },
      {
        id: 'r5',
        title: 'Shared Room with Balcony',
        description: 'Share with one roommate, room has access to balcony',
        type: 'shared',
        price: 120000,
        amenities: ['WiFi', 'Furnished', 'Kitchen Access', 'Water', 'Balcony Access'],
      },
    ],
  },
  {
    id: '4',
    name: 'David Okonkwo',
    age: 32,
    university: 'Carnegie Mellon University Africa',
    image: '👨‍🏢',
    description: 'Property investor with multiple student accommodations.',
    location: 'Kacyiru, Kigali',
    phone: '+250 788 456 789',
    email: 'david.okonkwo@cmu.edu',
    rating: 4.6,
    reviews: 22,
    availableRooms: [
      {
        id: 'r6',
        title: 'Single Room with Workspace',
        description: 'Quiet room with desk setup, perfect for students',
        type: 'single',
        price: 140000,
        amenities: ['WiFi', 'Furnished', 'Desk', 'Water', 'Electricity', 'Parking'],
      },
    ],
  },
  {
    id: '5',
    name: 'Grace Kipchoge',
    age: 27,
    university: 'Carnegie Mellon University Africa',
    image: '👩‍🏘️',
    description: 'Eco-conscious landlord, sustainable living focused.',
    location: 'Muhima, Kigali',
    phone: '+250 788 567 890',
    email: 'grace.kipchoge@alu.edu',
    rating: 4.9,
    reviews: 10,
    availableRooms: [
      {
        id: 'r7',
        title: 'Eco-Friendly Shared Room',
        description: 'Sustainable living space with natural lighting',
        type: 'shared',
        price: 95000,
        amenities: ['WiFi', 'Water', 'Electricity', 'Shared Spaces', 'Garden Access'],
      },
    ],
  },
];

export default function RoommatesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState(300000);

  const locations = ['all', 'Gisozi, Kigali', 'Nyamirambo, Kigali', 'Remera, Kigali', 'Kacyiru, Kigali', 'Muhima, Kigali'];

  const roomTypes = ['all', 'single', 'shared', 'apartment'];

  const filteredOwners = useMemo(() => {
    return HOUSE_OWNERS.filter((owner) => {
      const matchSearch =
        owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLocation =
        selectedLocation === 'all' || owner.location === selectedLocation;

      const matchRoomType =
        selectedRoomType === 'all' || owner.availableRooms.some(room => room.type === selectedRoomType);

      const matchPrice = owner.availableRooms.some(room => room.price <= maxPrice);

      return matchSearch && matchLocation && matchRoomType && matchPrice;
    });
  }, [searchTerm, selectedLocation, selectedRoomType, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto  bg-white shadow-sm border-b py-4 px-6">
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
                Search by Owner Name or Location
              </label>
              <input
                type="text"
                placeholder="e.g., Sarah, Gisozi..."
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

              {/* Room Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Room Type
                </label>
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  {roomTypes.map((type) => (
                    <option key={type} value={type} className="text-gray-900">
                      {type === 'all' ? 'All Room Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
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

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {filteredOwners.length} House Owner{filteredOwners.length !== 1 ? 's' : ''} with Available Rooms
          </h2>
        </div>

        {/* House Owners with Rooms */}
        {filteredOwners.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Rooms Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more available rooms</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedRoomType('all');
                setMaxPrice(300000);
              }}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOwners.map((owner) => (
              <div key={owner.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Owner Header */}
                <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{owner.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{owner.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{owner.age} years old • {owner.university}</p>
                      <p className="text-gray-700 mb-2">{owner.description}</p>
                      <p className="text-sm text-gray-600">📍 {owner.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-900">{owner.rating}</span>
                      <span className="text-sm text-gray-600">({owner.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Available Rooms */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Available Rooms</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {owner.availableRooms
                      .filter(room => (selectedRoomType === 'all' || room.type === selectedRoomType) && room.price <= maxPrice)
                      .map((room) => (
                        <div key={room.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-400 transition">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-lg font-semibold text-gray-900">{room.title}</h5>
                            <span className="text-xl font-bold text-indigo-600">{(room.price / 1000).toFixed(0)}K RWF</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities.map((amenity, idx) => (
                              <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <span className="inline-block text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize">
                              {room.type} Room
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-6 bg-gray-50 border-t flex gap-3">
                  <a
                    href={`tel:${owner.phone}`}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                  >
                    📞 Call: {owner.phone}
                  </a>
                  <a
                    href={`mailto:${owner.email}`}
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
