'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

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
}

const CUISINES = [
  'All',
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
];

const DUMMY_RESTAURANTS: Restaurant[] = [
  // Rwandan Restaurants
  { id: '1', name: 'Mama Kigali', cuisine: 'Rwandan', priceRange: '$', image: '🍲', rating: 4.8, reviews: 156, address: 'Kigali, Nyamirambo', phoneNumber: '+250 788 123 456', deliveryTime: '30-45 mins', minOrder: 5000, dishes: ['Ugali', 'Matoke', 'Beans & Plantains', 'Fried Fish', 'Chapati'], openingHours: '10:00 AM - 10:00 PM', description: 'Authentic Rwandan cuisine prepared with traditional recipes. Perfect for homesick students!' },
  { id: '2', name: 'Kigali Traditional', cuisine: 'Rwandan', priceRange: '$', image: '🍲', rating: 4.6, reviews: 98, address: 'Kigali, Gisozi', phoneNumber: '+250 788 234 567', deliveryTime: '25-40 mins', minOrder: 4500, dishes: ['Isombe', 'Ibitoke', 'Fish Stew', 'Cabbage'], openingHours: '9:00 AM - 9:00 PM', description: 'Traditional Rwandan home-cooked meals at affordable prices.' },
  { id: '3', name: 'Niyonzima Eats', cuisine: 'Rwandan', priceRange: '$', image: '🍲', rating: 4.5, reviews: 87, address: 'Kigali, Muhima', phoneNumber: '+250 788 345 678', deliveryTime: '35-50 mins', minOrder: 5500, dishes: ['Ukazi Soup', 'Plantain', 'Peas & Maize', 'Rice'], openingHours: '11:00 AM - 10:00 PM', description: 'Budget-friendly Rwandan comfort food.' },

  // Ethiopian Restaurants
  { id: '4', name: 'Ethiopian Flavors', cuisine: 'Ethiopian', priceRange: '$$', image: '🫔', rating: 4.9, reviews: 203, address: 'Kigali, Gisozi', phoneNumber: '+250 788 234 567', deliveryTime: '25-40 mins', minOrder: 8000, dishes: ['Injera', 'Misir Wot', 'Doro Wot', 'Tibs', 'Shiro'], openingHours: '11:00 AM - 11:00 PM', description: 'Traditional Ethiopian food served on injera with authentic spices and flavors.' },
  { id: '5', name: 'Addis Red Sea', cuisine: 'Ethiopian', priceRange: '$$', image: '🫔', rating: 4.7, reviews: 145, address: 'Kigali, Remera', phoneNumber: '+250 788 456 789', deliveryTime: '30-45 mins', minOrder: 7500, dishes: ['Kitfo', 'Doro Alecha', 'Gomen', 'Teff Bread'], openingHours: '12:00 PM - 11:00 PM', description: 'Authentic Ethiopian spices and coastal seafood dishes.' },
  { id: '6', name: 'Axum Ethiopian', cuisine: 'Ethiopian', priceRange: '$$', image: '🫔', rating: 4.4, reviews: 112, address: 'Kigali, Kacyiru', phoneNumber: '+250 788 567 890', deliveryTime: '28-42 mins', minOrder: 8500, dishes: ['Tibs', 'Misir', 'Shiro', 'Wat'], openingHours: '11:00 AM - 10:00 PM', description: 'Premium Ethiopian dining experience.' },

  // Nigerian Restaurants
  { id: '7', name: 'Nigerian Express', cuisine: 'Nigerian', priceRange: '$$', image: '🍗', rating: 4.7, reviews: 89, address: 'Kigali, Remera', phoneNumber: '+250 788 345 678', deliveryTime: '35-50 mins', minOrder: 7000, dishes: ['Jollof Rice', 'Suya', 'Pounded Yam', 'Egusi Soup', 'Fried Plantains'], openingHours: '12:00 PM - 10:00 PM', description: 'Spicy and flavorful Nigerian dishes that bring the heat and taste of Lagos to Kigali.' },
  { id: '8', name: 'Lagos Kitchen', cuisine: 'Nigerian', priceRange: '$$', image: '🍗', rating: 4.6, reviews: 134, address: 'Kigali, Muhima', phoneNumber: '+250 788 678 901', deliveryTime: '40-55 mins', minOrder: 6800, dishes: ['Pepper Soup', 'Chin Chin', 'Moi Moi', 'Rice & Beans'], openingHours: '1:00 PM - 11:00 PM', description: 'Authentic Nigerian street food and home-cooked meals.' },
  { id: '9', name: 'Naija Spice', cuisine: 'Nigerian', priceRange: '$', image: '🍗', rating: 4.5, reviews: 76, address: 'Kigali, Gisozi', phoneNumber: '+250 788 789 012', deliveryTime: '35-48 mins', minOrder: 5500, dishes: ['Garri & Soup', 'Akamu', 'Fufu', 'Fried Rice'], openingHours: '11:00 AM - 9:00 PM', description: 'Budget-friendly Nigerian classics.' },

  // Kenyan Restaurants
  { id: '10', name: 'Nairobi Kitchen', cuisine: 'Kenyan', priceRange: '$', image: '🥘', rating: 4.6, reviews: 142, address: 'Kigali, Muhima', phoneNumber: '+250 788 456 789', deliveryTime: '20-35 mins', minOrder: 6000, dishes: ['Ugali', 'Nyama Choma', 'Sukuma Wiki', 'Mandazi', 'Beans'], openingHours: '9:00 AM - 11:00 PM', description: 'Authentic Kenyan favorites from the streets of Nairobi delivered to your door.' },
  { id: '11', name: 'Nairobi Grill', cuisine: 'Kenyan', priceRange: '$$', image: '🥘', rating: 4.7, reviews: 168, address: 'Kigali, Kacyiru', phoneNumber: '+250 788 890 123', deliveryTime: '25-40 mins', minOrder: 8000, dishes: ['Grilled Meat', 'Irio', 'Githeri', 'Kachumbari'], openingHours: '12:00 PM - 11:00 PM', description: 'Premium Kenyan grilled meats and sides.' },
  { id: '12', name: 'Kenya Bites', cuisine: 'Kenyan', priceRange: '$', image: '🥘', rating: 4.4, reviews: 95, address: 'Kigali, Remera', phoneNumber: '+250 788 901 234', deliveryTime: '22-38 mins', minOrder: 5500, dishes: ['Posho', 'Greens', 'Fish', 'Chapati'], openingHours: '10:00 AM - 10:00 PM', description: 'Affordable Kenyan comfort food.' },

  // Tanzanian Restaurants
  { id: '13', name: 'Dar Es Salaam Taste', cuisine: 'Tanzanian', priceRange: '$', image: '🍛', rating: 4.5, reviews: 76, address: 'Kigali, Kacyiru', phoneNumber: '+250 788 567 890', deliveryTime: '30-45 mins', minOrder: 6500, dishes: ['Pilau', 'Urojo', 'Ndizi', 'Wali wa Kumimina', 'Mishkaki'], openingHours: '11:00 AM - 10:00 PM', description: 'Traditional Tanzanian dishes with coastal and mainland flavors.' },
  { id: '14', name: 'Zanzibar Spice', cuisine: 'Tanzanian', priceRange: '$$', image: '🍛', rating: 4.6, reviews: 110, address: 'Kigali, Muhima', phoneNumber: '+250 788 012 345', deliveryTime: '32-47 mins', minOrder: 7200, dishes: ['Seafood Pilau', 'Urojo', 'Coconut Rice', 'Grilled Fish'], openingHours: '12:00 PM - 11:00 PM', description: 'Coastal Tanzanian seafood specialties.' },
  { id: '15', name: 'Tanzania Eats', cuisine: 'Tanzanian', priceRange: '$', image: '🍛', rating: 4.3, reviews: 65, address: 'Kigali, Gisozi', phoneNumber: '+250 788 123 456', deliveryTime: '28-43 mins', minOrder: 6000, dishes: ['Ugali', 'Beans', 'Greens', 'Fried Potatoes'], openingHours: '10:00 AM - 9:00 PM', description: 'Traditional Tanzanian home meals.' },

  // Ugandan Restaurants
  { id: '16', name: 'Kampala Bites', cuisine: 'Ugandan', priceRange: '$', image: '🍳', rating: 4.4, reviews: 98, address: 'Kigali, Gisozi', phoneNumber: '+250 788 678 901', deliveryTime: '25-40 mins', minOrder: 5500, dishes: ['Matoke', 'Rolex', 'Posho', 'Groundnut Soup', 'Fried Tilapia'], openingHours: '10:00 AM - 10:00 PM', description: 'Hearty Ugandan comfort food that students love. Great portions and affordable prices.' },
  { id: '17', name: 'Kampala Kitchen', cuisine: 'Ugandan', priceRange: '$', image: '🍳', rating: 4.5, reviews: 88, address: 'Kigali, Remera', phoneNumber: '+250 788 789 012', deliveryTime: '27-42 mins', minOrder: 5800, dishes: ['Luwombo', 'Beans & Maize', 'Cassava', 'Fish'], openingHours: '11:00 AM - 10:00 PM', description: 'Authentic Ugandan traditional cooking.' },
  { id: '18', name: 'Kampala Express', cuisine: 'Ugandan', priceRange: '$', image: '🍳', rating: 4.2, reviews: 72, address: 'Kigali, Muhima', phoneNumber: '+250 788 890 123', deliveryTime: '24-39 mins', minOrder: 5200, dishes: ['G-Nut', 'Porridge', 'Bread', 'Boiled Eggs'], openingHours: '9:00 AM - 9:00 PM', description: 'Quick & affordable Ugandan breakfasts.' },

  // South African Restaurants
  { id: '19', name: 'Joburg South African', cuisine: 'South African', priceRange: '$$', image: '🥩', rating: 4.8, reviews: 127, address: 'Kigali, Remera', phoneNumber: '+250 788 789 012', deliveryTime: '35-50 mins', minOrder: 10000, dishes: ['Braai', 'Boerewors', 'Bobotie', 'Sosaties', 'Pap'], openingHours: '12:00 PM - 11:00 PM', description: 'South African BBQ and traditional dishes from Johannesburg. Premium quality meat.' },
  { id: '20', name: 'Cape Town Grill', cuisine: 'South African', priceRange: '$$$', image: '🥩', rating: 4.9, reviews: 156, address: 'Kigali, Kacyiru', phoneNumber: '+250 788 901 234', deliveryTime: '38-53 mins', minOrder: 12000, dishes: ['Wagyu Beef', 'Lamb Chops', 'Biltong', 'Sausages'], openingHours: '1:00 PM - 11:00 PM', description: 'Premium South African steakhouse experience.' },

  // West African Restaurants
  { id: '21', name: 'West African Hub', cuisine: 'West African', priceRange: '$$', image: '🥗', rating: 4.5, reviews: 112, address: 'Kigali, Muhima', phoneNumber: '+250 788 890 123', deliveryTime: '40-55 mins', minOrder: 8500, dishes: ['Fufu', 'Gumbo', 'Moin Moin', 'Chin Chin', 'Peanut Soup'], openingHours: '11:00 AM - 10:00 PM', description: 'Diverse West African cuisine from multiple countries. Rich, flavorful, and authentic.' },
  { id: '22', name: 'Accra Kitchen', cuisine: 'West African', priceRange: '$', image: '🥗', rating: 4.4, reviews: 89, address: 'Kigali, Gisozi', phoneNumber: '+250 788 012 345', deliveryTime: '35-50 mins', minOrder: 6500, dishes: ['Jollof', 'Waakye', 'Banku', 'Fried Fish'], openingHours: '12:00 PM - 10:00 PM', description: 'Authentic West African street food.' },
  { id: '23', name: 'Dakar Eats', cuisine: 'West African', priceRange: '$$', image: '🥗', rating: 4.6, reviews: 124, address: 'Kigali, Remera', phoneNumber: '+250 788 123 456', deliveryTime: '38-52 mins', minOrder: 7800, dishes: ['Thieboudienne', 'Yassa', 'Akara', 'Bissap'], openingHours: '11:00 AM - 11:00 PM', description: 'Senegalese & West African specialties.' },

  // East African Mixed
  { id: '24', name: 'East Africa Fusion', cuisine: 'East African', priceRange: '$$', image: '🍛', rating: 4.7, reviews: 134, address: 'Kigali, Kacyiru', phoneNumber: '+250 788 234 567', deliveryTime: '30-45 mins', minOrder: 7000, dishes: ['Mixed Pilau', 'Sukuma', 'Matoke', 'Rice'], openingHours: '11:00 AM - 11:00 PM', description: 'Best of East African cuisine combined.' },

  // Other Cuisines
  { id: '25', name: 'Taj Indian', cuisine: 'Indian', priceRange: '$$', image: '🍛', rating: 4.5, reviews: 98, address: 'Kigali, Muhima', phoneNumber: '+250 788 345 678', deliveryTime: '32-47 mins', minOrder: 7500, dishes: ['Biryani', 'Samosa', 'Naan', 'Curry'], openingHours: '12:00 PM - 11:00 PM', description: 'Authentic Indian cuisine.' },
  { id: '26', name: 'Pizza Palace', cuisine: 'Italian', priceRange: '$$', image: '🍕', rating: 4.6, reviews: 145, address: 'Kigali, Gisozi', phoneNumber: '+250 788 456 789', deliveryTime: '25-40 mins', minOrder: 6000, dishes: ['Margherita', 'Pepperoni', 'Pasta', 'Risotto'], openingHours: '11:00 AM - 11:00 PM', description: 'Italian pizzeria and pasta restaurant.' },
  { id: '27', name: 'Golden Dragon', cuisine: 'Chinese', priceRange: '$', image: '🥡', rating: 4.4, reviews: 112, address: 'Kigali, Remera', phoneNumber: '+250 788 567 890', deliveryTime: '28-43 mins', minOrder: 5500, dishes: ['Fried Rice', 'Chow Mein', 'Spring Rolls', 'Sweet & Sour'], openingHours: '12:00 PM - 10:00 PM', description: 'Chinese takeout favorites.' },
  { id: '28', name: 'Fast Burger', cuisine: 'Fast Food', priceRange: '$', image: '🍔', rating: 4.3, reviews: 167, address: 'Kigali, Muhima', phoneNumber: '+250 788 678 901', deliveryTime: '15-25 mins', minOrder: 4500, dishes: ['Burgers', 'Fries', 'Chicken', 'Milkshakes'], openingHours: '9:00 AM - 11:00 PM', description: 'Quick & delicious fast food.' },
];

export default function FoodPage() {
  const router = useRouter();
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredRestaurants = useMemo(() => {
    return DUMMY_RESTAURANTS.filter((restaurant) => {
      const matchCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const avgDishPrice = restaurant.minOrder / 2;
      const matchPrice = selectedPriceRange === 'All' && avgDishPrice >= minPrice && avgDishPrice <= maxPrice;
      const matchSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCuisine && matchPrice && matchSearch;
    }).sort((a, b) => b.rating - a.rating);
  }, [selectedCuisine, selectedPriceRange, minPrice, maxPrice, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <input
            type="text"
            placeholder="Search restaurants by name or cuisine (Rwandan, Ethiopian, Nigerian...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
          />
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

              {/* Cuisine Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Cuisine Type
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {CUISINES.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCuisine === cuisine
                          ? 'bg-indigo-100 text-indigo-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mb-6 pb-6 border-b">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Budget Range
                </label>
                
                <div className="bg-indigo-50 p-3 rounded-lg mb-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Min - Max</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} RWF
                  </p>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-gray-600 mb-2 block">Min Price</label>
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={minPrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val <= maxPrice) setMinPrice(val);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-right">
                    {minPrice.toLocaleString()} RWF
                  </p>
                </div>

                <div className="mb-3">
                  <label className="text-xs text-gray-600 mb-2 block">Max Price</label>
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= minPrice) setMaxPrice(val);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-right">
                    {maxPrice.toLocaleString()} RWF
                  </p>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 RWF</span>
                  <span>15K RWF</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCuisine('All');
                  setSelectedPriceRange('All');
                  setMinPrice(0);
                  setMaxPrice(15000);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Restaurants Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Restaurants & Eateries
              </h2>
              <p className="text-gray-600">
                {filteredRestaurants.length} restaurants available
              </p>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Restaurants Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search for a different cuisine
                </p>
                <button
                  onClick={() => {
                    setSelectedCuisine('All');
                    setSelectedPriceRange('All');
                    setSearchTerm('');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/food/${restaurant.id}`)}
                  >
                    {/* Restaurant Image */}
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
                      {restaurant.image}
                    </div>

                    {/* Restaurant Info */}
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {restaurant.cuisine} • {restaurant.priceRange}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {restaurant.description}
                      </p>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="font-bold text-gray-900">{restaurant.rating}</span>
                        <span className="text-sm text-gray-600">
                          ({restaurant.reviews} reviews)
                        </span>
                      </div>

                      {/* Delivery Info */}
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                        <div>⏱️ {restaurant.deliveryTime}</div>
                        <div>📍 {restaurant.address}</div>
                      </div>

                      {/* Min Order */}
                      <div className="text-sm text-gray-600 mb-3">
                        Min order: {restaurant.minOrder.toLocaleString()} RWF
                      </div>

                      {/* Dishes Preview */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Popular dishes:</p>
                        <div className="flex flex-wrap gap-1">
                          {restaurant.dishes.slice(0, 3).map((dish, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                            >
                              {dish}
                            </span>
                          ))}
                          {restaurant.dishes.length > 3 && (
                            <span className="text-xs text-gray-600">
                              +{restaurant.dishes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition">
                          View Menu
                        </button>
                        <button className="px-3 py-2 border-2 border-indigo-600 text-indigo-600 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition">
                          Call
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
