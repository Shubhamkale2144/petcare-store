'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import allProducts, { getProductById, getRelatedProducts } from '../../data/allproducts';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);

  useEffect(() => {
    loadProduct();
    loadCartFromStorage();
  }, [productId]);

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

  const loadProduct = async () => {
    try {
      // Simulate API loading delay
      setTimeout(() => {
        const foundProduct = getProductById(productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          showNotification('Product not found', 'error');
        }
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading product:', error);
      showNotification('Failed to load product', 'error');
      setLoading(false);
    }
  };

  const addToCart = () => {
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
      quantity: quantity
    };

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    let newCart;
    if (existingItemIndex > -1) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    localStorage.setItem('petcare-cart', JSON.stringify(newCart));
    showNotification(`Added ${quantity} ${product.name} to cart!`, 'success');
  };

  const buyNow = () => {
    addToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 1000);
  };

  const toggleWishlist = () => {
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
        rating: product.rating
      };
      newWishlist = [...wishlist, wishlistItem];
      showNotification('Added to wishlist!', 'success');
    }

    setWishlist(newWishlist);
    localStorage.setItem('petcare-wishlist', JSON.stringify(newWishlist));
  };

  const isInWishlist = () => {
    return wishlist.some(item => item.id === product.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStockStatus = (stockCount) => {
    if (stockCount === 0) return { text: 'Out of Stock', color: 'bg-red-500' };
    if (stockCount <= 5) return { text: 'Low Stock', color: 'bg-orange-500' };
    return { text: 'In Stock', color: 'bg-green-500' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-slate-600 text-lg">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">😿</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h1>
            <p className="text-slate-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link 
              href="/products" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-block"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = [product.image, ...(product.additionalImages || [])];
  const stockStatus = getStockStatus(product.stockCount);
  const relatedProducts = getRelatedProducts(product, 3);

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-6 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'error' ? 'bg-red-500' : 
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
                <Link href="/products" className="hover:text-purple-600 transition-colors">Products</Link>
                <span className="text-slate-300">/</span>
                <span className="text-purple-600 font-semibold truncate max-w-xs">{product.name}</span>
              </div>
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
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/products" className="hover:text-purple-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index ? 'border-purple-500' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                {product.name}
              </h1>

              {/* Rating and Brand */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-500' 
                            : 'text-slate-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-800 font-semibold">{product.rating}</span>
                  <span className="text-slate-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-slate-600">Brand: <strong>{product.brand}</strong></span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color} text-white`}>
                  {stockStatus.text}
                  {product.inStock && ` (${product.stockCount} available)`}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-slate-800">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 font-medium">Inclusive of all taxes</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                    className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-slate-500">
                  Max: {product.stockCount} items
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  product.inStock
                    ? 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg transform hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                🛒 Add to Cart
              </button>
              
              <button
                onClick={buyNow}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  product.inStock
                    ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg transform hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                ⚡ Buy Now
              </button>

            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              {['description', 'specifications', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {product.longDescription || product.description}
                </p>
                
                {product.ingredients && product.ingredients.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Ingredients:</h3>
                    <p className="text-slate-600">{product.ingredients.join(', ')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                {product.shipping && (
                  <>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium text-slate-700">Free Shipping:</span>
                      <span className="text-slate-600">{product.shipping.freeShipping ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium text-slate-700">Delivery Time:</span>
                      <span className="text-slate-600">{product.shipping.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium text-slate-700">Return Policy:</span>
                      <span className="text-slate-600">{product.shipping.returnPolicy}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {relatedProduct.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        {relatedProduct.originalPrice > relatedProduct.price && (
                          <span className="text-slate-500 line-through text-sm">
                            {formatPrice(relatedProduct.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}