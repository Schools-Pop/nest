'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular: boolean;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  image: string;
  rating: number;
  reviews: number;
  address: string;
  phoneNumber: string;
  deliveryTime: string;
  minOrder: number;
  dishes: string[];
  openingHours: string;
  description: string;
  menu: MenuItem[];
  reviewsList: Review[];
}

const RESTAURANTS_MAP: { [key: string]: Restaurant } = {
  '1': {
    id: '1',
    name: 'Mama Kigali',
    cuisine: 'Rwandan',
    priceRange: '$',
    image: '🍲',
    rating: 4.8,
    reviews: 156,
    address: 'Kigali, Nyamirambo',
    phoneNumber: '+250 788 123 456',
    deliveryTime: '30-45 mins',
    minOrder: 5000,
    dishes: ['Ugali', 'Matoke', 'Beans & Plantains', 'Fried Fish', 'Chapati'],
    openingHours: '10:00 AM - 10:00 PM',
    description: 'Authentic Rwandan cuisine prepared with traditional recipes. Perfect for homesick students!',
    menu: [
      { id: '1', name: 'Ugali with Fish Stew', description: 'Traditional corn meal with spiced fish stew', price: 8500, category: 'Main Course', image: '🍲', popular: true },
      { id: '2', name: 'Matoke', description: 'Steamed plantains with peanut sauce', price: 7000, category: 'Main Course', image: '🥘', popular: true },
      { id: '3', name: 'Beans & Plantains', description: 'Mixed beans with fried plantains', price: 6500, category: 'Main Course', image: '🫘', popular: false },
    ],
    reviewsList: [
      { id: '1', author: 'John M.', avatar: '👨‍🎓', rating: 5, date: '2 days ago', text: 'Absolutely delicious! Tastes exactly like home.' },
      { id: '2', author: 'Marie D.', avatar: '👩‍🎓', rating: 5, date: '1 week ago', text: 'Best Rwandan food in Kigali for students!' },
    ],
  },
  // Add more restaurants following the same pattern...
};

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const restaurant = RESTAURANTS_MAP[params.id];

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
          <Link href="/food" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(restaurant.menu.map((item) => item.category))];
  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter((item) => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    const existing = cart.find((c) => c.item.id === item.id);
    if (existing) {
      setCart(cart.map((c) =>
        c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div></div>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
          >
            ← Back
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className="relative px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant Image */}
            <div className="md:col-span-1">
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-8xl">
                {restaurant.image}
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-lg text-gray-600 mb-4">
                {restaurant.cuisine} • {restaurant.priceRange}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-2xl font-bold text-gray-900">{restaurant.rating}</span>
                <span className="text-gray-600">({restaurant.reviews} reviews)</span>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Delivery Time</p>
                  <p className="font-semibold text-gray-900">⏱️ {restaurant.deliveryTime}</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Min Order</p>
                  <p className="font-semibold text-gray-900">{restaurant.minOrder.toLocaleString()} RWF</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  📞 {restaurant.phoneNumber}
                </button>
                <button className="flex-1 px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
                  📍 {restaurant.address}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu & Reviews */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="flex border-b">
                {['menu', 'reviews', 'about'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold transition capitalize ${
                      activeTab === tab
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'menu' && '🍽️ Menu'}
                    {tab === 'reviews' && '⭐ Reviews'}
                    {tab === 'about' && 'ℹ️ About'}
                  </button>
                ))}
              </div>

              {/* Menu Tab */}
              {activeTab === 'menu' && (
                <div className="p-6">
                  {/* Category Filter */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-4">
                    {filteredMenu.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                            {item.popular && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-2xl mb-2">{item.image}</div>
                          <p className="font-bold text-indigo-600 mb-2">
                            {item.price.toLocaleString()} RWF
                          </p>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="p-6">
                  <div className="space-y-6">
                    {restaurant.reviewsList.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-b-0">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{review.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{review.author}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-sm text-gray-600 ml-2">{review.rating}/5</span>
                            </div>
                            <p className="text-gray-700">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">About</h3>
                      <p className="text-gray-700">{restaurant.description}</p>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-2 text-gray-700">
                        <p>📍 {restaurant.address}</p>
                        <p>📞 {restaurant.phoneNumber}</p>
                        <p>🕐 {restaurant.openingHours}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">Popular Dishes</h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.dishes.map((dish, idx) => (
                          <span key={idx} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded">
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              {cartCount === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">🛒</p>
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.map((c) => (
                      <div key={c.item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-semibold text-gray-900">{c.item.name}</p>
                          <p className="text-sm text-gray-600">{(c.item.price * c.quantity).toLocaleString()} RWF</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCart(
                                cart
                                  .map((item) =>
                                    item.item.id === c.item.id
                                      ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                                      : item
                                  )
                                  .filter((item) => item.quantity > 0)
                              )
                            }
                            className="w-6 h-6 bg-red-100 text-red-600 rounded text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold">{c.quantity}</span>
                          <button
                            onClick={() =>
                              setCart(
                                cart.map((item) =>
                                  item.item.id === c.item.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                                )
                              )
                            }
                            className="w-6 h-6 bg-green-100 text-green-600 rounded text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">{cartTotal.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-indigo-600 mb-4">
                      <span>Total</span>
                      <span>{cartTotal.toLocaleString()} RWF</span>
                    </div>
                  </div>

                  <button
                    disabled={cartTotal < restaurant.minOrder}
                    className={`w-full px-4 py-3 font-semibold rounded-lg transition ${
                      cartTotal < restaurant.minOrder
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {cartTotal < restaurant.minOrder
                      ? `Add ${(restaurant.minOrder - cartTotal).toLocaleString()} more RWF`
                      : 'Place Order'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}