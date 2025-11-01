'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

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
    
    // Simulate API call delay
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
      const originalPrice = item.originalPrice || item.price * 1.2; // 20% discount assumption
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-gray-600 text-lg"
            >
              Loading your cart...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex mb-8"
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <motion.li whileHover={{ scale: 1.05 }}>
              <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <span>🏠</span>
                <span className="ml-1">Home</span>
              </Link>
            </motion.li>
            <li className="flex items-center">
              <span className="mx-2">›</span>
              <span className="text-blue-600 font-medium">Cart ({getTotalItems()})</span>
            </li>
          </ol>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center space-x-2"
            >
              <span>🗑️</span>
              <span>Clear Cart</span>
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
              className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🛒
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your cart feels lonely
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                Add some amazing products for your furry friends to get started!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-3 text-lg"
                >
                  <span>🎁</span>
                  <span>Explore Products</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-with-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Savings Banner */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-green-500 text-white p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎉</span>
                      <div>
                        <p className="font-semibold">You're saving ₹{Math.round(getSavings())}!</p>
                        <p className="text-sm opacity-90">Great deals on pet products</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl"
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
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        Free shipping on orders over ₹{freeShippingThreshold}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        ₹{freeShippingThreshold - getSubtotal()} to go
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(getSubtotal() / freeShippingThreshold) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Cart Items List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-3">
                      <span>📦</span>
                      <span>Your Items ({getTotalItems()})</span>
                      {saving && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-blue-500 font-normal"
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
                          className="p-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex space-x-4">
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="flex-shrink-0 relative"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-28 h-28 object-cover rounded-xl shadow-sm"
                              />
                              {!item.inStock && (
                                <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                  <span className="text-red-600 text-sm font-bold bg-white px-2 py-1 rounded">
                                    Out of Stock
                                  </span>
                                </div>
                              )}
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {item.category}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <span className="text-sm text-green-600 font-medium">
                                      ₹{item.price.toLocaleString()}
                                    </span>
                                    {item.originalPrice && (
                                      <span className="text-sm text-gray-400 line-through">
                                        ₹{item.originalPrice.toLocaleString()}
                                      </span>
                                    )}
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                      Save ₹{((item.originalPrice || item.price * 1.2) - item.price).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-xl font-bold text-gray-800">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {item.quantity} × ₹{item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center space-x-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-lg font-bold"
                                  >
                                    −
                                  </motion.button>
                                  <motion.span 
                                    key={item.quantity}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="w-12 text-center font-bold text-lg text-gray-800"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-lg font-bold"
                                  >
                                    +
                                  </motion.button>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                  <span>🗑️</span>
                                  <span>Remove</span>
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

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                      <span>📝</span>
                      <span>Order Summary</span>
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
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
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total Amount</span>
                        <motion.span
                          key={total}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          ₹{Math.round(total).toLocaleString()}
                        </motion.span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                        <span>💳</span>
                        <span>EMI options available</span>
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href="/checkout"
                        className="block w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-center text-lg shadow-sm"
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
                        className="block w-full text-center bg-gray-100 text-gray-800 py-4 rounded-xl hover:bg-gray-200 transition-colors font-medium border border-gray-300"
                      >
                        🔍 Continue Shopping
                      </Link>
                    </motion.div>

                    {/* Security Badges */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-center space-x-6 text-gray-500">
                        <div className="text-center">
                          <div className="text-2xl">🔒</div>
                          <p className="text-xs mt-1">Secure Payment</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl">🚚</div>
                          <p className="text-xs mt-1">Fast Delivery</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl">↩️</div>
                          <p className="text-xs mt-1">Easy Returns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}