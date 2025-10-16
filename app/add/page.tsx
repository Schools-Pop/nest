'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  price: number;
  address: string;
  description: string;
  amenities: string[];
  services: string[];
  rules: string[];
  leaseTerms: string;
  availableFrom: string;
  distanceFromSchool: number;
  distanceFromBusStop: number;
  bikeCostToSchool: number;
  images: string[];
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
}

const AMENITY_OPTIONS = [
  'WiFi',
  'Water',
  'Electricity',
  'Furnished',
  'AC',
  'Shared Kitchen',
  'Full Kitchen',
  'Balcony',
  'Parking',
  'Garden',
];

const SERVICE_OPTIONS = [
  'WiFi (5 Mbps)',
  'WiFi (20 Mbps)',
  'Water 24/7',
  'Electricity',
  'Laundry Service',
  'Security (24/7)',
  'Garbage Collection',
  'Cleaning Service (weekly)',
  'Hot Water',
];

const RULE_OPTIONS = [
  'No loud noise after 10 PM',
  'No smoking inside',
  'No pets allowed',
  'Visitors allowed until 9 PM',
  'Keep common areas clean',
  'Respect quiet hours (10 PM - 8 AM)',
  'No loud parties',
];

const SCHOOLS = [
  { id: '1', name: 'Carnegie Mellon University Africa', location: 'Kigali' },
  { id: '2', name: 'African Leadership University', location: 'Kigali' },
  { id: '3', name: 'University of Rwanda', location: 'Kigali' },
  { id: '4', name: 'National University of Rwanda', location: 'Huye' },
];

const NEIGHBORHOODS = [
  'Nyamirambo',
  'Gisozi',
  'Kimironko',
  'Remera',
  'Muhima',
  'Kacyiru',
  'Kiyovu',
  'Rebero',
  'Kabeza',
  'Bugesera',
];

export default function AddListingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    address: '',
    description: '',
    amenities: [],
    services: [],
    rules: [],
    leaseTerms: '12 months',
    availableFrom: '',
    distanceFromSchool: 0,
    distanceFromBusStop: 0,
    bikeCostToSchool: 0,
    images: ['🏠', '🛏️', '🚪'],
    landlordName: '',
    landlordPhone: '',
    landlordEmail: '',
  });

  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleRuleToggle = (rule: string) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.includes(rule)
        ? prev.rules.filter((r) => r !== rule)
        : [...prev.rules, rule],
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Listing created successfully!');
    router.push('/find');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 1:
        return formData.name && formData.price > 0 && selectedNeighborhood;
      case 2:
        return selectedSchool && formData.distanceFromSchool > 0 && formData.distanceFromBusStop >= 0 && formData.bikeCostToSchool > 0;
      case 3:
        return formData.amenities.length > 0 && formData.services.length > 0;
      case 4:
        return formData.landlordName && formData.landlordPhone && formData.landlordEmail;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            StudentNest
          </Link>
          <p className="text-gray-600">Add New Property</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full mx-1 transition ${
                  step <= activeStep ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {activeStep} of 4
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Step 1: Basic Information */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

              {/* Property Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Property Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cozy Studio Near Campus"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Monthly Price */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Monthly Price (RWF) *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 150000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Neighborhood Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Neighborhood *
                </label>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => {
                    setSelectedNeighborhood(e.target.value);
                    handleInputChange('address', `Kigali, ${e.target.value}`);
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="">-- Select Neighborhood --</option>
                  {NEIGHBORHOODS.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Property Description
                </label>
                <textarea
                  placeholder="Describe your property features, condition, and highlights..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Lease Terms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Lease Terms
                </label>
                <select
                  value={formData.leaseTerms}
                  onChange={(e) => handleInputChange('leaseTerms', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                  <option value="6-12 months flexible">6-12 months flexible</option>
                </select>
              </div>

              {/* Available From */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Available From
                </label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location & Distance */}
          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Distance</h2>

              {/* School Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nearest School *
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="">-- Select School --</option>
                  {SCHOOLS.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Distance from School */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Distance from School (km) *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={formData.distanceFromSchool}
                    onChange={(e) => handleInputChange('distanceFromSchool', parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={formData.distanceFromSchool}
                    onChange={(e) => handleInputChange('distanceFromSchool', parseFloat(e.target.value))}
                    className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  />
                  <span className="text-gray-600">km</span>
                </div>
              </div>

              {/* Distance from Bus Stop */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Distance from Bus Stop (km) *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={formData.distanceFromBusStop}
                    onChange={(e) => handleInputChange('distanceFromBusStop', parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={formData.distanceFromBusStop}
                    onChange={(e) => handleInputChange('distanceFromBusStop', parseFloat(e.target.value))}
                    className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  />
                  <span className="text-gray-600">km</span>
                </div>
              </div>

              {/* Bike Cost to School */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Daily Bike Cost to School (RWF) *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.bikeCostToSchool}
                  onChange={(e) => handleInputChange('bikeCostToSchool', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Map Preview */}
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-600 text-center">
                  📍 Map Integration Coming Soon
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  You'll be able to click on the map to select exact property location
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Amenities & Services */}
          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Services</h2>

              {/* Amenities */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Amenities *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITY_OPTIONS.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        formData.amenities.includes(amenity)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-300'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Services *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`px-4 py-2 rounded-lg border-2 transition text-left ${
                        formData.services.includes(service)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-300'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  House Rules
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {RULE_OPTIONS.map((rule) => (
                    <button
                      key={rule}
                      onClick={() => handleRuleToggle(rule)}
                      className={`px-4 py-2 rounded-lg border-2 transition text-left ${
                        formData.rules.includes(rule)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-300'
                      }`}
                    >
                      {rule}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Landlord Information */}
          {activeStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Landlord Information</h2>

              {/* Landlord Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.landlordName}
                  onChange={(e) => handleInputChange('landlordName', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+250 788 123 456"
                  value={formData.landlordPhone}
                  onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.landlordEmail}
                  onChange={(e) => handleInputChange('landlordEmail', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Summary */}
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-gray-900 mb-3">Review Your Listing</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Property:</strong> {formData.name}</p>
                  <p><strong>Price:</strong> {formData.price.toLocaleString()} RWF/month</p>
                  <p><strong>Location:</strong> {formData.address}</p>
                  <p><strong>Distance to School:</strong> {formData.distanceFromSchool} km</p>
                  <p><strong>Amenities:</strong> {formData.amenities.length} selected</p>
                  <p><strong>Services:</strong> {formData.services.length} selected</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            ← Previous
          </button>

          {activeStep < 4 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={!isStepValid()}
              className={`px-6 py-3 font-semibold rounded-lg transition ${
                isStepValid()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Publish Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
