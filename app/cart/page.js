'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadCartItems();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const loadCartItems = async () => {
    try {
      setTimeout(() => {
        const savedCart = localStorage.getItem('petcare-cart');
        const items = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(items);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading cart:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setSaving(true);
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('petcare-cart', JSON.stringify(updatedItems));
    setSaving(false);
  };

  const removeItem = async (id) => {
    setSaving(true);
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('petcare-cart', JSON.stringify(updatedItems));
    setSaving(false);
  };

  const clearCart = async () => {
    setSaving(true);
    setCartItems([]);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('petcare-cart');
    setSaving(false);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price * 1.2;
      return total + ((originalPrice - item.price) * item.quantity);
    }, 0);
  };

  const shippingFee = cartItems.length > 0 ? 99 : 0;
  const freeShippingThreshold = 2000;
  const isFreeShipping = getSubtotal() >= freeShippingThreshold;
  const tax = getSubtotal() * 0.18;
  const total = getSubtotal() + (isFreeShipping ? 0 : shippingFee) + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-3">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-gray-600 text-base"
            >
              Loading your cart...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Simplified for mobile */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex mb-4"
        >
          <ol className="flex items-center space-x-1 text-xs text-gray-600">
            <motion.li whileHover={{ scale: 1.05 }}>
              <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <span>🏠</span>
                <span className="ml-1 hidden xs:inline">Home</span>
              </Link>
            </motion.li>
            <li className="flex items-center">
              <span className="mx-1">›</span>
              <span className="text-blue-600 font-medium">Cart ({getTotalItems()})</span>
            </li>
          </ol>
        </motion.nav>

        {/* Header - Stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center space-x-2 w-fit"
            >
              <span>🗑️</span>
              <span className="text-sm">Clear Cart</span>
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 mx-2"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🛒
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 px-4">
                Your cart feels lonely
              </h2>
              <p className="text-gray-600 mb-6 mx-auto text-sm px-4">
                Add some amazing products for your furry friends to get started!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-2 text-base"
                >
                  <span>🎁</span>
                  <span>Explore Products</span>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-with-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Cart Items - Full width on mobile */}
              <div className="space-y-4">
                {/* Savings Banner */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-green-500 text-white p-3 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🎉</span>
                      <div>
                        <p className="font-semibold text-sm">You're saving ₹{Math.round(getSavings())}!</p>
                        <p className="text-xs opacity-90">Great deals on pet products</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl"
                    >
                      💰
                    </motion.div>
                  </div>
                </motion.div>

                {/* Shipping Progress */}
                {!isFreeShipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">
                        Free shipping on orders over ₹{freeShippingThreshold}
                      </span>
                      <span className="text-xs font-semibold text-blue-600">
                        ₹{freeShippingThreshold - getSubtotal()} to go
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(getSubtotal() / freeShippingThreshold) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-blue-500 h-1.5 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Cart Items List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <span>📦</span>
                      <span>Your Items ({getTotalItems()})</span>
                      {saving && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-500 font-normal"
                        >
                          Saving...
                        </motion.span>
                      )}
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex space-x-3">
                            {/* Product Image */}
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="flex-shrink-0 relative"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg shadow-sm"
                              />
                              {!item.inStock && (
                                <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                                  <span className="text-red-600 text-xs font-bold bg-white px-1 py-0.5 rounded">
                                    Out of Stock
                                  </span>
                                </div>
                              )}
                            </motion.div>
                            
                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="flex-1 pr-2">
                                  <h3 className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                                    {item.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.category}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-sm text-green-600 font-medium">
                                      ₹{item.price.toLocaleString()}
                                    </span>
                                    {item.originalPrice && (
                                      <span className="text-xs text-gray-400 line-through">
                                        ₹{item.originalPrice.toLocaleString()}
                                      </span>
                                    )}
                                    <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                                      Save ₹{((item.originalPrice || item.price * 1.2) - item.price).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Price for quantity */}
                                <div className="text-right flex-shrink-0">
                                  <p className="text-lg font-bold text-gray-800">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.quantity} × ₹{item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              {/* Quantity Controls and Remove Button */}
                              <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-base font-bold"
                                  >
                                    −
                                  </motion.button>
                                  <motion.span 
                                    key={item.quantity}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="w-10 text-center font-bold text-base text-gray-800"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-base font-bold"
                                  >
                                    +
                                  </motion.button>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                >
                                  <span className="text-base">🗑️</span>
                                  <span className="hidden xs:inline">Remove</span>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Order Summary - Below items on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <span>📝</span>
                    <span>Order Summary</span>
                  </h2>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({getTotalItems()})</span>
                    <span className="font-medium">₹{getSubtotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Savings</span>
                    <span className="font-medium text-green-600">-₹{Math.round(getSavings()).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {isFreeShipping ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="font-medium">₹{Math.round(tax).toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total Amount</span>
                      <motion.span
                        key={total}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        ₹{Math.round(total).toLocaleString()}
                      </motion.span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                      <span>💳</span>
                      <span>EMI options available</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/checkout"
                        className="block w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-center text-base shadow-sm"
                      >
                        🛍️ Proceed to Checkout
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/products"
                        className="block w-full text-center bg-gray-100 text-gray-800 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium border border-gray-300 text-sm"
                      >
                        🔍 Continue Shopping
                      </Link>
                    </motion.div>
                  </div>

                  {/* Security Badges - Compact on mobile */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-around text-gray-500">
                      <div className="text-center">
                        <div className="text-lg">🔒</div>
                        <p className="text-xs mt-0.5">Secure</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg">🚚</div>
                        <p className="text-xs mt-0.5">Fast Delivery</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg">↩️</div>
                        <p className="text-xs mt-0.5">Returns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}