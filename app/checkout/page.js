'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
    saveInfo: false,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Mock payment gateway integration
  const processPayment = async (paymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          paymentMethod: paymentData.method,
          amount: paymentData.amount,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    });
  };

  useEffect(() => {
    loadCartItems();
    // Load saved form data if exists
    const savedFormData = localStorage.getItem('petcare-checkout-form');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const loadCartItems = async () => {
    try {
      setTimeout(() => {
        const savedCart = localStorage.getItem('petcare-cart');
        const items = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(items);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading cart:', error);
      setLoading(false);
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const shippingFee = cartItems.length > 0 ? 99 : 0;
  const tax = getSubtotal() * 0.18;
  const total = getSubtotal() + shippingFee + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setFormData(newFormData);
    
    // Save form data to localStorage
    if (name !== 'cardNumber' && name !== 'expiryDate' && name !== 'cvv' && name !== 'upiId') {
      localStorage.setItem('petcare-checkout-form', JSON.stringify(newFormData));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateShippingForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone must be 10 digits';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pincode.trim()) errors.pincode = 'PIN code is required';
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'PIN code must be 6 digits';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    const errors = {};
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Card number must be 16 digits';
      if (!formData.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) errors.expiryDate = 'Use MM/YY format';
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = 'CVV must be 3-4 digits';
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim()) errors.upiId = 'UPI ID is required';
      else if (!/[\w\.\-]{2,256}@[\w]{2,64}/.test(formData.upiId)) errors.upiId = 'Invalid UPI ID format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setCurrentStep(2);
    } else {
      const firstError = Object.keys(formErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBackToShipping = () => {
    setCurrentStep(1);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) {
      const firstError = Object.keys(formErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setOrderLoading(true);
    
    try {
      // Process payment
      const paymentResult = await processPayment({
        method: formData.paymentMethod,
        amount: total,
        ...(formData.paymentMethod === 'card' && {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        }),
        ...(formData.paymentMethod === 'upi' && {
          upiId: formData.upiId
        })
      });

      if (paymentResult.success) {
        // Create order
        const order = {
          id: 'ORD' + Date.now().toString().slice(-6),
          items: cartItems,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode
          },
          payment: paymentResult,
          total: total,
          subtotal: getSubtotal(),
          shipping: shippingFee,
          tax: tax,
          status: 'confirmed',
          orderDate: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          tracking: {
            status: 'order_placed',
            steps: [
              { status: 'order_placed', title: 'Order Placed', description: 'Your order has been received', completed: true, timestamp: new Date().toISOString() },
              { status: 'processing', title: 'Processing', description: 'We are preparing your order', completed: false, timestamp: null },
              { status: 'shipped', title: 'Shipped', description: 'Your order is on the way', completed: false, timestamp: null },
              { status: 'out_for_delivery', title: 'Out for Delivery', description: 'Your order is out for delivery', completed: false, timestamp: null },
              { status: 'delivered', title: 'Delivered', description: 'Your order has been delivered', completed: false, timestamp: null }
            ]
          }
        };

        // Save order to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('petcare-orders') || '[]');
        localStorage.setItem('petcare-orders', JSON.stringify([order, ...existingOrders]));
        
        setOrderDetails(order);
        setCurrentStep(3);
        
        // Clear cart and form data
        localStorage.removeItem('petcare-cart');
        if (!formData.saveInfo) {
          localStorage.removeItem('petcare-checkout-form');
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setFormErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setOrderLoading(false);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('petcare-cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('petcare-cart', JSON.stringify(updatedCart));
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Header Navigation
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const progressSteps = [
    { number: 1, title: 'Shipping', completed: currentStep >= 1, current: currentStep === 1 },
    { number: 2, title: 'Payment', completed: currentStep >= 2, current: currentStep === 2 },
    { number: 3, title: 'Confirmation', completed: currentStep >= 3, current: currentStep === 3 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🐾
          </motion.div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-lg font-bold text-gray-800">PetCare</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some amazing products for your furry friend!</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🐕 Shop Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm">P</span>
                </motion.div>
                <span className="text-lg font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <nav className="hidden md:flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                  <li>
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <Link href="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-blue-600 font-medium">Checkout</span>
                  </li>
                </ol>
              </nav>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Breadcrumb */}
          <nav className="md:hidden flex mt-3" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs text-gray-600">
              <li>
                <Link href="/cart" className="hover:text-blue-600 transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Cart
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            {progressSteps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : step.current
                      ? 'border-blue-600 bg-white text-blue-600'
                      : 'border-gray-300 bg-white text-gray-400'
                  } font-semibold text-sm transition-all duration-300`}>
                    {step.completed ? '✓' : step.number}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.completed || step.current
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  } hidden sm:block`}>
                    {step.title}
                  </span>
                  <span className={`text-xs mt-2 font-medium ${
                    step.completed || step.current
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  } sm:hidden`}>
                    Step {step.number}
                  </span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  } transition-all duration-300`}></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          {currentStep === 1 && 'Shipping Information'}
          {currentStep === 2 && 'Payment Method'}
          {currentStep === 3 && 'Order Confirmation'}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {currentStep === 1 && 'Enter your delivery details'}
          {currentStep === 2 && 'Choose your preferred payment method'}
          {currentStep === 3 && 'Your order has been placed successfully!'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleProceedToPayment}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
              >
                {/* Contact Information */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="10-digit phone number"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🏠</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        formErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete address with landmarks"
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your city"
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="6-digit PIN code"
                      />
                      {formErrors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Information */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Save this information for faster checkout next time</span>
                </div>

                <div className="flex space-x-4">
                  <Link
                    href="/cart"
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium text-center"
                  >
                    Back to Cart
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handlePlaceOrder}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">💳</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay securely with your card' },
                      { id: 'upi', name: 'UPI Payment', icon: '📱', description: 'Instant payment with UPI' },
                      { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive' }
                    ].map(method => (
                      <label key={method.id} className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{method.icon}</span>
                            <span className="font-semibold text-gray-800">{method.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Card Payment Form */}
                {formData.paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          if (formatted.length <= 19) { // 16 digits + 3 spaces
                            setFormData({ ...formData, cardNumber: formatted });
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        maxLength={19}
                      />
                      {formErrors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            if (value.length <= 5) {
                              setFormData({ ...formData, expiryDate: value });
                            }
                          }}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            formErrors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          maxLength={5}
                        />
                        {formErrors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 4) {
                              setFormData({ ...formData, cvv: value });
                            }
                          }}
                          placeholder="123"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            formErrors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          maxLength={4}
                        />
                        {formErrors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* UPI Payment Form */}
                {formData.paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@upi"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.upiId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.upiId && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.upiId}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <span className="text-green-600 text-xl">🔒</span>
                  <div>
                    <p className="font-semibold text-green-800">Secure Checkout</p>
                    <p className="text-sm text-green-600">Your information is protected with 256-bit SSL encryption</p>
                  </div>
                </div>

                {formErrors.payment && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{formErrors.payment}</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBackToShipping}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Back to Shipping
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={orderLoading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    {orderLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      `Pay ₹${Math.round(total).toLocaleString()}`
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && orderDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
              >
                {/* Order Success Header */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-2xl text-green-600">✅</span>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                {/* Order Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">{orderDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium text-green-600">₹{orderDetails.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium capitalize">{orderDetails.payment.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium">{orderDetails.payment.transactionId}</span>
                    </div>
                  </div>
                </div>

                {/* Order Tracking */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Tracking</h3>
                  <div className="space-y-4">
                    {orderDetails.tracking.steps.map((step, index) => (
                      <div key={step.status} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.completed ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-500">{step.description}</p>
                          {step.timestamp && (
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(step.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <span>📅</span>
                    <span className="font-semibold">Estimated Delivery</span>
                  </div>
                  <p className="text-blue-600 mt-1">
                    {new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Next Steps */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/orders"
                    className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
                  >
                    View All Orders
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <span>📦</span>
                  <span>Order Summary ({getTotalItems()} items)</span>
                </h2>
              </div>

              <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                        {currentStep === 1 && (
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                        {currentStep === 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-2 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{getSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>₹{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span>₹{Math.round(tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <span>🚚</span>
                    <span className="font-semibold">Free Delivery</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">Expected delivery in 2-3 business days</p>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Why Shop With Us?</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-xs text-gray-600">Free Shipping</p>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
                <div className="p-3">
                  <div className="text-2xl mb-2">📞</div>
                  <p className="text-xs text-gray-600">24/7 Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}