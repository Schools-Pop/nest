'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

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
  description: string;
  images: string[];
  landlord: {
    name: string;
    avatar: string;
    responseTime: string;
    phone: string;
    email: string;
  };
  reviews_list: Array<{
    author: string;
    rating: number;
    date: string;
    text: string;
    avatar: string;
  }>;
  services: string[];
  rules: string[];
  leaseTerms: string;
  availableFrom: string;
}

const DUMMY_LISTINGS: { [key: string]: Listing } = {
  '1': {
    id: '1',
    name: 'Cozy Studio Near Campus',
    price: 100000,
    image: '🏠',
    distanceFromSchool: 0.3,
    distanceFromBusStop: 0.2,
    bikeCostToSchool: 400,
    address: 'Kigali, Nyamirambo',
    description: 'A cozy and well-maintained studio apartment located just 300m from campus. Perfect for international students looking for convenience and proximity to their university.',
    amenities: ['WiFi', 'Water', 'Electricity', 'Furnished'],
    rating: 4.5,
    reviews: 12,
    images: ['🏠', '🛏️', '🚪', '🪟', '🛁', '🍳'],
    landlord: { name: 'Jean Claude', avatar: '👨', responseTime: 'Within 1 hour', phone: '+250 788 123 456', email: 'jean.claude@email.com' },
    reviews_list: [
      { author: 'Michael O.', rating: 5, date: 'Dec 2023', text: 'Excellent location! Very close to campus and the landlord is super responsive.', avatar: '👨‍🎓' },
      { author: 'Sarah K.', rating: 4, date: 'Nov 2023', text: 'Great apartment for the price. Water and electricity are reliable.', avatar: '👩‍🎓' },
    ],
    services: ['WiFi (5 Mbps)', 'Water 24/7', 'Electricity', 'Laundry Service', 'Security (24/7)'],
    rules: ['No loud noise after 10 PM', 'No smoking inside', 'Visitors allowed until 9 PM'],
    leaseTerms: '12 months minimum',
    availableFrom: 'January 15, 2024',
  },
  '2': {
    id: '2',
    name: 'Compact Room - Ultra Close',
    price: 95000,
    image: '🏘️',
    distanceFromSchool: 0.4,
    distanceFromBusStop: 0.3,
    bikeCostToSchool: 450,
    address: 'Kigali, Nyamirambo',
    description: 'Ultra-close to campus! A compact but comfortable room in a student-friendly area. Perfect for those who want to be steps away from university.',
    amenities: ['Water', 'Electricity', 'Shared Kitchen'],
    rating: 4.2,
    reviews: 8,
    images: ['🏘️', '🛏️', '🚪', '🌳', '🛁', '🍳'],
    landlord: { name: 'Marie T.', avatar: '👩', responseTime: 'Within 2 hours', phone: '+250 788 234 567', email: 'marie.t@email.com' },
    reviews_list: [
      { author: 'Emma L.', rating: 4, date: 'Nov 2023', text: 'Super close to campus! Can walk in 5 minutes. Great value.', avatar: '👩‍🎓' },
      { author: 'David M.', rating: 4, date: 'Oct 2023', text: 'Good location, friendly landlord.', avatar: '👨‍🎓' },
    ],
    services: ['Shared Kitchen', 'Water 24/7', 'Electricity', 'Shared Living Area'],
    rules: ['Keep room clean', 'Contribute to cleaning shared spaces', 'Quiet hours 10 PM - 8 AM'],
    leaseTerms: '6-12 months',
    availableFrom: 'Immediately',
  },
  '3': {
    id: '3',
    name: 'Budget Studio with Basics',
    price: 85000,
    image: '🏠',
    distanceFromSchool: 0.6,
    distanceFromBusStop: 0.5,
    bikeCostToSchool: 500,
    address: 'Kigali, Nyamirambo',
    description: 'Budget-friendly studio with all the basics you need. Furnished and ready for students. Great value for the price.',
    amenities: ['Water', 'Electricity', 'Furnished'],
    rating: 4.0,
    reviews: 6,
    images: ['🏠', '🛏️', '🚪', '🪟', '🛁', '💡'],
    landlord: { name: 'Robert K.', avatar: '👨', responseTime: 'Within 3 hours', phone: '+250 788 345 678', email: 'robert.k@email.com' },
    reviews_list: [
      { author: 'Peter N.', rating: 4, date: 'Oct 2023', text: 'Affordable and close to campus. Good for budget-conscious students.', avatar: '👨‍🎓' },
    ],
    services: ['Water 24/7', 'Electricity', 'Basic Furniture'],
    rules: ['Keep room clean', 'No loud parties', 'Quiet hours 11 PM - 7 AM'],
    leaseTerms: '3-12 months',
    availableFrom: 'February 1, 2024',
  },
  '4': {
    id: '4',
    name: 'Modern 1-Bedroom Apartment',
    price: 200000,
    image: '🏢',
    distanceFromSchool: 0.8,
    distanceFromBusStop: 0.7,
    bikeCostToSchool: 600,
    address: 'Kigali, Gisozi',
    description: 'Modern and spacious 1-bedroom apartment with contemporary furnishings. Features a separate kitchen, living area, and full bathroom.',
    amenities: ['WiFi', 'Water', 'Kitchen', 'Balcony', 'AC', 'Furnished'],
    rating: 4.8,
    reviews: 24,
    images: ['🏢', '🛏️', '🛋️', '🍳', '🛁', '🪟'],
    landlord: { name: 'Marie Jeanne', avatar: '👩', responseTime: 'Within 30 minutes', phone: '+250 788 234 567', email: 'marie.jeanne@email.com' },
    reviews_list: [
      { author: 'Emma L.', rating: 5, date: 'Dec 2023', text: 'Absolutely love this apartment! Modern, clean, and the landlord is amazing.', avatar: '👩‍🎓' },
      { author: 'John P.', rating: 5, date: 'Nov 2023', text: 'Best place I\'ve lived. Great balcony view, good WiFi.', avatar: '👨‍🎓' },
    ],
    services: ['High-speed WiFi (20 Mbps)', 'Water 24/7', 'Electricity', 'Security', 'Cleaning Service (weekly)'],
    rules: ['No loud parties', 'No smoking', 'Respect quiet hours (10 PM - 8 AM)', 'Visitors welcome'],
    leaseTerms: '6-12 months flexible',
    availableFrom: 'Immediately',
  },
  '5': {
    id: '5',
    name: 'Comfortable Shared House',
    price: 150000,
    image: '🏘️',
    distanceFromSchool: 1.0,
    distanceFromBusStop: 0.6,
    bikeCostToSchool: 550,
    address: 'Kigali, Remera',
    description: 'Comfortable shared house in a vibrant neighborhood. Share common areas with other students and enjoy a community atmosphere.',
    amenities: ['WiFi', 'Water', 'Shared Kitchen', 'Furnished'],
    rating: 4.3,
    reviews: 15,
    images: ['🏘️', '🛏️', '🍳', '🪑', '🌳', '🚪'],
    landlord: { name: 'Antoine R.', avatar: '👨', responseTime: 'Within 1.5 hours', phone: '+250 788 456 789', email: 'antoine.r@email.com' },
    reviews_list: [
      { author: 'Lisa M.', rating: 4, date: 'Nov 2023', text: 'Great community vibes. Roommates are friendly. Good value for money.', avatar: '👩‍🎓' },
      { author: 'Tom H.', rating: 4, date: 'Oct 2023', text: 'Nice shared space. WiFi is reliable. Close to school.', avatar: '👨‍🎓' },
    ],
    services: ['Shared WiFi', 'Water 24/7', 'Electricity', 'Shared Kitchen', 'Garden'],
    rules: ['Keep room clean', 'Contribute to cleaning shared spaces', 'Quiet hours 10 PM - 8 AM', 'Respect housemates'],
    leaseTerms: '6-12 months',
    availableFrom: 'Immediately',
  },
  '6': {
    id: '6',
    name: 'Spacious 1-Bed with WiFi',
    price: 180000,
    image: '🏠',
    distanceFromSchool: 1.2,
    distanceFromBusStop: 0.8,
    bikeCostToSchool: 700,
    address: 'Kigali, Muhima',
    description: 'Spacious 1-bedroom apartment with reliable WiFi connection. Full kitchen and modern amenities. Perfect for students who need space and connectivity.',
    amenities: ['WiFi', 'Water', 'Full Kitchen', 'Furnished', 'AC'],
    rating: 4.4,
    reviews: 18,
    images: ['🏠', '🛏️', '🛋️', '🍳', '💻', '🪟'],
    landlord: { name: 'Grace N.', avatar: '👩', responseTime: 'Within 1 hour', phone: '+250 788 567 890', email: 'grace.n@email.com' },
    reviews_list: [
      { author: 'Claire B.', rating: 5, date: 'Dec 2023', text: 'Spacious and comfortable. WiFi is fast and reliable. Excellent for studying.', avatar: '👩‍🎓' },
      { author: 'Alex S.', rating: 4, date: 'Nov 2023', text: 'Great apartment. Close enough to school. Good amenities.', avatar: '👨‍🎓' },
    ],
    services: ['WiFi (15 Mbps)', 'Water 24/7', 'Electricity', 'Full Kitchen', 'AC'],
    rules: ['No smoking indoors', 'Quiet hours 10 PM - 8 AM', 'Keep apartment clean'],
    leaseTerms: '6-12 months',
    availableFrom: 'January 1, 2024',
  },
  '7': {
    id: '7',
    name: 'Luxury Studio with View',
    price: 280000,
    image: '🏢',
    distanceFromSchool: 1.1,
    distanceFromBusStop: 0.9,
    bikeCostToSchool: 700,
    address: 'Kigali, Kacyiru',
    description: 'Luxury studio apartment with stunning views. Premium furnishings, AC, and a beautiful balcony. Perfect for students who want comfort and style.',
    amenities: ['WiFi', 'Water', 'AC', 'Furnished', 'Balcony', 'Premium finishes'],
    rating: 4.7,
    reviews: 19,
    images: ['🏢', '🛏️', '🛋️', '🪟', '🛁', '🌆'],
    landlord: { name: 'Vincent L.', avatar: '👨', responseTime: 'Within 30 minutes', phone: '+250 788 678 901', email: 'vincent.l@email.com' },
    reviews_list: [
      { author: 'Nicole R.', rating: 5, date: 'Dec 2023', text: 'Stunning views! Luxury finishes. Best apartment I\'ve seen. Worth the price.', avatar: '👩‍🎓' },
      { author: 'Marcus G.', rating: 4, date: 'Nov 2023', text: 'Very nice apartment. Premium quality. Good landlord.', avatar: '👨‍🎓' },
    ],
    services: ['High-speed WiFi (25 Mbps)', 'Water 24/7', 'Electricity', 'AC', 'Premium Furniture', 'Cleaning Service'],
    rules: ['Respect quiet hours', 'No loud music', 'Keep apartment pristine'],
    leaseTerms: '12 months',
    availableFrom: 'January 1, 2024',
  },
  '8': {
    id: '8',
    name: 'Spacious 2-Bedroom Flat',
    price: 350000,
    image: '🏠',
    distanceFromSchool: 0.8,
    distanceFromBusStop: 1.1,
    bikeCostToSchool: 600,
    address: 'Kigali, Remera',
    description: 'Spacious 2-bedroom flat perfect for students sharing accommodation. Full kitchen, living area, parking, and all modern amenities.',
    amenities: ['WiFi', 'Water', 'Full Kitchen', 'Parking', 'AC', 'Furnished', 'Balcony'],
    rating: 4.9,
    reviews: 31,
    images: ['🏠', '🛏️', '🛏️', '🛋️', '🍳', '🅿️'],
    landlord: { name: 'Patrick M.', avatar: '👨', responseTime: 'Within 1 hour', phone: '+250 788 789 012', email: 'patrick.m@email.com' },
    reviews_list: [
      { author: 'Sophie D.', rating: 5, date: 'Dec 2023', text: 'Perfect for sharing! Two bedrooms, excellent space. Highly recommended.', avatar: '👩‍🎓' },
      { author: 'James W.', rating: 5, date: 'Nov 2023', text: 'Great apartment for two people. Close to campus. Parking is a bonus.', avatar: '👨‍🎓' },
    ],
    services: ['WiFi (20 Mbps)', 'Water 24/7', 'Electricity', 'Full Kitchen', 'AC', 'Parking', 'Security (24/7)'],
    rules: ['No loud parties', 'Respect quiet hours (10 PM - 8 AM)', 'Keep common areas clean', 'Visitors allowed'],
    leaseTerms: '12 months',
    availableFrom: 'Immediately',
  },
  '9': {
    id: '9',
    name: 'Premium 2-Bed Apartment',
    price: 320000,
    image: '🏢',
    distanceFromSchool: 1.5,
    distanceFromBusStop: 1.0,
    bikeCostToSchool: 800,
    address: 'Kigali, Kimironko',
    description: 'Premium 2-bedroom apartment with luxury finishes. Features full kitchen, parking, garden, and all modern conveniences for comfortable living.',
    amenities: ['WiFi', 'Water', 'AC', 'Full Kitchen', 'Parking', 'Garden', 'Furnished'],
    rating: 4.8,
    reviews: 28,
    images: ['🏢', '🛏️', '🛏️', '🛋️', '🌳', '🅿️'],
    landlord: { name: 'Elise K.', avatar: '👩', responseTime: 'Within 1 hour', phone: '+250 788 890 123', email: 'elise.k@email.com' },
    reviews_list: [
      { author: 'Victoria H.', rating: 5, date: 'Dec 2023', text: 'Premium quality! Garden is beautiful. Great for students.', avatar: '👩‍🎓' },
      { author: 'Nathan L.', rating: 5, date: 'Nov 2023', text: 'Excellent apartment. All amenities included. Professional landlord.', avatar: '👨‍🎓' },
    ],
    services: ['High-speed WiFi (25 Mbps)', 'Water 24/7', 'Electricity', 'AC', 'Full Kitchen', 'Parking', 'Garden', 'Laundry Service'],
    rules: ['Respect quiet hours', 'No loud music', 'Keep grounds clean', 'Visitors welcome'],
    leaseTerms: '12 months',
    availableFrom: 'January 1, 2024',
  },
  '10': {
    id: '10',
    name: 'Budget-Friendly Room',
    price: 100000,
    image: '🏘️',
    distanceFromSchool: 2.1,
    distanceFromBusStop: 0.3,
    bikeCostToSchool: 1200,
    address: 'Kigali, Kimironko',
    description: 'Affordable shared house in a vibrant neighborhood. Very close to bus stop. Great for budget-conscious students.',
    amenities: ['Water', 'Electricity', 'Shared Kitchen', 'WiFi (shared)'],
    rating: 4.0,
    reviews: 8,
    images: ['🏘️', '🛏️', '🍳', '🪑', '🌳', '🚪'],
    landlord: { name: 'Robert K.', avatar: '👨', responseTime: 'Within 2 hours', phone: '+250 788 345 678', email: 'robert.k@email.com' },
    reviews_list: [
      { author: 'Peter N.', rating: 4, date: 'Nov 2023', text: 'Good value for money. Bus stop is very close. Roommates are friendly.', avatar: '👨‍🎓' },
    ],
    services: ['Shared WiFi', 'Water', 'Electricity', 'Shared Kitchen', 'Garden'],
    rules: ['Keep room clean', 'Contribute to cleaning shared spaces', 'Quiet hours 10 PM - 8 AM'],
    leaseTerms: '3-12 months',
    availableFrom: 'February 1, 2024',
  },
  '11': {
    id: '11',
    name: 'Affordable Student House',
    price: 110000,
    image: '🏠',
    distanceFromSchool: 2.5,
    distanceFromBusStop: 0.4,
    bikeCostToSchool: 1400,
    address: 'Kigali, Bugesera',
    description: 'Affordable student house perfect for budget travelers. Close to bus stop and shopping areas. Basic amenities but very affordable.',
    amenities: ['Water', 'Electricity', 'Shared Spaces', 'Furnished'],
    rating: 3.9,
    reviews: 7,
    images: ['🏠', '🛏️', '🚪', '🌳', '🛁', '💡'],
    landlord: { name: 'Isaac M.', avatar: '👨', responseTime: 'Within 3 hours', phone: '+250 788 456 789', email: 'isaac.m@email.com' },
    reviews_list: [
      { author: 'Lucas T.', rating: 4, date: 'Oct 2023', text: 'Very affordable. Close to bus. Good for budget students.', avatar: '👨‍🎓' },
    ],
    services: ['Water 24/7', 'Electricity', 'Shared Spaces', 'Basic Furniture'],
    rules: ['Keep room clean', 'No loud noise', 'Quiet hours 11 PM - 7 AM'],
    leaseTerms: '3-6 months',
    availableFrom: 'Immediately',
  },
  '12': {
    id: '12',
    name: 'Economy Studio',
    price: 95000,
    image: '🏘️',
    distanceFromSchool: 2.8,
    distanceFromBusStop: 0.5,
    bikeCostToSchool: 1600,
    address: 'Kigali, Kabeza',
    description: 'Economy studio apartment for budget-conscious students. Located near bus stop for easy access to transportation.',
    amenities: ['Water', 'Electricity', 'Furnished'],
    rating: 3.8,
    reviews: 5,
    images: ['🏘️', '🛏️', '🚪', '🪟', '💡', '🛁'],
    landlord: { name: 'Samuel O.', avatar: '👨', responseTime: 'Within 4 hours', phone: '+250 788 567 890', email: 'samuel.o@email.com' },
    reviews_list: [
      { author: 'Kevin P.', rating: 4, date: 'Sep 2023', text: 'Very affordable. Basic but clean. Good for students on tight budget.', avatar: '👨‍🎓' },
    ],
    services: ['Water 24/7', 'Electricity', 'Basic Furniture'],
    rules: ['Keep room clean', 'No loud music', 'Quiet hours 11 PM - 7 AM'],
    leaseTerms: '3 months minimum',
    availableFrom: 'February 2024',
  },
  '13': {
    id: '13',
    name: 'Nice 1-Bed in Gisozi',
    price: 160000,
    image: '🏢',
    distanceFromSchool: 2.0,
    distanceFromBusStop: 0.6,
    bikeCostToSchool: 900,
    address: 'Kigali, Gisozi',
    description: 'Nice 1-bedroom apartment in Gisozi. Good amenities at a reasonable price. Quiet neighborhood, perfect for studying.',
    amenities: ['WiFi', 'Water', 'Kitchen', 'AC', 'Furnished'],
    rating: 4.3,
    reviews: 14,
    images: ['🏢', '🛏️', '🛋️', '🍳', '🛁', '🪟'],
    landlord: { name: 'Josephine W.', avatar: '👩', responseTime: 'Within 1.5 hours', phone: '+250 788 678 901', email: 'josephine.w@email.com' },
    reviews_list: [
      { author: 'Rachel A.', rating: 5, date: 'Nov 2023', text: 'Nice apartment! Good WiFi. Quiet area. Great for studying.', avatar: '👩‍🎓' },
      { author: 'Michael S.', rating: 4, date: 'Oct 2023', text: 'Good value. Nice neighborhood. Reliable landlord.', avatar: '👨‍🎓' },
    ],
    services: ['WiFi (12 Mbps)', 'Water 24/7', 'Electricity', 'Kitchen', 'AC'],
    rules: ['Quiet hours 10 PM - 8 AM', 'No smoking', 'Keep apartment clean'],
    leaseTerms: '6-12 months',
    availableFrom: 'January 15, 2024',
  },
  '14': {
    id: '14',
    name: 'Cozy 1-Bedroom',
    price: 140000,
    image: '🏠',
    distanceFromSchool: 2.3,
    distanceFromBusStop: 0.7,
    bikeCostToSchool: 1000,
    address: 'Kigali, Rebero',
    description: 'Cozy 1-bedroom apartment with all the essentials. Furnished and comfortable. Good for single students.',
    amenities: ['WiFi', 'Water', 'Furnished', 'AC'],
    rating: 4.1,
    reviews: 11,
    images: ['🏠', '🛏️', '🛋️', '🪟', '🛁', '💡'],
    landlord: { name: 'Charles M.', avatar: '👨', responseTime: 'Within 2 hours', phone: '+250 788 789 012', email: 'charles.m@email.com' },
    reviews_list: [
      { author: 'Diana K.', rating: 4, date: 'Oct 2023', text: 'Cozy and affordable. Good for students. Nice landlord.', avatar: '👩‍🎓' },
    ],
    services: ['WiFi (10 Mbps)', 'Water 24/7', 'Electricity', 'Furnished', 'AC'],
    rules: ['Quiet hours 10 PM - 8 AM', 'No smoking', 'Keep apartment clean'],
    leaseTerms: '6-12 months',
    availableFrom: 'February 1, 2024',
  },
};

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const listing = DUMMY_LISTINGS[params.id];

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <Link href="/find" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  // Calculate walking time (approximately 1.4m per second = 5km/h)
  const walkingTimeToSchool = Math.round(listing.distanceFromSchool * 12);
  const walkingTimeToBusStop = Math.round(listing.distanceFromBusStop * 12);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Images Gallery */}
            <div className="md:col-span-1">
              <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-6xl sm:text-8xl">
                {listing.image}
              </div>
            </div>

            {/* Listing Info */}
            <div className="md:col-span-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{listing.name}</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4">{listing.address}</p>

              {/* Price and Rating */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Monthly Price</p>
                  <p className="text-2xl sm:text-4xl font-bold text-indigo-600">{listing.price.toLocaleString()} RWF</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl sm:text-2xl">★</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{listing.rating}</span>
                  <span className="text-sm text-gray-600">({listing.reviews})</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Distance to School</p>
                  <p className="font-bold text-gray-900 text-sm">{listing.distanceFromSchool} km</p>
                  <p className="text-xs text-gray-600 mt-2">({walkingTimeToSchool} min walk)</p>
                </div>
                <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Distance to Bus Stop</p>
                  <p className="font-bold text-gray-900 text-sm">{listing.distanceFromBusStop} km</p>
                  <p className="text-xs text-gray-600 mt-2">({walkingTimeToBusStop} min walk)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs - Scrollable on Mobile */}
          <div className="overflow-x-auto border-b">
            <div className="flex min-w-max sm:min-w-0">
              {['overview', 'services', 'rules', 'landlord', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-auto px-3 sm:px-6 py-4 font-semibold transition text-xs sm:text-base whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'overview' && '📋 Overview'}
                  {tab === 'services' && '🛠️ Services'}
                  {tab === 'rules' && '📏 Rules'}
                  {tab === 'landlord' && '👤 Landlord'}
                  {tab === 'reviews' && '⭐ Reviews'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Listing</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">{listing.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Lease Terms</h4>
                    <p className="text-gray-700 text-sm">{listing.leaseTerms}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Available From</h4>
                    <p className="text-gray-700 text-sm">{listing.availableFrom}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Services Included</h3>
                <div className="space-y-3">
                  {listing.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-indigo-600 text-lg flex-shrink-0">✓</span>
                      <span className="text-gray-900 text-sm sm:text-base">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules Tab */}
            {activeTab === 'rules' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">House Rules</h3>
                <div className="space-y-3">
                  {listing.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-indigo-600 text-lg flex-shrink-0">•</span>
                      <span className="text-gray-900 text-sm sm:text-base">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord Tab */}
            {activeTab === 'landlord' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Meet Your Landlord</h3>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-indigo-50 rounded-lg mb-6">
                  <div className="text-5xl sm:text-6xl flex-shrink-0">{listing.landlord.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{listing.landlord.name}</h4>
                    <div className="space-y-2 text-gray-700 text-sm mb-4">
                      <p className="break-all">📞 <strong>Phone:</strong> {listing.landlord.phone}</p>
                      <p className="break-all">✉️ <strong>Email:</strong> {listing.landlord.email}</p>
                      <p>⏱️ <strong>Response Time:</strong> {listing.landlord.responseTime}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full px-4 sm:px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base">
                  Send Message to Landlord
                </button>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Reviews</h3>
                <div className="space-y-6">
                  {listing.reviews_list.map((review, idx) => (
                    <div key={idx} className="pb-6 border-b last:border-b-0">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="text-3xl sm:text-4xl flex-shrink-0">{review.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.author}</h4>
                            <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm sm:text-base ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-xs text-gray-600 ml-1">{review.rating}/5</span>
                          </div>
                          <p className="text-gray-700 text-sm">{review.text}</p>
                        </div>
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
