'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Item {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  condition: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
  };
  description: string;
  location: string;
  postedDate: string;
  negotiable: boolean;
}

const CATEGORIES = ['All', 'Furniture', 'Electronics', 'Books', 'Kitchen', 'Clothing', 'Sports', 'Other'];

const CONDITIONS = ['All', 'Like New', 'Good', 'Fair', 'For Parts'];

const DUMMY_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Single Bed Frame - Nearly New',
    price: 25000,
    image: '🛏️',
    category: 'Furniture',
    condition: 'Like New',
    seller: { name: 'Sarah M.', avatar: '👩‍🎓', rating: 4.9 },
    description: 'Wooden single bed frame in excellent condition. Barely used, perfect for dorm room.',
    location: 'Kigali, Nyamirambo',
    postedDate: '2 days ago',
    negotiable: true,
  },
  {
    id: '2',
    title: 'Laptop Dell Inspiron 15',
    price: 450000,
    image: '💻',
    category: 'Electronics',
    condition: 'Good',
    seller: { name: 'John D.', avatar: '👨‍🎓', rating: 4.7 },
    description: 'Intel Core i5, 8GB RAM, 256GB SSD. Works perfectly, minor keyboard wear.',
    location: 'Kigali, Gisozi',
    postedDate: '1 week ago',
    negotiable: true,
  },
  {
    id: '3',
    title: 'Introduction to Algorithms - MIT',
    price: 8000,
    image: '📚',
    category: 'Books',
    condition: 'Good',
    seller: { name: 'Emma L.', avatar: '👩‍🎓', rating: 5.0 },
    description: 'Classic computer science textbook. Used for 2 semesters, all pages intact.',
    location: 'Kigali, Remera',
    postedDate: '3 days ago',
    negotiable: false,
  },
  {
    id: '4',
    title: 'Microwave Oven - LG',
    price: 35000,
    image: '🔥',
    category: 'Kitchen',
    condition: 'Like New',
    seller: { name: 'Peter N.', avatar: '👨‍🎓', rating: 4.8 },
    description: 'Compact microwave oven, perfect for student accommodations. 700W power.',
    location: 'Kigali, Muhima',
    postedDate: '5 days ago',
    negotiable: true,
  },
  {
    id: '5',
    title: 'Winter Jacket - Barely Worn',
    price: 15000,
    image: '🧥',
    category: 'Clothing',
    condition: 'Like New',
    seller: { name: 'Lisa K.', avatar: '👩‍🎓', rating: 4.6 },
    description: 'Warm winter jacket, only worn once. Excellent for cold weather.',
    location: 'Kigali, Kacyiru',
    postedDate: '1 week ago',
    negotiable: true,
  },
  {
    id: '6',
    title: 'Mountain Bike - Trek',
    price: 180000,
    image: '🚲',
    category: 'Sports',
    condition: 'Good',
    seller: { name: 'Alex M.', avatar: '👨‍🎓', rating: 4.9 },
    description: '21-speed mountain bike. Great for campus commute. Some wear on tires.',
    location: 'Kigali, Kimironko',
    postedDate: '4 days ago',
    negotiable: true,
  },
  {
    id: '7',
    title: 'Study Desk with Lamp',
    price: 18000,
    image: '🪑',
    category: 'Furniture',
    condition: 'Good',
    seller: { name: 'Maria T.', avatar: '👩‍🎓', rating: 4.7 },
    description: 'Wooden study desk with built-in LED lamp. Perfect for studying.',
    location: 'Kigali, Gisozi',
    postedDate: '6 days ago',
    negotiable: false,
  },
  {
    id: '8',
    title: 'Wireless Earbuds - Sony',
    price: 45000,
    image: '🎧',
    category: 'Electronics',
    condition: 'Like New',
    seller: { name: 'David K.', avatar: '👨‍🎓', rating: 5.0 },
    description: 'Noise-cancelling wireless earbuds with 30-hour battery. Comes with case.',
    location: 'Kigali, Remera',
    postedDate: '2 days ago',
    negotiable: false,
  },
];

export default function BuyPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredItems = useMemo(() => {
    return DUMMY_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      const matchPrice = item.price <= maxPrice;
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchCondition && matchPrice && matchSearch;
    }).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }, [selectedCategory, selectedCondition, maxPrice, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-0 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
          />
          <Link
            href="/sale"
            className="px-4 sm:px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition whitespace-nowrap text-sm sm:text-base"
          >
            + Sell
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

              {/* Category Filter - Dropdown on Mobile, List on Desktop */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Category
                </label>
                
                {/* Mobile: Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full lg:hidden px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 font-medium"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Desktop: Button List */}
                <div className="hidden lg:space-y-2 lg:block">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-indigo-100 text-indigo-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition Filter - Dropdown on Mobile, List on Desktop */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Condition
                </label>
                
                {/* Mobile: Dropdown */}
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full lg:hidden px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 font-medium"
                >
                  {CONDITIONS.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>

                {/* Desktop: Button List */}
                <div className="hidden lg:space-y-2 lg:block">
                  {CONDITIONS.map((condition) => (
                    <button
                      key={condition}
                      onClick={() => setSelectedCondition(condition)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCondition === condition
                          ? 'bg-indigo-100 text-indigo-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Max Price: {maxPrice.toLocaleString()} RWF
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0</span>
                  <span>500K</span>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedCondition('All');
                  setMaxPrice(500000);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Student Marketplace
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} items available
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Items Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedCondition('All');
                    setMaxPrice(500000);
                    setSearchTerm('');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/buy/${item.id}`)}
                  >
                    {/* Item Image */}
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
                      {item.image}
                    </div>

                    {/* Item Info */}
                    <div className="p-4">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {item.condition}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-2xl font-bold text-indigo-600">
                          {(item.price / 1000).toFixed(0)}K RWF
                        </p>
                        {item.negotiable && (
                          <span className="text-xs text-orange-600 font-semibold">
                            Negotiable
                          </span>
                        )}
                      </div>

                      {/* Location & Posted Date */}
                      <div className="text-xs text-gray-500 mb-3">
                        <p>📍 {item.location}</p>
                        <p>Posted {item.postedDate}</p>
                      </div>

                      {/* Seller Info */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.seller.avatar}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.seller.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400 text-sm">★</span>
                              <span className="text-xs text-gray-600">
                                {item.seller.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
