'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  university: string;
  major: string;
  image: string;
  description: string;
  budget: number;
  location: string;
  moveInDate: string;
  duration: string;
  roomType: 'single' | 'shared' | 'apartment';
  amenitiesLooking: string[];
  aboutRoommate: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
}

const ROOMMATE_PROFILES: RoommateProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 20,
    university: 'Carnegie Mellon University Africa',
    major: 'Computer Science',
    image: '👩‍🎓',
    description: 'Friendly and outgoing, loves exploring Kigali and trying new restaurants.',
    budget: 150000,
    location: 'Gisozi, Kigali',
    moveInDate: '2024-02-01',
    duration: '1 year',
    roomType: 'shared',
    amenitiesLooking: ['WiFi', 'Furnished', 'Kitchen', 'Water'],
    aboutRoommate: 'Looking for a calm and respectful roommate who enjoys occasional hangouts',
    phone: '+250 788 123 456',
    email: 'sarah.johnson@cmu.edu',
    rating: 4.8,
    reviews: 12,
  },
  {
    id: '2',
    name: 'James Mutua',
    age: 22,
    university: 'African Leadership University',
    major: 'Business Administration',
    image: '👨‍🎓',
    description: 'Organized and studious. Prefer quiet living space for focused study time.',
    budget: 120000,
    location: 'Nyamirambo, Kigali',
    moveInDate: '2024-01-15',
    duration: '2 years',
    roomType: 'single',
    amenitiesLooking: ['WiFi', 'Electricity', 'Water', 'Parking'],
    aboutRoommate: 'Need someone quiet and respectful of study hours (9 PM - 8 AM)',
    phone: '+250 788 234 567',
    email: 'james.mutua@alu.edu',
    rating: 4.9,
    reviews: 8,
  },
  {
    id: '3',
    name: 'Amina Hassan',
    age: 21,
    university: 'University of Rwanda',
    major: 'Engineering',
    image: '👩‍🎓',
    description: 'Social butterfly who loves sports and outdoor activities.',
    budget: 130000,
    location: 'Remera, Kigali',
    moveInDate: '2024-02-15',
    duration: '1.5 years',
    roomType: 'shared',
    amenitiesLooking: ['WiFi', 'Kitchen', 'Water', 'AC'],
    aboutRoommate: 'Looking for an active roommate who enjoys gym and weekend activities',
    phone: '+250 788 345 678',
    email: 'amina.hassan@ur.edu',
    rating: 4.7,
    reviews: 15,
  },
  {
    id: '4',
    name: 'David Okonkwo',
    age: 23,
    university: 'Carnegie Mellon University Africa',
    major: 'Data Science',
    image: '👨‍🎓',
    description: 'Tech enthusiast, gamer, and foodie. Very laid back and easy-going.',
    budget: 180000,
    location: 'Kacyiru, Kigali',
    moveInDate: '2024-03-01',
    duration: '1 year',
    roomType: 'apartment',
    amenitiesLooking: ['WiFi', 'Furnished', 'Kitchen', 'Electricity', 'Gaming setup'],
    aboutRoommate: 'Looking for someone who enjoys gaming, tech, and good food',
    phone: '+250 788 456 789',
    email: 'david.okonkwo@cmu.edu',
    rating: 4.6,
    reviews: 10,
  },
  {
    id: '5',
    name: 'Grace Kipchoge',
    age: 19,
    university: 'African Leadership University',
    major: 'Environmental Science',
    image: '👩‍🎓',
    description: 'Eco-conscious and community-oriented. Love group study sessions.',
    budget: 100000,
    location: 'Muhima, Kigali',
    moveInDate: '2024-02-01',
    duration: '1 year',
    roomType: 'shared',
    amenitiesLooking: ['WiFi', 'Water', 'Electricity', 'Shared spaces'],
    aboutRoommate: 'Seeking sustainable living partner interested in eco-friendly practices',
    phone: '+250 788 567 890',
    email: 'grace.kipchoge@alu.edu',
    rating: 4.9,
    reviews: 7,
  },
  {
    id: '6',
    name: 'Michael Chen',
    age: 21,
    university: 'University of Rwanda',
    major: 'International Relations',
    image: '👨‍🎓',
    description: 'Multilingual and culturally curious. Enjoys cultural exchanges.',
    budget: 160000,
    location: 'Kimironko, Kigali',
    moveInDate: '2024-03-15',
    duration: '2 years',
    roomType: 'shared',
    amenitiesLooking: ['WiFi', 'Furnished', 'Kitchen', 'Water', 'Balcony'],
    aboutRoommate: 'Looking for someone interested in cultural exchange and language practice',
    phone: '+250 788 678 901',
    email: 'michael.chen@ur.edu',
    rating: 4.8,
    reviews: 9,
  },
];

export default function RoommatesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('all');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState(200000);

  const universities = [
    'all',
    'Carnegie Mellon University Africa',
    'African Leadership University',
    'University of Rwanda',
  ];

  const roomTypes = ['all', 'single', 'shared', 'apartment'];

  const filteredProfiles = useMemo(() => {
    return ROOMMATE_PROFILES.filter((profile) => {
      const matchSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.major.toLowerCase().includes(searchTerm.toLowerCase());

      const matchUniversity =
        selectedUniversity === 'all' || profile.university === selectedUniversity;

      const matchRoomType =
        selectedRoomType === 'all' || profile.roomType === selectedRoomType;

      const matchBudget = profile.budget <= maxBudget;

      return matchSearch && matchUniversity && matchRoomType && matchBudget;
    });
  }, [searchTerm, selectedUniversity, selectedRoomType, maxBudget]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Your Roommate</h1>
            <p className="text-sm sm:text-base text-gray-600">Connect with students looking for roommates</p>
          </div>
          <Link
            href="/addroommate"
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
          >
            + Post Your Profile
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
                Search by Name, Location, or Major
              </label>
              <input
                type="text"
                placeholder="e.g., Sarah, Gisozi, Computer Science..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* University Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  University
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  {universities.map((uni) => (
                    <option key={uni} value={uni} className="text-gray-900">
                      {uni === 'all' ? 'All Universities' : uni}
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

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Budget: {maxBudget.toLocaleString()} RWF
                </label>
                <input
                  type="range"
                  min="50000"
                  max="200000"
                  step="10000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {filteredProfiles.length} Roommate{filteredProfiles.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Roommate Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Profiles Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more profiles</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedUniversity('all');
                setSelectedRoomType('all');
                setMaxBudget(200000);
              }}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-6 pb-4 border-b flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-4xl">{profile.image}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{profile.name}</h3>
                        <p className="text-sm text-gray-600">{profile.age} years old</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold text-gray-900">{profile.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3 flex-1">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">UNIVERSITY</p>
                    <p className="text-sm text-gray-900">{profile.university}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold">MAJOR</p>
                    <p className="text-sm text-gray-900">{profile.major}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold">DESCRIPTION</p>
                    <p className="text-sm text-gray-700">{profile.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">BUDGET</p>
                      <p className="text-sm font-semibold text-indigo-600">
                        {(profile.budget / 1000).toFixed(0)}K RWF
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">ROOM TYPE</p>
                      <p className="text-sm font-semibold text-gray-900 capitalize">
                        {profile.roomType}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold">LOCATION</p>
                    <p className="text-sm text-gray-900">📍 {profile.location}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold">MOVE-IN DATE</p>
                    <p className="text-sm text-gray-900">
                      {new Date(profile.moveInDate).toLocaleDateString('default', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">AMENITIES LOOKING FOR</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.amenitiesLooking.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-semibold">ABOUT ROOMMATE</p>
                    <p className="text-sm text-gray-700 italic">{profile.aboutRoommate}</p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-6 pt-4 border-t bg-gray-50 space-y-2">
                  <a
                    href={`tel:${profile.phone}`}
                    className="block w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                  >
                    📞 Call: {profile.phone}
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="block w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition text-center text-sm"
                  >
                    ✉️ Email: {profile.email}
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
