'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import allProducts, { 
  getProductsByCategory, 
  getFeaturedProducts, 
  filterProducts,
  getAllCategories 
} from '../data/allproducts';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    inStock: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadProducts();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [filters, searchQuery, sortBy, products]);

  const loadCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('petcare-cart');
      const savedWishlist = localStorage.getItem('petcare-wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const loadProducts = async () => {
    try {
      // Simulate API loading delay
      setTimeout(() => {
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading products:', error);
      showNotification('Failed to load products', 'error');
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply filters using the utility function
    const filterCriteria = {};
    
    if (filters.category !== 'all') {
      filterCriteria.category = filters.category;
    }
    
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under-1000') {
        filterCriteria.maxPrice = 1000;
      } else if (filters.priceRange === '1000-2000') {
        filterCriteria.minPrice = 1000;
        filterCriteria.maxPrice = 2000;
      } else if (filters.priceRange === '2000-3000') {
        filterCriteria.minPrice = 2000;
        filterCriteria.maxPrice = 3000;
      } else if (filters.priceRange === 'over-3000') {
        filterCriteria.minPrice = 3000;
      }
    }

    if (filters.rating !== 'all') {
      filterCriteria.minRating = parseInt(filters.rating);
    }

    if (filters.inStock) {
      filterCriteria.inStock = true;
    }

    filtered = filterProducts(filterCriteria);

    // Apply search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.subcategory.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // featured - keep original order or sort by popularity
        filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      rating: 'all',
      inStock: false
    });
    setSearchQuery('');
    setSortBy('featured');
  };

  const addToCart = (product) => {
    if (!product.inStock) {
      showNotification('This product is currently out of stock', 'error');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      brand: product.brand,
      selectedSize: 'Standard',
      selectedColor: 'Default',
      quantity: 1
    };

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

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
    localStorage.setItem('petcare-cart', JSON.stringify(newCart));
    showNotification(`Added ${product.name} to cart!`, 'success');
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
      showNotification('Removed from wishlist', 'info');
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        discount: product.discount
      };
      newWishlist = [...wishlist, wishlistItem];
      showNotification('Added to wishlist!', 'success');
    }

    setWishlist(newWishlist);
    localStorage.setItem('petcare-wishlist', JSON.stringify(newWishlist));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const getUniqueCategories = () => {
    return getAllCategories();
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getStockStatus = (stockCount) => {
    if (stockCount === 0) return { text: 'Out of Stock', color: 'bg-red-500' };
    if (stockCount <= 5) return { text: 'Low Stock', color: 'bg-orange-500' };
    return { text: 'In Stock', color: 'bg-green-500' };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-6 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${notification.type === 'error' ? 'bg-red-500' :
            notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
          } text-white max-w-sm mx-auto sm:mx-0`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-white hover:text-slate-200 text-lg"
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
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-purple-600 hidden sm:block">PetCare</span>
              </Link>

              {/* Desktop Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="text-purple-600 font-semibold">Products</span>
              </div>
            </div>

            {/* Page Title - Mobile */}
            <div className="md:hidden text-center flex-1">
              <h1 className="text-lg font-bold text-slate-800">Products</h1>
            </div>

            {/* Cart & Wishlist */}
            <div className="flex items-center gap-3">
            
              
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center justify-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/" className="hover:text-purple-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Heading */}
      <div className="bg-purple-100 border-b border-purple-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              Premium Pet Products
            </h1>
            <p className="text-base md:text-xl text-purple-700 font-medium">
              Everything your pet needs in one place 🛍️
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            <span className="bg-white text-purple-600 text-xs rounded-full px-2 py-1 ml-1">
              {filteredProducts.length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5 pl-10 pr-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="all">All Categories</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1000">Under ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="2000-3000">₹2,000 - ₹3,000</option>
                  <option value="over-3000">Over ₹3,000</option>
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                  <option value="2">2 Stars & Up</option>
                </select>
              </div>

              {/* In Stock Only */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">In Stock Only</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-800 font-medium text-center">
                  <span className="font-bold text-lg">{filteredProducts.length}</span> products found
                </p>
                {filters.category !== 'all' && (
                  <p className="text-xs text-purple-600 mt-1 text-center">
                    Category: {filters.category}
                  </p>
                )}
                {filters.priceRange !== 'all' && (
                  <p className="text-xs text-purple-600 mt-1 text-center">
                    Price: {filters.priceRange.replace('-', ' - ').replace('under', 'Under ').replace('over', 'Over ')}
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
                  {filters.category === 'all' ? 'All Products' : `${filters.category} Products`}
                </h2>
                <p className="text-slate-600 mt-1 text-sm md:text-base">
                  Discover amazing products for your pet
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 font-medium hidden sm:block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stockCount);
                  
                  return (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                      {/* Product Image with Link to Detail Page */}
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount > 0 && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                              {product.discount}% OFF
                            </span>
                          )}
                          <div className={`absolute top-3 right-3 ${stockStatus.color} text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg`}>
                            {stockStatus.text}
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            
                          </div>
                        </div>
                      </Link>

                      <div className="p-4 sm:p-6">
                        {/* Product Title with Link to Detail Page */}
                        <Link href={`/products/${product.id}`} className="block mb-3">
                          <h3 className="font-semibold text-slate-800 line-clamp-2 hover:text-purple-600 transition-colors text-base sm:text-lg">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-slate-600 text-sm capitalize">{product.category}</span>
                          <span className="text-slate-500 text-sm">{product.brand}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < Math.floor(product.rating)
                                    ? 'text-yellow-500'
                                    : 'text-slate-300'
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-slate-800 font-semibold text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="text-slate-500 text-sm">({product.reviews})</span>
                        </div>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-800">{formatPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-slate-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addToCart(product)}
                              disabled={!product.inStock}
                              className={`p-3 rounded-lg transition-all ${product.inStock
                                  ? 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-110'
                                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                }`}
                              title={product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            >
                              🛒
                            </button>
                            {/* Quick View Button */}
                            <Link
                              href={`/products/${product.id}`}
                              className="p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-900 hover:scale-110 transition-all"
                              title="View Details"
                            >
                              👁️
                            </Link>
                          </div>
                        </div>

                        {/* Stock Count */}
                        {product.inStock && product.stockCount <= 10 && (
                          <p className="text-orange-600 text-xs mt-2">
                            Only {product.stockCount} left in stock!
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Load More Button - You can implement pagination here */}
            {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
              <div className="text-center mt-8">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}