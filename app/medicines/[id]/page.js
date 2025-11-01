'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMedicineProductById } from '../../data/medicines'; // Import from your medicines data file

export default function MedicineDetailPage() {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const params = useParams();
  const router = useRouter();
  const medicineId = params.id;

  useEffect(() => {
    loadMedicine();
    loadCartFromStorage();
  }, [medicineId]);

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

  const loadMedicine = async () => {
    try {
      setTimeout(() => {
        const foundMedicine = getMedicineProductById(medicineId);
        if (foundMedicine) {
          setMedicine(foundMedicine);
        } else {
          showNotification('Medicine not found', 'error');
        }
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading medicine:', error);
      showNotification('Failed to load medicine', 'error');
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!medicine) return;

    if (!medicine.inStock) {
      showNotification('This medicine is currently out of stock', 'error');
      return;
    }

    const cartItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      category: 'medicine',
      type: 'medicine',
      brand: medicine.brand,
      weight: medicine.weight,
      quantity: quantity,
      cartId: Date.now(),
      link: medicine.link || `/medicines/${medicine.id}`
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
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    showNotification(`Added ${medicine.name} to cart!`, 'success');
  };

  const buyNow = () => {
    if (!medicine) return;

    if (!medicine.inStock) {
      showNotification('This medicine is currently out of stock', 'error');
      return;
    }

    // Add to cart first
    const cartItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      category: 'medicine',
      type: 'medicine',
      brand: medicine.brand,
      weight: medicine.weight,
      quantity: quantity,
      cartId: Date.now(),
      link: medicine.link || `/medicines/${medicine.id}`
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
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    
    showNotification(`Proceeding to checkout with "${medicine.name}"`, 'info');
    
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'flea-tick': 'Flea & Tick',
      'heartworm': 'Heartworm',
      'dewormer': 'Dewormer',
      'skin-allergy': 'Skin & Allergy',
      'multi-purpose': 'Multi-Purpose',
      'joint-health': 'Joint Health'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading medicine details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">💊</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Medicine Not Found</h1>
            <p className="text-slate-600 mb-6">The medicine you're looking for doesn't exist.</p>
            <Link 
              href="/medicines" 
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium inline-block"
            >
              ← Back to Medicines
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'error' ? 'bg-rose-500' : 
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
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-emerald-600 hidden sm:block">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/medicines" className="hover:text-emerald-600 transition-colors">Medicines</Link>
                <span className="text-slate-300">/</span>
                <span className="text-emerald-600 font-semibold truncate max-w-xs">{medicine.name}</span>
              </div>
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm"
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
          <div className="md:hidden flex items-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/medicines" className="hover:text-emerald-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Medicines
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Medicine Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              <img
                src={medicine.additionalImages ? medicine.additionalImages[activeImage] : medicine.image}
                alt={medicine.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {medicine.additionalImages && medicine.additionalImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {medicine.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-emerald-500' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${medicine.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Medicine Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-2 ${
                  medicine.badge === 'Bestseller' ? 'bg-amber-500' :
                  medicine.badge === 'Top Rated' ? 'bg-emerald-500' :
                  medicine.badge === 'Long Lasting' ? 'bg-blue-500' :
                  medicine.badge === 'Effective' ? 'bg-green-500' :
                  medicine.badge === 'Complete Care' ? 'bg-purple-500' :
                  medicine.badge === 'Fast Relief' ? 'bg-rose-500' :
                  medicine.badge === 'Chewable' ? 'bg-orange-500' :
                  medicine.badge === 'Heart Care' ? 'bg-red-500' :
                  medicine.badge === 'Multi-Protection' ? 'bg-indigo-500' :
                  medicine.badge === 'Joint Care' ? 'bg-cyan-500' :
                  'bg-slate-500'
                }`}>
                  {medicine.badge}
                </span>
                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${
                  medicine.petType === 'dog' ? 'bg-amber-600' : 
                  medicine.petType === 'cat' ? 'bg-indigo-500' : 'bg-emerald-500'
                }`}>
                  {medicine.petType === 'dog' ? '🐶 Dog' : 
                   medicine.petType === 'cat' ? '🐱 Cat' : '🐾 Both'}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                <span className="text-emerald-500 text-sm">⭐</span>
                <span className="font-bold text-slate-800">{medicine.rating}</span>
                <span className="text-slate-500 text-sm">({medicine.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-4">{medicine.name}</h1>
            <p className="text-slate-600 mb-6 leading-relaxed">{medicine.description}</p>

            {/* Brand */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Brand:
              </label>
              <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                <span className="text-slate-800 font-medium">{medicine.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-slate-800">₹{medicine.price}</span>
                {medicine.originalPrice > medicine.price && (
                  <>
                    <span className="text-xl text-slate-500 line-through">₹{medicine.originalPrice}</span>
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {medicine.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              {medicine.originalPrice > medicine.price && (
                <p className="text-emerald-600 font-medium">You save ₹{medicine.originalPrice - medicine.price}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-semibold text-slate-800 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addToCart}
                disabled={!medicine.inStock}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  medicine.inStock
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                disabled={!medicine.inStock}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  medicine.inStock
                    ? 'bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Stock Info */}
            {medicine.inStock ? (
              <p className="text-emerald-600 text-sm mt-3 text-center">
                {medicine.stockCount < 10 
                  ? `Only ${medicine.stockCount} left in stock!` 
                  : 'In Stock - Ready to Ship'
                }
              </p>
            ) : (
              <p className="text-rose-600 text-sm mt-3 text-center">
                Out of Stock
              </p>
            )}
          </div>
        </div>

        {/* Medicine Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              <button className="flex-shrink-0 px-6 py-4 font-medium text-slate-800 border-b-2 border-emerald-500">
                Product Details
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {medicine.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span className="text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medicine Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Medicine Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Category</dt>
                    <dd className="text-slate-800">{getCategoryLabel(medicine.category)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Dosage</dt>
                    <dd className="text-slate-800">{medicine.dosage}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Weight Range</dt>
                    <dd className="text-slate-800">{medicine.weight}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Package Quantity</dt>
                    <dd className="text-slate-800">{medicine.quantity}</dd>
                  </div>
                  {medicine.suitableFor && (
                    <div>
                      <dt className="text-sm font-medium text-slate-500">Suitable For</dt>
                      <dd className="text-slate-800">{medicine.suitableFor}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Ingredients */}
            {medicine.ingredients && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Active Ingredients</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {medicine.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-slate-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            {medicine.usageInstructions && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Usage Instructions</h3>
                <ul className="space-y-2">
                  {medicine.usageInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-slate-600">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Long Description */}
            {medicine.detailedDescription && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Description</h3>
                <p className="text-slate-600 leading-relaxed">{medicine.detailedDescription}</p>
              </div>
            )}

            {/* Warnings */}
            {medicine.warnings && (
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-800 mb-4">⚠️ Important Warnings</h3>
                <ul className="space-y-2">
                  {medicine.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-amber-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Storage & Shelf Life */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicine.storage && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Storage Instructions</h3>
                  <p className="text-slate-600">{medicine.storage}</p>
                </div>
              )}
              {medicine.shelfLife && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Shelf Life</h3>
                  <p className="text-slate-600">{medicine.shelfLife}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Medicines */}
        <div className="text-center mt-8">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            ← Back to All Medicines
          </Link>
        </div>
      </div>

      {/* Cart Floating Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href="/cart"
            className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold flex items-center gap-2 hover:bg-emerald-600"
          >
            <span>🛒</span>
            <span>Cart ({cartCount})</span>
            <span className="bg-white text-emerald-600 px-2 py-1 rounded-full text-sm">
              ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}