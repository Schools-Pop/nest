'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface FormData {
  name: string;
  cuisine: string;
  priceRange: string;
  address: string;
  phoneNumber: string;
  deliveryTime: string;
  openingHours: string;
  description: string;
  dishes: string;
}

const CUISINES = [
  'Rwandan',
  'Ethiopian',
  'Nigerian',
  'Kenyan',
  'Tanzanian',
  'Ugandan',
  'Burundian',
  'South African',
  'Congolese',
  'West African',
  'East African',
  'Indian',
  'Italian',
  'Chinese',
  'Fast Food',
  'Other',
];

export default function AddFoodPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cuisine: '',
    priceRange: '',
    address: '',
    phoneNumber: '',
    deliveryTime: '',
    openingHours: '',
    description: '',
    dishes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.cuisine || !formData.priceRange || !formData.address || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        cuisine: '',
        priceRange: '',
        address: '',
        phoneNumber: '',
        deliveryTime: '',
        openingHours: '',
        description: '',
        dishes: '',
      });
      setSubmitted(false);
      router.push('/food');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/food" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Restaurants
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Favorite Restaurant</h1>
            <p className="text-gray-600">
              Help other students discover great places to eat by sharing your favorite restaurants in Kigali
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h2>
              <p className="text-green-600 mb-4">
                Your restaurant has been submitted successfully. Thank you for helping the community!
              </p>
              <p className="text-sm text-gray-600">Redirecting to restaurants...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Mama Kigali"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  required
                />
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cuisine Type *
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  required
                >
                  <option value="">Select a cuisine...</option>
                  {CUISINES.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price Range *
                </label>
                <div className="flex gap-4">
                  {['$', '$$', '$$$'].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range}
                        checked={formData.priceRange === range}
                        onChange={handleChange}
                        className="w-4 h-4"
                        required
                      />
                      <span className="text-gray-700 font-semibold">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Kigali, Nyamirambo"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g., +250 788 123 456"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                  required
                />
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Delivery Time (if available)
                </label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  placeholder="e.g., 30-45 mins"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                />
              </div>

              {/* Opening Hours */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Opening Hours
                </label>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g., 10:00 AM - 10:00 PM"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this restaurant... What do you like about it?"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                />
              </div>

              {/* Popular Dishes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Popular Dishes
                </label>
                <textarea
                  name="dishes"
                  value={formData.dishes}
                  onChange={handleChange}
                  placeholder="List popular dishes separated by commas (e.g., Ugali, Matoke, Fish)"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900"
                />
              </div>

              {/* Helper Text */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-700">
                  <strong>📝 Note:</strong> Fields marked with * are required. Your submission helps other students discover great places to eat!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Submit Restaurant
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">Why Add a Restaurant?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Help fellow students discover great places to eat</li>
            <li>✅ Support local businesses in your community</li>
            <li>✅ Build a comprehensive food guide for students</li>
            <li>✅ Share your favorite dining experiences</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
