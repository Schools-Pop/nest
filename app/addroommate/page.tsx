'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

type RoomType = 'single' | 'shared' | 'apartment';

interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  university: string;
  major: string;
  description: string;
  budget: number;
  location: string;
  moveInDate: string;
  duration: string;
  roomType: RoomType | '';
  amenitiesLooking: string[];
  aboutRoommate: string;
  socialPreference: 'introverted' | 'extroverted' | 'balanced' | '';
  gender: 'male' | 'female' | 'other' | '';
  smokingPolicy: 'yes' | 'no' | 'outside' | '';
  petPolicy: 'yes' | 'no' | 'negotiable' | '';
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
  'Gaming setup',
  'Study desk',
];

const universities = [
  'Carnegie Mellon University Africa',
  'African Leadership University',
  'University of Rwanda',
  'National University of Rwanda',
];

export default function AddRoommatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: 20,
    email: '',
    phone: '',
    university: '',
    major: '',
    description: '',
    budget: 120000,
    location: '',
    moveInDate: '',
    duration: '1 year',
    roomType: '',
    amenitiesLooking: [],
    aboutRoommate: '',
    socialPreference: '',
    gender: '',
    smokingPolicy: '',
    petPolicy: '',
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
      amenitiesLooking: prev.amenitiesLooking.includes(amenity)
        ? prev.amenitiesLooking.filter((a) => a !== amenity)
        : [...prev.amenitiesLooking, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting roommate profile:', formData);

    setTimeout(() => {
      setLoading(false);
      router.push('/roommates');
    }, 1500);
  };

  const isStep1Complete =
    formData.firstName &&
    formData.lastName &&
    formData.age &&
    formData.email &&
    formData.phone;

  const isStep2Complete =
    formData.university &&
    formData.major &&
    formData.description &&
    formData.socialPreference &&
    formData.gender;

  const isStep3Complete =
    formData.budget &&
    formData.location &&
    formData.moveInDate &&
    formData.duration &&
    formData.roomType &&
    formData.amenitiesLooking.length > 0;

  const canProceed =
    currentStep === 1
      ? isStep1Complete
      : currentStep === 2
      ? isStep2Complete
      : isStep3Complete;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-6">
        <div className="">
          <Link href="/roommates" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-2 inline-block">
            ← Back to Roommates
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Your Roommate</h1>
          <p className="text-sm sm:text-base text-gray-600">Post your profile and connect with compatible roommates</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress Indicator */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                      step <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
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
              <span>About You</span>
              <span>Background</span>
              <span>Housing Preferences</span>
            </div>
          </div>

          {/* Step 1: About You */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About You</h2>

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
                    placeholder="e.g., Sarah"
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
                    placeholder="e.g., Johnson"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="18"
                    max="50"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
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
                  placeholder="your.email@university.edu"
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

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Social Preference *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['introverted', 'balanced', 'extroverted'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, socialPreference: pref as any }))}
                      className={`px-4 py-3 rounded-lg font-semibold transition ${
                        formData.socialPreference === pref
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pref === 'introverted' && '🤫 Quiet'}
                      {pref === 'balanced' && '⚖️ Balanced'}
                      {pref === 'extroverted' && '🎉 Social'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Background */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Background</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  University *
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                >
                  <option value="">Select your university</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Major/Field of Study *
                </label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tell Us About Yourself *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Share a bit about yourself - hobbies, interests, personality traits..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Smoking Policy
                  </label>
                  <select
                    name="smokingPolicy"
                    value={formData.smokingPolicy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  >
                    <option value="">Select preference</option>
                    <option value="no">No smoking</option>
                    <option value="outside">Outside only</option>
                    <option value="yes">Okay with smoking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Pets Policy
                  </label>
                  <select
                    name="petPolicy"
                    value={formData.petPolicy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  >
                    <option value="">Select preference</option>
                    <option value="no">No pets</option>
                    <option value="yes">Pets welcome</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  What Are You Looking for in a Roommate?
                </label>
                <textarea
                  name="aboutRoommate"
                  value={formData.aboutRoommate}
                  onChange={handleInputChange}
                  placeholder="Describe your ideal roommate - study habits, cleanliness, compatibility..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Step 3: Housing Preferences */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Housing Preferences</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Budget (RWF) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    min="50000"
                    max="500000"
                    step="10000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Room Type *
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  >
                    <option value="">Select room type</option>
                    <option value="single">Single Room</option>
                    <option value="shared">Shared Room</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Preferred Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Gisozi, Remera, Kigali"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Move-In Date *
                  </label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Lease Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                    required
                  >
                    <option value="6 months">6 Months</option>
                    <option value="1 year">1 Year</option>
                    <option value="1.5 years">1.5 Years</option>
                    <option value="2 years">2 Years</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Amenities You're Looking For *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenityOptions.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                        formData.amenitiesLooking.includes(amenity)
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

            {currentStep < 3 ? (
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
                {loading ? 'Publishing...' : 'Publish Profile'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
