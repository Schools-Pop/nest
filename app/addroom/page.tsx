'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { createRoom } from '@/lib/supabase/mutations';

type GenderPreference = 'male' | 'female' | 'any' | '';

interface FormData {
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Room Details
  roomTitle: string;
  roomDescription: string;
  location: string;
  rentAmount: number;
  bikeCostToSchool: number;
  genderRequired: GenderPreference;
  amenities: string[];
}

const amenityOptions = [
  'WiFi',
  'Furnished',
  'Kitchen',
  'Water',
  'Electricity',
  'AC',
  'Balcony',
  'Parking',
  'Laundry',
  'Shared spaces',
  'Study desk',
  'Private Bathroom',
];

export default function AddRoomPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomTitle: '',
    roomDescription: '',
    location: '',
    rentAmount: 100000,
    bikeCostToSchool: 500,
    genderRequired: '',
    amenities: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('Please fill in all personal details');
      }
      if (!formData.roomTitle || !formData.roomDescription || !formData.location) {
        throw new Error('Please fill in all room details');
      }
      if (!formData.genderRequired || formData.amenities.length === 0) {
        throw new Error('Please select gender preference and at least one amenity');
      }

      // Prepare data for Supabase
      const roomData = {
        owner_first_name: formData.firstName,
        owner_last_name: formData.lastName,
        owner_email: formData.email,
        owner_phone: formData.phone,
        title: formData.roomTitle,
        description: formData.roomDescription,
        location: formData.location,
        price: formData.rentAmount,
        bike_cost_to_school: formData.bikeCostToSchool,
        gender_required: formData.genderRequired,
        amenities: formData.amenities,
        rating: 0,
        reviews: 0,
      };

      // Call Supabase mutation
      const response = await createRoom(roomData);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create room listing');
      }

      // Success - redirect to roommates page
      router.push('/roommates?success=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const isStep1Complete =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone;

  const isStep2Complete =
    formData.roomTitle &&
    formData.roomDescription &&
    formData.location &&
    formData.rentAmount &&
    formData.bikeCostToSchool &&
    formData.genderRequired &&
    formData.amenities.length > 0;

  const canProceed =
    currentStep === 1 ? isStep1Complete : isStep2Complete;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <div className="bg-white shadow-sm border-b py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/roommates" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-2 inline-block">
            ← Back to Rooms
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">List Your Room</h1>
          <p className="text-sm sm:text-base text-gray-600">Share your room and connect with students looking for accommodation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                      step <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`w-12 h-1 mx-2 transition ${
                        step < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span>Your Details</span>
              <span>Room Details</span>
            </div>
          </div>

          {/* Step 1: Your Details */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g., Jean"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g., Claude"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+250 788 123 456"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Room Details */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Details</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Room Title *
                </label>
                <input
                  type="text"
                  name="roomTitle"
                  value={formData.roomTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Spacious Single Room Near Campus"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Room Description *
                </label>
                <textarea
                  name="roomDescription"
                  value={formData.roomDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your room in detail - size, condition, features, etc."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Gisozi, Kigali"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Monthly Rent (RWF) *
                  </label>
                  <input
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleInputChange}
                    min="10000"
                    max="1000000"
                    step="10000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Bike Cost to School (RWF) *
                  </label>
                  <input
                    type="number"
                    name="bikeCostToSchool"
                    value={formData.bikeCostToSchool}
                    onChange={handleInputChange}
                    min="100"
                    max="10000"
                    step="100"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Gender Preference *
                </label>
                <select
                  name="genderRequired"
                  value={formData.genderRequired}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                >
                  <option value="">Select gender preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Amenities Included *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenityOptions.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                        formData.amenities.includes(amenity)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              ← Back
            </button>

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !canProceed}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Publishing...' : 'Publish Room'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
