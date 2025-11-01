'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clothesData } from '../data/clothesData';

export default function PetClothesPage() {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    petType: 'all',
    priceRange: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const router = useRouter();

  useEffect(() => {
    loadClothes();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    filterAndSortClothes();
  }, [filters, sortBy, searchQuery, clothes]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const loadCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('petcare-cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
        setCartCount(cartData.reduce((total, item) => total + item.quantity, 0));
      }
    }
  };

  const saveCartToStorage = (cartData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('petcare-cart', JSON.stringify(cartData));
    }
  };

  const loadClothes = async () => {
    try {
      // Simulate API call delay
      setTimeout(() => {
        setClothes(clothesData);
        setFilteredClothes(clothesData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading clothes:', error);
      setLoading(false);
    }
  };

  const filterAndSortClothes = () => {
    let filtered = [...clothes];

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.size !== 'all') {
      filtered = filtered.filter(item => item.sizes.includes(filters.size));
    }

    if (filters.petType !== 'all') {
      filtered = filtered.filter(item => item.petType === filters.petType);
    }

    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under-500':
          filtered = filtered.filter(item => item.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(item => item.price >= 500 && item.price <= 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(item => item.price > 1000 && item.price <= 2000);
          break;
        case 'over-2000':
          filtered = filtered.filter(item => item.price > 2000);
          break;
      }
    }

    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    setFilteredClothes(filtered);
  };

  const addToCart = (product, selectedSize = 'M') => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: 'Clothing',
      type: 'clothing',
      size: selectedSize,
      quantity: 1
    };

    const existingItemIndex = cart.findIndex(item =>
      item.id === cartItem.id && item.size === selectedSize
    );

    let newCart;
    if (existingItemIndex > -1) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    showNotification(`Added ${product.name} to cart!`, 'success');
  };

  const buyNow = (product, selectedSize = 'M') => {
    addToCart(product, selectedSize);
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      size: 'all',
      petType: 'all',
      priceRange: 'all'
    });
    setSearchQuery('');
    setSortBy('featured');
  };

  const getUniqueValues = (key) => {
    const values = clothes.map(item => item[key]);
    return [...new Set(values.flat())];
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'winter': 'Winter Wear',
      'party': 'Party Wear',
      'casual': 'Casual Wear',
      'rainwear': 'Rainwear',
      'formal': 'Formal Wear',
      'sports': 'Sports Wear',
      'seasonal': 'Seasonal',
      'sleepwear': 'Sleepwear'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading pet clothes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${notification.type === 'error' ? 'bg-rose-500' :
            notification.type === 'info' ? 'bg-blue-500' : 'bg-emerald-500'
          } text-white max-w-sm`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-white hover:text-slate-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-pink-600 hidden sm:block">PetCare</span>
              </Link>

              {/* Desktop Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="text-pink-600 font-semibold">Clothes</span>
              </div>
            </div>

            {/* Page Title - Mobile */}
            <div className="md:hidden text-center flex-1">
              <h1 className="text-lg font-bold text-slate-800">Pet Clothes</h1>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-pink-500 text-white px-3 py-2 rounded-lg hover:bg-pink-600 transition-colors font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center justify-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/" className="hover:text-pink-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Heading */}
      <div className="bg-pink-100 border-b border-pink-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              Premium Pet Fashion Collection
            </h1>
            <p className="text-base md:text-xl text-pink-700 font-medium">
              Discover stylish and comfortable clothes for your furry friends
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 ml-1">
              {filteredClothes.length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-6 border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pink-600 hover:text-pink-800 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Clothes
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clothes..."
                    className="w-full px-4 py-2.5 pl-10 pr-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pet Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pet Type
                </label>
                <select
                  value={filters.petType}
                  onChange={(e) => setFilters(prev => ({ ...prev, petType: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                >
                  <option value="all">All Pets</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="winter">Winter Wear</option>
                  <option value="party">Party Wear</option>
                  <option value="casual">Casual Wear</option>
                  <option value="rainwear">Rainwear</option>
                  <option value="formal">Formal Wear</option>
                  <option value="sports">Sports Wear</option>
                  <option value="seasonal">Seasonal</option>
                  <option value="sleepwear">Sleepwear</option>
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Size
                </label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                >
                  <option value="all">All Sizes</option>
                  {getUniqueValues('sizes').map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500">Under ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="1000-2000">₹1000 - ₹2000</option>
                  <option value="over-2000">Over ₹2000</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <p className="text-sm text-pink-800 font-medium">
                  <span className="font-bold">{filteredClothes.length}</span> clothes found
                </p>
                {filters.category !== 'all' && (
                  <p className="text-xs text-pink-600 mt-1">
                    Category: {getCategoryLabel(filters.category)}
                  </p>
                )}
                {filters.petType !== 'all' && (
                  <p className="text-xs text-pink-600 mt-1">
                    For: {filters.petType === 'dog' ? 'Dogs' : 'Cats'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Header with Sort */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {filters.category === 'all' ? 'All Clothes' : getCategoryLabel(filters.category)}
                </h2>
                <p className="text-slate-600 mt-1 text-sm md:text-base">
                  {filters.petType !== 'all' ? `For ${filters.petType === 'dog' ? 'Dogs' : 'Cats'}` : 'Style meets comfort for your pets'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white text-sm"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-high">Sort by: Price (Low to High)</option>
                  <option value="price-high-low">Sort by: Price (High to Low)</option>
                  <option value="rating">Sort by: Rating</option>
                  <option value="newest">Sort by: Newest</option>
                  <option value="discount">Sort by: Discount</option>
                </select>
              </div>
            </div>

            {filteredClothes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="text-6xl mb-4">👗</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No clothes found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredClothes.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-slate-200 group">
                    {/* Product Image with Link */}
                    <Link href={`/clothes/${item.id}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${item.badge === 'Bestseller' ? 'bg-pink-500' :
                              item.badge === 'New' ? 'bg-purple-500' :
                                item.badge === 'Popular' ? 'bg-blue-500' :
                                  item.badge === 'Waterproof' ? 'bg-cyan-500' :
                                    item.badge === 'Luxury' ? 'bg-purple-600' :
                                      item.badge === 'Sports' ? 'bg-green-500' :
                                        item.badge === 'Festive' ? 'bg-red-500' :
                                          'bg-pink-400'
                            }`}>
                            {item.badge}
                          </span>
                        </div>

                        {/* Pet Type Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${item.petType === 'dog' ? 'bg-amber-500' : 'bg-indigo-500'
                            }`}>
                            {item.petType === 'dog' ? '🐶 Dog' : '🐱 Cat'}
                          </span>
                        </div>

                        {/* Discount */}
                        <div className="absolute top-12 right-3 bg-rose-500 text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg">
                          {item.discount}% OFF
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      {/* Product Title with Link */}
                      <Link href={`/clothes/${item.id}`} className="block mb-2">
                        <h3 className="text-lg font-bold text-slate-800 flex-1 pr-2 hover:text-pink-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                          <span className="text-amber-500 text-sm">⭐</span>
                          <span className="font-bold text-slate-800 text-sm">{item.rating}</span>
                          <span className="text-slate-500 text-xs">({item.reviews})</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                      {/* Sizes */}
                      <div className="mb-4">
                        <p className="text-slate-500 text-xs mb-1">Available Sizes:</p>
                        <div className="flex gap-1 flex-wrap">
                          {item.sizes.map(size => (
                            <span key={size} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Material */}
                      <div className="mb-4">
                        <span className="bg-pink-50 text-pink-700 px-2 py-1 rounded text-xs">
                          {item.material}
                        </span>
                      </div>

                      {/* Price and Action */}
                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-slate-800">₹{item.price}</span>
                              <span className="text-rose-500 line-through text-sm">₹{item.originalPrice}</span>
                            </div>
                            <p className="text-emerald-600 text-xs font-medium">Save ₹{item.originalPrice - item.price}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="flex-1 bg-pink-500 text-white py-2.5 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium text-sm text-center"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => buyNow(item)}
                            className="flex-1 bg-slate-800 text-white py-2.5 px-4 rounded-lg hover:bg-slate-900 transition-colors font-medium text-sm text-center"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shopping Guide */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">📏</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Size Guide</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Measure your pets neck, chest, and length
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Choose size based on the larger measurement
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Allow room for comfortable movement
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-emerald-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-emerald-600 text-lg">🧼</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Care Instructions</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Machine wash cold with similar colors
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Tumble dry low or air dry
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    Do not bleach or iron directly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Floating Button */}
        {cartCount > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <Link
              href="/cart"
              className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold flex items-center gap-2 hover:bg-pink-600"
            >
              <span>🛒</span>
              <span>Cart ({cartCount})</span>
              <span className="bg-white text-pink-600 px-2 py-1 rounded-full text-sm">
                ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}