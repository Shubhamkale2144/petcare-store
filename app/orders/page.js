'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      setTimeout(() => {
        const savedOrders = localStorage.getItem('petcare-orders');
        const ordersData = savedOrders ? JSON.parse(savedOrders) : [];
        setOrders(ordersData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Order Placed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = (orderDate) => {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days delivery
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const handleReorder = (order) => {
    const cartItems = order.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));
    
    localStorage.setItem('petcare-cart', JSON.stringify(cartItems));
    router.push('/cart');
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('petcare-orders', JSON.stringify(updatedOrders));
    setSelectedOrder(null);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
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
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-1">Order #{selectedOrder.id}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800">Order Status</h3>
                      <p className="text-blue-600">{getStatusText(selectedOrder.status)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>

                {/* Order Tracking */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Tracking</h3>
                  <div className="space-y-4">
                    {selectedOrder.tracking.steps.map((step, index) => (
                      <div key={step.status} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed ? (
                            <span className="text-white text-sm">✓</span>
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 pb-4 border-b border-gray-200 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium ${
                              step.completed ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {step.title}
                            </p>
                            {step.timestamp && (
                              <p className="text-sm text-gray-500">
                                {formatDate(step.timestamp)}
                              </p>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Price Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>₹{selectedOrder.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (18%)</span>
                      <span>₹{Math.round(selectedOrder.tax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{Math.round(selectedOrder.total).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Delivery Address</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{selectedOrder.customer.name}</p>
                      <p>{selectedOrder.customer.address}</p>
                      <p>{selectedOrder.customer.city} - {selectedOrder.customer.pincode}</p>
                      <p>Phone: {selectedOrder.customer.phone}</p>
                      <p>Email: {selectedOrder.customer.email}</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Order Date:</span>
                        <span>{formatDate(selectedOrder.orderDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Delivery:</span>
                        <span>{getEstimatedDelivery(selectedOrder.orderDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="capitalize">{selectedOrder.payment.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-mono text-xs">{selectedOrder.payment.transactionId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Reorder Items
                  </button>
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Fixed Mobile Menu */}
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
                    <span className="text-blue-600 font-medium">My Orders</span>
                  </li>
                </ol>
              </nav>
            </div>
            
            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Breadcrumb */}
          <nav className="md:hidden flex mt-3" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">
                        {item.name === 'Home' && '🏠'}
                        {item.name === 'Products' && '🛍️'}
                        {item.name === 'Services' && '🛠️'}
                        {item.name === 'About' && 'ℹ️'}
                        {item.name === 'Contact' && '📞'}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your orders, view order history, and manage your purchases
          </p>
        </div>

        {/* Stats Summary */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {orders.filter(o => o.status === 'shipped' || o.status === 'out_for_delivery').length}
              </div>
              <div className="text-sm text-gray-600">In Transit</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length}
              </div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
          </motion.div>
        )}

        {/* Filter Tabs */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex overflow-x-auto space-x-2 mb-6 pb-2 hide-scrollbar"
          >
            {[
              { id: 'all', name: 'All Orders', count: orders.length },
              { id: 'confirmed', name: 'Processing', count: orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length },
              { id: 'shipped', name: 'Shipped', count: orders.filter(o => o.status === 'shipped' || o.status === 'out_for_delivery').length },
              { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
              { id: 'cancelled', name: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {getFilteredOrders().length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {orders.length === 0 
                  ? "You haven't placed any orders yet. Start shopping for your furry friends!"
                  : `No orders match the "${filter}" filter.`
                }
              </p>
              {orders.length === 0 && (
                <Link
                  href="/products"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  🐕 Start Shopping
                </Link>
              )}
            </motion.div>
          ) : (
            getFilteredOrders().map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-600 text-sm">Placed on {formatDate(order.orderDate)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{Math.round(order.total).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex-shrink-0 text-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg mx-auto"
                            />
                            <p className="text-xs text-gray-600 mt-1 truncate max-w-[80px]">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex-shrink-0 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">
                                +{order.items.length - 3}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">More items</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Reorder
                      </button>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <span>📦</span>
                          <span>
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>🚚</span>
                          <span>Est. delivery: {getEstimatedDelivery(order.orderDate)}</span>
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="capitalize">{order.payment.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Support Section */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help with Your Order?</h3>
            <p className="text-blue-600 mb-4">
              Our customer support team is here to help you with any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                📞 Call Support
              </a>
              <a
                href="mailto:support@petcare.com"
                className="inline-flex items-center justify-center border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                📧 Email Support
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}