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
  '2': {
    id: '2',
    name: 'Kigali Traditional',
    cuisine: 'Rwandan',
    priceRange: '$',
    image: '🍲',
    rating: 4.6,
    reviews: 98,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 234 567',
    deliveryTime: '25-40 mins',
    minOrder: 4500,
    dishes: ['Isombe', 'Ibitoke', 'Fish Stew', 'Cabbage'],
    openingHours: '9:00 AM - 9:00 PM',
    description: 'Traditional Rwandan home-cooked meals at affordable prices.',
    menu: [
      { id: '1', name: 'Isombe', description: 'Cassava leaves with tomato sauce', price: 6000, category: 'Main Course', image: '🍲', popular: true },
      { id: '2', name: 'Fish Stew', description: 'Fresh fish in spiced tomato gravy', price: 7500, category: 'Main Course', image: '🍲', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Alex T.', avatar: '👨‍🎓', rating: 4, date: '3 days ago', text: 'Great authentic taste at good prices!' },
    ],
  },
  '3': {
    id: '3',
    name: 'Niyonzima Eats',
    cuisine: 'Rwandan',
    priceRange: '$',
    image: '🍲',
    rating: 4.5,
    reviews: 87,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 345 678',
    deliveryTime: '35-50 mins',
    minOrder: 5500,
    dishes: ['Ukazi Soup', 'Plantain', 'Peas & Maize', 'Rice'],
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Budget-friendly Rwandan comfort food.',
    menu: [
      { id: '1', name: 'Ukazi Soup', description: 'Okra soup with local vegetables', price: 5500, category: 'Soup', image: '🍲', popular: true },
      { id: '2', name: 'Plantain', description: 'Fried plantains with beans', price: 4500, category: 'Main Course', image: '🥘', popular: false },
    ],
    reviewsList: [
      { id: '1', author: 'Sarah N.', avatar: '👩‍🎓', rating: 4, date: '1 week ago', text: 'Affordable and delicious!' },
    ],
  },
  '4': {
    id: '4',
    name: 'Ethiopian Flavors',
    cuisine: 'Ethiopian',
    priceRange: '$$',
    image: '🫔',
    rating: 4.9,
    reviews: 203,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 234 567',
    deliveryTime: '25-40 mins',
    minOrder: 8000,
    dishes: ['Injera', 'Misir Wot', 'Doro Wot', 'Tibs', 'Shiro'],
    openingHours: '11:00 AM - 11:00 PM',
    description: 'Traditional Ethiopian food served on injera with authentic spices and flavors.',
    menu: [
      { id: '1', name: 'Misir Wot', description: 'Red lentil stew with spices', price: 9000, category: 'Main Course', image: '🫔', popular: true },
      { id: '2', name: 'Doro Wot', description: 'Chicken stew with Ethiopian spices', price: 10500, category: 'Main Course', image: '🍗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'David K.', avatar: '👨‍🎓', rating: 5, date: '2 days ago', text: 'Most authentic Ethiopian food I have found!' },
    ],
  },
  '5': {
    id: '5',
    name: 'Addis Red Sea',
    cuisine: 'Ethiopian',
    priceRange: '$$',
    image: '🫔',
    rating: 4.7,
    reviews: 145,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 456 789',
    deliveryTime: '30-45 mins',
    minOrder: 7500,
    dishes: ['Kitfo', 'Doro Alecha', 'Gomen', 'Teff Bread'],
    openingHours: '12:00 PM - 11:00 PM',
    description: 'Authentic Ethiopian spices and coastal seafood dishes.',
    menu: [
      { id: '1', name: 'Kitfo', description: 'Raw minced beef with spices', price: 9500, category: 'Main Course', image: '🫔', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Emma L.', avatar: '👩‍🎓', rating: 5, date: '5 days ago', text: 'Incredible flavors!' },
    ],
  },
  '6': {
    id: '6',
    name: 'Axum Ethiopian',
    cuisine: 'Ethiopian',
    priceRange: '$$',
    image: '🫔',
    rating: 4.4,
    reviews: 112,
    address: 'Kigali, Kacyiru',
    phoneNumber: '+250 788 567 890',
    deliveryTime: '28-42 mins',
    minOrder: 8500,
    dishes: ['Tibs', 'Misir', 'Shiro', 'Wat'],
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Premium Ethiopian dining experience.',
    menu: [
      { id: '1', name: 'Tibs', description: 'Sautéed meat with vegetables', price: 10000, category: 'Main Course', image: '🫔', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'James P.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Premium quality Ethiopian food.' },
    ],
  },
  '7': {
    id: '7',
    name: 'Nigerian Express',
    cuisine: 'Nigerian',
    priceRange: '$$',
    image: '🍗',
    rating: 4.7,
    reviews: 89,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 345 678',
    deliveryTime: '35-50 mins',
    minOrder: 7000,
    dishes: ['Jollof Rice', 'Suya', 'Pounded Yam', 'Egusi Soup', 'Fried Plantains'],
    openingHours: '12:00 PM - 10:00 PM',
    description: 'Spicy and flavorful Nigerian dishes that bring the heat and taste of Lagos to Kigali.',
    menu: [
      { id: '1', name: 'Jollof Rice', description: 'Spiced rice with tomato sauce', price: 8500, category: 'Main Course', image: '🍗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Chidi O.', avatar: '👨‍🎓', rating: 5, date: '3 days ago', text: 'Tastes like home! Perfect spicing.' },
    ],
  },
  '8': {
    id: '8',
    name: 'Lagos Kitchen',
    cuisine: 'Nigerian',
    priceRange: '$$',
    image: '🍗',
    rating: 4.6,
    reviews: 134,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 678 901',
    deliveryTime: '40-55 mins',
    minOrder: 6800,
    dishes: ['Pepper Soup', 'Chin Chin', 'Moi Moi', 'Rice & Beans'],
    openingHours: '1:00 PM - 11:00 PM',
    description: 'Authentic Nigerian street food and home-cooked meals.',
    menu: [
      { id: '1', name: 'Pepper Soup', description: 'Spiced broth with meat', price: 7500, category: 'Soup', image: '🍗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Ngozi A.', avatar: '👩‍🎓', rating: 4, date: '4 days ago', text: 'Authentic Lagos street food!' },
    ],
  },
  '9': {
    id: '9',
    name: 'Naija Spice',
    cuisine: 'Nigerian',
    priceRange: '$',
    image: '🍗',
    rating: 4.5,
    reviews: 76,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 789 012',
    deliveryTime: '35-48 mins',
    minOrder: 5500,
    dishes: ['Garri & Soup', 'Akamu', 'Fufu', 'Fried Rice'],
    openingHours: '11:00 AM - 9:00 PM',
    description: 'Budget-friendly Nigerian classics.',
    menu: [
      { id: '1', name: 'Garri & Soup', description: 'Cassava pudding with soup', price: 5500, category: 'Main Course', image: '🍗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Tunde B.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Budget-friendly and tasty!' },
    ],
  },
  '10': {
    id: '10',
    name: 'Nairobi Kitchen',
    cuisine: 'Kenyan',
    priceRange: '$',
    image: '🥘',
    rating: 4.6,
    reviews: 142,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 456 789',
    deliveryTime: '20-35 mins',
    minOrder: 6000,
    dishes: ['Ugali', 'Nyama Choma', 'Sukuma Wiki', 'Mandazi', 'Beans'],
    openingHours: '9:00 AM - 11:00 PM',
    description: 'Authentic Kenyan favorites from the streets of Nairobi delivered to your door.',
    menu: [
      { id: '1', name: 'Nyama Choma', description: 'Grilled meat with charcoal', price: 8000, category: 'Main Course', image: '🥘', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Kamau J.', avatar: '👨‍🎓', rating: 5, date: '2 days ago', text: 'Tastes exactly like Nairobi!' },
    ],
  },
  '11': {
    id: '11',
    name: 'Nairobi Grill',
    cuisine: 'Kenyan',
    priceRange: '$$',
    image: '🥘',
    rating: 4.7,
    reviews: 168,
    address: 'Kigali, Kacyiru',
    phoneNumber: '+250 788 890 123',
    deliveryTime: '25-40 mins',
    minOrder: 8000,
    dishes: ['Grilled Meat', 'Irio', 'Githeri', 'Kachumbari'],
    openingHours: '12:00 PM - 11:00 PM',
    description: 'Premium Kenyan grilled meats and sides.',
    menu: [
      { id: '1', name: 'Grilled Meat', description: 'Premium cuts of beef grilled to perfection', price: 12000, category: 'Main Course', image: '🥘', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Wanjiru M.', avatar: '👩‍🎓', rating: 5, date: '3 days ago', text: 'Premium quality grilled meat!' },
    ],
  },
  '12': {
    id: '12',
    name: 'Kenya Bites',
    cuisine: 'Kenyan',
    priceRange: '$',
    image: '🥘',
    rating: 4.4,
    reviews: 95,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 901 234',
    deliveryTime: '22-38 mins',
    minOrder: 5500,
    dishes: ['Posho', 'Greens', 'Fish', 'Chapati'],
    openingHours: '10:00 AM - 10:00 PM',
    description: 'Affordable Kenyan comfort food.',
    menu: [
      { id: '1', name: 'Posho', description: 'Cornmeal with greens and beans', price: 5500, category: 'Main Course', image: '🥘', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Peter O.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Great value for money!' },
    ],
  },
  '13': {
    id: '13',
    name: 'Dar Es Salaam Taste',
    cuisine: 'Tanzanian',
    priceRange: '$',
    image: '🍛',
    rating: 4.5,
    reviews: 76,
    address: 'Kigali, Kacyiru',
    phoneNumber: '+250 788 567 890',
    deliveryTime: '30-45 mins',
    minOrder: 6500,
    dishes: ['Pilau', 'Urojo', 'Ndizi', 'Wali wa Kumimina', 'Mishkaki'],
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Traditional Tanzanian dishes with coastal and mainland flavors.',
    menu: [
      { id: '1', name: 'Pilau', description: 'Spiced rice with meat', price: 7500, category: 'Main Course', image: '🍛', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Amina H.', avatar: '👩‍🎓', rating: 4, date: '5 days ago', text: 'Authentic Tanzanian flavors!' },
    ],
  },
  '14': {
    id: '14',
    name: 'Zanzibar Spice',
    cuisine: 'Tanzanian',
    priceRange: '$$',
    image: '🍛',
    rating: 4.6,
    reviews: 110,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 012 345',
    deliveryTime: '32-47 mins',
    minOrder: 7200,
    dishes: ['Seafood Pilau', 'Urojo', 'Coconut Rice', 'Grilled Fish'],
    openingHours: '12:00 PM - 11:00 PM',
    description: 'Coastal Tanzanian seafood specialties.',
    menu: [
      { id: '1', name: 'Seafood Pilau', description: 'Rice with seafood and spices', price: 9000, category: 'Main Course', image: '🍛', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Zakia R.', avatar: '👩‍🎓', rating: 5, date: '2 days ago', text: 'Fresh seafood at its best!' },
    ],
  },
  '15': {
    id: '15',
    name: 'Tanzania Eats',
    cuisine: 'Tanzanian',
    priceRange: '$',
    image: '🍛',
    rating: 4.3,
    reviews: 65,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 123 456',
    deliveryTime: '28-43 mins',
    minOrder: 6000,
    dishes: ['Ugali', 'Beans', 'Greens', 'Fried Potatoes'],
    openingHours: '10:00 AM - 9:00 PM',
    description: 'Traditional Tanzanian home meals.',
    menu: [
      { id: '1', name: 'Ugali', description: 'Cornmeal with beans and vegetables', price: 6000, category: 'Main Course', image: '🍛', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Juma S.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Home-style cooking at its best!' },
    ],
  },
  '16': {
    id: '16',
    name: 'Kampala Bites',
    cuisine: 'Ugandan',
    priceRange: '$',
    image: '🍳',
    rating: 4.4,
    reviews: 98,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 678 901',
    deliveryTime: '25-40 mins',
    minOrder: 5500,
    dishes: ['Matoke', 'Rolex', 'Posho', 'Groundnut Soup', 'Fried Tilapia'],
    openingHours: '10:00 AM - 10:00 PM',
    description: 'Hearty Ugandan comfort food that students love. Great portions and affordable prices.',
    menu: [
      { id: '1', name: 'Rolex', description: 'Rolled chapati with eggs and vegetables', price: 5000, category: 'Snack', image: '🍳', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Brian U.', avatar: '👨‍🎓', rating: 4, date: '3 days ago', text: 'Great portions, affordable prices!' },
    ],
  },
  '17': {
    id: '17',
    name: 'Kampala Kitchen',
    cuisine: 'Ugandan',
    priceRange: '$',
    image: '🍳',
    rating: 4.5,
    reviews: 88,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 789 012',
    deliveryTime: '27-42 mins',
    minOrder: 5800,
    dishes: ['Luwombo', 'Beans & Maize', 'Cassava', 'Fish'],
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Authentic Ugandan traditional cooking.',
    menu: [
      { id: '1', name: 'Luwombo', description: 'Banana and meat stew', price: 7000, category: 'Main Course', image: '🍳', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Grace M.', avatar: '👩‍🎓', rating: 5, date: '4 days ago', text: 'Authentic traditional cooking!' },
    ],
  },
  '18': {
    id: '18',
    name: 'Kampala Express',
    cuisine: 'Ugandan',
    priceRange: '$',
    image: '🍳',
    rating: 4.2,
    reviews: 72,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 890 123',
    deliveryTime: '24-39 mins',
    minOrder: 5200,
    dishes: ['G-Nut', 'Porridge', 'Bread', 'Boiled Eggs'],
    openingHours: '9:00 AM - 9:00 PM',
    description: 'Quick & affordable Ugandan breakfasts.',
    menu: [
      { id: '1', name: 'G-Nut Porridge', description: 'Groundnut porridge with bread', price: 4500, category: 'Breakfast', image: '🍳', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Robert N.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Perfect for quick breakfast!' },
    ],
  },
  '19': {
    id: '19',
    name: 'Joburg South African',
    cuisine: 'South African',
    priceRange: '$$',
    image: '🥩',
    rating: 4.8,
    reviews: 127,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 789 012',
    deliveryTime: '35-50 mins',
    minOrder: 10000,
    dishes: ['Braai', 'Boerewors', 'Bobotie', 'Sosaties', 'Pap'],
    openingHours: '12:00 PM - 11:00 PM',
    description: 'South African BBQ and traditional dishes from Johannesburg. Premium quality meat.',
    menu: [
      { id: '1', name: 'Braai Platter', description: 'Premium grilled meats', price: 15000, category: 'Main Course', image: '🥩', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Thabo M.', avatar: '👨‍🎓', rating: 5, date: '2 days ago', text: 'Premium South African BBQ!' },
    ],
  },
  '20': {
    id: '20',
    name: 'Cape Town Grill',
    cuisine: 'South African',
    priceRange: '$$$',
    image: '🥩',
    rating: 4.9,
    reviews: 156,
    address: 'Kigali, Kacyiru',
    phoneNumber: '+250 788 901 234',
    deliveryTime: '38-53 mins',
    minOrder: 12000,
    dishes: ['Wagyu Beef', 'Lamb Chops', 'Biltong', 'Sausages'],
    openingHours: '1:00 PM - 11:00 PM',
    description: 'Premium South African steakhouse experience.',
    menu: [
      { id: '1', name: 'Wagyu Steak', description: 'Premium Wagyu beef steak', price: 18000, category: 'Main Course', image: '🥩', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Sipho L.', avatar: '👨‍🎓', rating: 5, date: '1 day ago', text: 'Premium steakhouse experience!' },
    ],
  },
  '21': {
    id: '21',
    name: 'West African Hub',
    cuisine: 'West African',
    priceRange: '$$',
    image: '🥗',
    rating: 4.5,
    reviews: 112,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 890 123',
    deliveryTime: '40-55 mins',
    minOrder: 8500,
    dishes: ['Fufu', 'Gumbo', 'Moin Moin', 'Chin Chin', 'Peanut Soup'],
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Diverse West African cuisine from multiple countries. Rich, flavorful, and authentic.',
    menu: [
      { id: '1', name: 'Fufu', description: 'Pounded plantains and cassava', price: 8500, category: 'Main Course', image: '🥗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Kofi A.', avatar: '👨‍🎓', rating: 5, date: '3 days ago', text: 'Authentic West African food!' },
    ],
  },
  '22': {
    id: '22',
    name: 'Accra Kitchen',
    cuisine: 'West African',
    priceRange: '$',
    image: '🥗',
    rating: 4.4,
    reviews: 89,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 012 345',
    deliveryTime: '35-50 mins',
    minOrder: 6500,
    dishes: ['Jollof', 'Waakye', 'Banku', 'Fried Fish'],
    openingHours: '12:00 PM - 10:00 PM',
    description: 'Authentic West African street food.',
    menu: [
      { id: '1', name: 'Waakye', description: 'Rice and beans street food', price: 6500, category: 'Main Course', image: '🥗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Ama B.', avatar: '👩‍🎓', rating: 4, date: '1 week ago', text: 'Authentic street food!' },
    ],
  },
  '23': {
    id: '23',
    name: 'Dakar Eats',
    cuisine: 'West African',
    priceRange: '$$',
    image: '🥗',
    rating: 4.6,
    reviews: 124,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 123 456',
    deliveryTime: '38-52 mins',
    minOrder: 7800,
    dishes: ['Thieboudienne', 'Yassa', 'Akara', 'Bissap'],
    openingHours: '11:00 AM - 11:00 PM',
    description: 'Senegalese & West African specialties.',
    menu: [
      { id: '1', name: 'Thieboudienne', description: 'Fish and rice Senegalese style', price: 9000, category: 'Main Course', image: '🥗', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Fatou D.', avatar: '👩‍🎓', rating: 5, date: '2 days ago', text: 'Authentic Senegalese cooking!' },
    ],
  },
  '24': {
    id: '24',
    name: 'East Africa Fusion',
    cuisine: 'East African',
    priceRange: '$$',
    image: '🍛',
    rating: 4.7,
    reviews: 134,
    address: 'Kigali, Kacyiru',
    phoneNumber: '+250 788 234 567',
    deliveryTime: '30-45 mins',
    minOrder: 7000,
    dishes: ['Mixed Pilau', 'Sukuma', 'Matoke', 'Rice'],
    openingHours: '11:00 AM - 11:00 PM',
    description: 'Best of East African cuisine combined.',
    menu: [
      { id: '1', name: 'East African Pilau', description: 'Mixed East African rice blend', price: 8500, category: 'Main Course', image: '🍛', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Hassan I.', avatar: '👨‍🎓', rating: 5, date: '3 days ago', text: 'Best fusion of East African cuisines!' },
    ],
  },
  '25': {
    id: '25',
    name: 'Taj Indian',
    cuisine: 'Indian',
    priceRange: '$$',
    image: '🍛',
    rating: 4.5,
    reviews: 98,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 345 678',
    deliveryTime: '32-47 mins',
    minOrder: 7500,
    dishes: ['Biryani', 'Samosa', 'Naan', 'Curry'],
    openingHours: '12:00 PM - 11:00 PM',
    description: 'Authentic Indian cuisine.',
    menu: [
      { id: '1', name: 'Biryani', description: 'Fragrant rice with meat', price: 9000, category: 'Main Course', image: '🍛', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Rajesh V.', avatar: '👨‍🎓', rating: 4, date: '4 days ago', text: 'Authentic Indian flavors!' },
    ],
  },
  '26': {
    id: '26',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    priceRange: '$$',
    image: '🍕',
    rating: 4.6,
    reviews: 145,
    address: 'Kigali, Gisozi',
    phoneNumber: '+250 788 456 789',
    deliveryTime: '25-40 mins',
    minOrder: 6000,
    dishes: ['Margherita', 'Pepperoni', 'Pasta', 'Risotto'],
    openingHours: '11:00 AM - 11:00 PM',
    description: 'Italian pizzeria and pasta restaurant.',
    menu: [
      { id: '1', name: 'Margherita Pizza', description: 'Classic Italian pizza', price: 8000, category: 'Pizza', image: '🍕', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Marco G.', avatar: '👨‍🎓', rating: 5, date: '2 days ago', text: 'Authentic Italian pizza!' },
    ],
  },
  '27': {
    id: '27',
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    priceRange: '$',
    image: '🥡',
    rating: 4.4,
    reviews: 112,
    address: 'Kigali, Remera',
    phoneNumber: '+250 788 567 890',
    deliveryTime: '28-43 mins',
    minOrder: 5500,
    dishes: ['Fried Rice', 'Chow Mein', 'Spring Rolls', 'Sweet & Sour'],
    openingHours: '12:00 PM - 10:00 PM',
    description: 'Chinese takeout favorites.',
    menu: [
      { id: '1', name: 'Fried Rice', description: 'Classic Chinese fried rice', price: 6500, category: 'Main Course', image: '🥡', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Wei C.', avatar: '👨‍🎓', rating: 4, date: '1 week ago', text: 'Good Chinese takeout!' },
    ],
  },
  '28': {
    id: '28',
    name: 'Fast Burger',
    cuisine: 'Fast Food',
    priceRange: '$',
    image: '🍔',
    rating: 4.3,
    reviews: 167,
    address: 'Kigali, Muhima',
    phoneNumber: '+250 788 678 901',
    deliveryTime: '15-25 mins',
    minOrder: 4500,
    dishes: ['Burgers', 'Fries', 'Chicken', 'Milkshakes'],
    openingHours: '9:00 AM - 11:00 PM',
    description: 'Quick & delicious fast food.',
    menu: [
      { id: '1', name: 'Classic Burger', description: 'Beef burger with lettuce and tomato', price: 5000, category: 'Burger', image: '🍔', popular: true },
    ],
    reviewsList: [
      { id: '1', author: 'Tom F.', avatar: '👨‍🎓', rating: 4, date: '2 days ago', text: 'Quick and tasty burgers!' },
    ],
  },
};

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const restaurant = RESTAURANTS_MAP[params.id];
  
  const [activeTab, setActiveTab] = useState('reviews');
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [reviews, setReviews] = useState<Review[]>(restaurant?.reviewsList || []);

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

  const handleSubmitReview = () => {
    if (newReview.text.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        author: 'You',
        avatar: '👤',
        rating: newReview.rating,
        date: 'just now',
        text: newReview.text,
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, text: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div></div>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant Image */}
            <div className="md:col-span-1">
              <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-6xl sm:text-8xl">
                {restaurant.image}
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="md:col-span-2">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                {restaurant.cuisine} • {restaurant.priceRange}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl sm:text-2xl text-yellow-400">★</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">{restaurant.rating}</span>
                <span className="text-sm text-gray-600">({restaurant.reviews} reviews)</span>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Delivery Time</p>
                  <p className="font-semibold text-sm text-gray-900">⏱️ {restaurant.deliveryTime}</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Price Range</p>
                  <p className="font-semibold text-sm text-gray-900">{restaurant.priceRange}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm">
                  📞 {restaurant.phoneNumber}
                </button>
                <button className="flex-1 px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition text-sm">
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
              <div className="flex border-b overflow-x-auto">
                {['menu', 'reviews', 'about'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition capitalize text-xs sm:text-base whitespace-nowrap ${
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
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {restaurant.menu.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">{item.name}</h4>
                            {item.popular && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">{item.description}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                        <div className="ml-2 sm:ml-4 text-right flex-shrink-0">
                          <div className="text-2xl sm:text-3xl mb-1">{item.image}</div>
                          <p className="font-bold text-sm sm:text-base text-indigo-600">
                            {item.price.toLocaleString()} RWF
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="p-4 sm:p-6">
                  {/* Add Review Form */}
                  <div className="mb-8 p-4 sm:p-6 bg-indigo-50 rounded-lg">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-4">Share Your Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className={`text-2xl sm:text-3xl transition ${
                                star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                        <textarea
                          value={newReview.text}
                          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                          placeholder="Share your thoughts about this restaurant..."
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-sm text-gray-900"
                          rows={4}
                        />
                      </div>
                      <button
                        onClick={handleSubmitReview}
                        disabled={!newReview.text.trim()}
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-4">Reviews ({reviews.length})</h3>
                    {reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-b-0">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="text-3xl sm:text-4xl flex-shrink-0">{review.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                              <h4 className="font-bold text-sm sm:text-base text-gray-900">{review.author}</h4>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm sm:text-base ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-xs text-gray-600 ml-1">{review.rating}/5</span>
                            </div>
                            <p className="text-xs sm:text-base text-gray-700">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2">About</h3>
                      <p className="text-xs sm:text-base text-gray-700">{restaurant.description}</p>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-2 text-xs sm:text-base text-gray-700">
                        <p>📍 {restaurant.address}</p>
                        <p>📞 {restaurant.phoneNumber}</p>
                        <p>🕐 {restaurant.openingHours}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-2">Popular Dishes</h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.dishes.map((dish, idx) => (
                          <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded">
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

          {/* Info Box */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Restaurant Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Cuisine Type</p>
                  <p className="font-semibold text-sm text-gray-900">{restaurant.cuisine}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Price Range</p>
                  <p className="font-semibold text-sm text-gray-900">{restaurant.priceRange}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Delivery Time</p>
                  <p className="font-semibold text-sm text-gray-900">{restaurant.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Opening Hours</p>
                  <p className="font-semibold text-sm text-gray-900">{restaurant.openingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}