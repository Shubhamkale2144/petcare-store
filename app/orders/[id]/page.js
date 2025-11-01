'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

export default function OrderDetailsPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  const loadOrder = () => {
    try {
      setTimeout(() => {
        const savedOrders = localStorage.getItem('petcare-orders');
        const ordersData = savedOrders ? JSON.parse(savedOrders) : [];
        const foundOrder = ordersData.find(o => o.id === params.id);
        setOrder(foundOrder);
        setLoading(false);
        
        if (!foundOrder) {
          // Redirect to orders page if order not found
          router.push('/orders');
        }
      }, 1000);
    } catch (error) {
      console.error('Error loading order:', error);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReorder = () => {
    if (!order) return;
    
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

  const handleCancelOrder = () => {
    if (!order || order.status !== 'confirmed') return;
    
    const savedOrders = localStorage.getItem('petcare-orders');
    const ordersData = savedOrders ? JSON.parse(savedOrders) : [];
    const updatedOrders = ordersData.map(o => 
      o.id === order.id ? { ...o, status: 'cancelled' } : o
    );
    
    localStorage.setItem('petcare-orders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: 'cancelled' });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Orders', href: '/orders' },
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
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <Link
            href="/orders"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Orders
          </Link>
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
                    <Link href="/orders" className="hover:text-blue-600 transition-colors">Orders</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <span className="text-blue-600 font-medium">Order #{order.id}</span>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Order #{order.id}
            </h1>
            <p className="text-gray-600">
              Placed on {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
            <span className="text-xl font-bold text-gray-800">
              ₹{Math.round(order.total).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Tracking</h2>
              <div className="space-y-6">
                {order.tracking.steps.map((step, index) => (
                  <div key={step.status} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {step.completed ? (
                        <span className="text-white text-sm">✓</span>
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
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
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
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
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{order.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span>₹{Math.round(order.tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-green-600">₹{Math.round(order.total).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Delivery Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city} - {order.customer.pincode}</p>
                </div>
                <div>
                  <p>📞 {order.customer.phone}</p>
                  <p>📧 {order.customer.email}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="font-medium">Payment Method</p>
                  <p className="capitalize">{order.payment.paymentMethod}</p>
                  <p className="text-xs font-mono mt-1">{order.payment.transactionId}</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Order Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleReorder}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Reorder Items
                </button>
                {order.status === 'confirmed' && (
                  <button
                    onClick={handleCancelOrder}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Cancel Order
                  </button>
                )}
                <Link
                  href="/orders"
                  className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Orders
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}