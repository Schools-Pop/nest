'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  title: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  negotiable: boolean;
  location: string;
  images: string[];
  phoneNumber: string;
  email: string;
}

const CATEGORIES = [
  'Furniture',
  'Electronics',
  'Books',
  'Kitchen',
  'Clothing',
  'Sports',
  'Other',
];

const CONDITIONS = ['Like New', 'Good', 'Fair', 'For Parts'];

const LOCATIONS = [
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

export default function SalePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: 0,
    negotiable: false,
    location: '',
    images: ['📦', '📦', '📦'],
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.condition && formData.price > 0 && formData.location;
      case 3:
        return formData.phoneNumber && formData.email;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/items/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create listing');
        setLoading(false);
        return;
      }

      alert('Item listed successfully!');
      router.push('/buy');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
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
          <p className="text-gray-600">Sell Your Item</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full mx-1 transition ${
                  step <= activeStep ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {activeStep} of 3
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Step 1: Item Details */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Item Details</h2>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Single Bed Frame - Nearly New"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  placeholder="Describe your item: condition, features, why you're selling, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  maxLength={1000}
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Gallery Preview */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Photos (Coming Soon)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-600 transition"
                    >
                      {img}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📸 Photo upload feature coming soon. For now, use emoji placeholders.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Condition */}
          {activeStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Condition</h2>

              {/* Condition */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Item Condition *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {CONDITIONS.map((cond) => (
                    <button
                      key={cond}
                      onClick={() => handleInputChange('condition', cond)}
                      className={`px-4 py-3 rounded-lg border-2 transition ${
                        formData.condition === cond
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600 font-semibold'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-300'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price (RWF) *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  min="1000"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Negotiable */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.negotiable}
                    onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    Price is negotiable
                  </span>
                </label>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Pickup Location *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                >
                  <option value="">-- Select Location --</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      Kigali, {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Preview */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-sm text-gray-600 mb-1">Your item price:</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {formData.price.toLocaleString()} RWF
                </p>
                {formData.negotiable && (
                  <p className="text-sm text-orange-600 mt-2">
                    💰 Marked as negotiable
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {activeStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+250 788 123 456"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Summary */}
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Preview Your Listing</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-semibold">{formData.title || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold">{formData.category || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-semibold">{formData.condition || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-indigo-600">
                      {formData.price.toLocaleString()} RWF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">
                      {formData.location ? `Kigali, ${formData.location}` : 'Not set'}
                    </span>
                  </div>
                  {formData.negotiable && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Negotiable:</span>
                      <span className="font-semibold text-orange-600">Yes</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer mt-1"
                />
                <span className="text-sm text-gray-600">
                  I agree that this item is my property and I'm authorized to sell it. I also agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Terms of Service
                  </a>
                </span>
              </label>
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

          {activeStep < 3 ? (
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
              disabled={loading}
              className={`px-6 py-3 font-semibold rounded-lg transition ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
