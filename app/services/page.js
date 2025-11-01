'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('petcare-auth');
      setIsLoggedIn(!!loggedIn);
    };
    
    checkAuth();
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    router.push('/auth/login');
    setIsMobileMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/auth/signup');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('petcare-auth');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  const services = [
    { 
      name: 'Pet Hostel', 
      link: '/services/pet-hostel', 
      icon: '🏨',
      category: 'boarding',
      description: 'Luxury boarding with 24/7 care, play areas, and premium amenities for your pets',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop',
      features: ['24/7 Supervision', 'Climate Control', 'Daily Exercise', 'Vet on Call'],
      price: 'Starting at ₹800/night',
      rating: 4.9,
      reviews: 1247
    },
    { 
      name: 'Pet Grooming & Spa', 
      link: '/services/grooming-spa', 
      icon: '✂️',
      category: 'grooming',
      description: 'Professional grooming, spa treatments, and wellness services for ultimate pet care',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=400&fit=crop',
      features: ['Haircut & Styling', 'Bubble Bath', 'Nail Trimming', 'Aromatherapy'],
      price: 'Starting at ₹1200',
      rating: 4.8,
      reviews: 892
    },
    { 
      name: 'Pet Transport', 
      link: '/services/pet-transport', 
      icon: '🚗',
      category: 'transport',
      description: 'Safe and comfortable transportation services for your furry friends across cities',
      image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=400&fit=crop',
      features: ['AC Vehicles', 'Safety Harness', 'GPS Tracking', 'Emergency Support'],
      price: 'Starting at ₹15/km',
      rating: 4.7,
      reviews: 567
    },
    { 
      name: 'Pet Insurance', 
      link: '/services/insurance', 
      icon: '🛡️',
      category: 'health',
      description: 'Comprehensive health insurance plans to protect your pets from unexpected medical costs',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
      features: ['Medical Coverage', 'Accident Protection', 'Wellness Plans', 'Quick Claims'],
      price: 'Starting at ₹299/month',
      rating: 4.6,
      reviews: 2341
    },
    { 
      name: 'Pet Training', 
      link: '/services/training', 
      icon: '🎓',
      category: 'training',
      description: 'Professional training programs for obedience, behavior correction, and advanced skills',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      features: ['Basic Obedience', 'Behavior Training', 'Agility Training', 'Puppy Classes'],
      price: 'Starting at ₹1500/session',
      rating: 4.9,
      reviews: 678
    },
    { 
      name: 'Pet Mating', 
      link: '/services/pet-mating', 
      icon: '💕',
      category: 'breeding',
      description: 'Responsible mating services with verified partners and complete genetic screening',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop',
      features: ['Genetic Testing', 'Vet Supervision', 'Documentation', 'Health Guarantee'],
      price: 'Consultation based',
      rating: 4.7,
      reviews: 445
    },
    { 
      name: 'Pet Walking', 
      link: '/services/pet-walking', 
      icon: '🐾',
      category: 'exercise',
      description: 'Daily walking services to keep your pets active, healthy, and mentally stimulated',
      image: 'https://images.unsplash.com/photo-1576201839700-8e1478e6d62c?w=600&h=400&fit=crop',
      features: ['GPS Tracked Walks', 'Daily Reports', 'Group/Solo Walks', 'Training Integration'],
      price: 'Starting at ₹300/walk',
      rating: 4.8,
      reviews: 1123
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'boarding', name: 'Boarding', icon: '🏨' },
    { id: 'grooming', name: 'Grooming', icon: '✂️' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'training', name: 'Training', icon: '🎓' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'breeding', name: 'Breeding', icon: '💕' },
    { id: 'exercise', name: 'Exercise', icon: '🐾' }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Pets', icon: '🐕' },
    { number: '200+', label: 'Expert Staff', icon: '👨‍⚕️' },
    { number: '24/7', label: 'Care Available', icon: '⏰' },
    { number: '98%', label: 'Satisfaction Rate', icon: '⭐' }
  ];

  const processSteps = [
    { step: 1, title: 'Book Service', description: 'Choose your service and schedule online', icon: '📅' },
    { step: 2, title: 'Meet Expert', description: 'Connect with certified pet care professionals', icon: '👥' },
    { step: 3, title: 'Service Delivery', description: 'Receive premium care for your pet', icon: '🎯' },
    { step: 4, title: 'Happy Pet', description: 'Get regular updates and peace of mind', icon: '😊' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      pet: 'Golden Retriever - Max',
      service: 'Pet Hostel',
      rating: 5,
      comment: 'Max absolutely loves staying here! The staff is amazing and the facilities are top-notch.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Rahul Verma',
      pet: 'Persian Cat - Luna',
      service: 'Grooming & Spa',
      rating: 5,
      comment: 'Luna looks beautiful after every grooming session. The spa treatments have improved her coat quality significantly.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Anita Patel',
      pet: 'Labrador - Buddy',
      service: 'Training',
      rating: 4,
      comment: 'Buddy has become so well-behaved after the training sessions. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const faqs = [
    {
      question: "What services do you offer for pets?",
      answer: "We offer comprehensive pet care services including luxury boarding, professional grooming, training programs, safe transportation, health insurance, responsible mating services, and daily walking. Each service is designed to meet your pet's specific needs with certified professionals."
    },
    {
      question: "Are your facilities safe and secure?",
      answer: "Yes, all our facilities are equipped with 24/7 security, CCTV monitoring, fire safety systems, and trained staff. We maintain strict hygiene standards and have emergency protocols in place for your pet's safety."
    },
    {
      question: "Do you provide emergency veterinary care?",
      answer: "We have tie-ups with multiple emergency veterinary clinics and have trained staff for first aid. For serious medical issues, we immediately contact your preferred vet or our partner clinics. Our pet hostel has a vet on call 24/7."
    },
    {
      question: "Can I visit the facility before booking?",
      answer: "Absolutely! We encourage pet parents to visit our facilities, meet our staff, and see the environment where their pets will stay. You can schedule a tour through our website, app, or by calling our customer service."
    },
    {
      question: "What are your operating hours?",
      answer: "Our main facility is open 24/7 for boarding services. Grooming and training services operate from 7 AM to 9 PM. Transport services are available round the clock for emergencies. Customer support is available 24/7 via phone and chat."
    },
    {
      question: "How do I book a service?",
      answer: "You can book services through our website, mobile app, or by calling our customer service. We recommend booking at least 48 hours in advance for grooming and training, and 1 week in advance for boarding during peak seasons."
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleServiceClick = (e, serviceLink) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl"
        >
          🐾
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Login Required</h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Please login to access our premium pet services and book appointments for your furry friends.
              </p>
              <div className="space-y-3 md:space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Go to Login Page
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignup}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm md:text-base"
                >
                  Create New Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLoginModal(false)}
                  className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Enhanced Mobile Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Breadcrumb */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-pink-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm md:text-lg">P</span>
                </motion.div>
                <span className="text-lg md:text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb - Hidden on mobile, shown on desktop */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-pink-500 font-semibold">Services</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 items-center">
              <Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">Home</Link>
              <Link href="/services" className="text-pink-500 font-semibold border-b-2 border-pink-500">Services</Link>
              <Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">Contact</Link>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">Welcome!</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignup}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
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
          <div className="lg:hidden flex items-center space-x-2 text-xs text-gray-500 mt-2">
            <Link href="/" className="hover:text-pink-500 transition-colors flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-pink-50 transition-colors text-gray-700 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">🏠</span>
                    <span>Home</span>
                  </Link>
                  <Link 
                    href="/services" 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-pink-50 text-pink-700 font-semibold text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">🛠️</span>
                    <span>Services</span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-pink-50 transition-colors text-gray-700 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">ℹ️</span>
                    <span>About Us</span>
                  </Link>
                  <Link 
                    href="/contact" 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-pink-50 transition-colors text-gray-700 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">📞</span>
                    <span>Contact</span>
                  </Link>
                  
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 text-gray-700 text-sm">
                          <span className="text-lg">👋</span>
                          <span>Welcome back!</span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          <span className="text-lg">🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleLogin}
                          className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <span>🔐</span>
                          <span>Login</span>
                        </button>
                        <button
                          onClick={handleSignup}
                          className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          <span>📝</span>
                          <span>Sign Up</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 md:py-20 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              Premium Pet Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 px-2"
            >
              {isLoggedIn 
                ? "Complete care solutions for your beloved pets. Professional, loving, and reliable services."
                : "Browse all our services and create account to book appointments for your furry friends."
              }
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
              >
                Explore All Services
              </motion.button>
              {!isLoggedIn && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignup}
                  className="bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
                >
                  Create Account
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-4 md:left-10 text-2xl md:text-4xl opacity-20"
        >
          🐕
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-10 right-4 md:right-10 text-2xl md:text-4xl opacity-20"
        >
          🐈
        </motion.div>
      </section>

      {/* Stats Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-4"
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">{stat.icon}</div>
                <div className="text-xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 md:mb-2">{stat.number}</div>
                <div className="text-gray-700 font-semibold text-xs md:text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">How It Works</h2>
            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-4">
              Simple steps to get the best care for your pet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                {/* Connecting Line - Hidden on mobile */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 -z-10"></div>
                )}
                
                <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-xl md:text-3xl">{step.icon}</span>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-xs md:text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{step.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm md:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Mobile Optimized */}
      <section id="services-grid" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Our Services</h2>
            <p className="text-gray-600 text-sm md:text-lg px-4">
              {isLoggedIn 
                ? "Comprehensive care solutions for every need"
                : "Browse all our services - Create account to book appointments"
              }
            </p>
          </motion.div>

          {/* Login Prompt for Non-Logged In Users */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-6 md:mb-8 p-6 md:p-8 bg-blue-50 rounded-2xl border border-blue-200 mx-4"
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔐</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Create Account to Book Services</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                You can browse all our services below. Create an account to book appointments and access detailed service information.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignup}
                  className="bg-blue-600 text-white px-4 py-3 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base"
                >
                  Create Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  className="border border-blue-600 text-blue-600 px-4 py-3 md:px-6 md:py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm md:text-base"
                >
                  Already have account?
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Category Filters - Mobile Scrollable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12 px-2"
          >
            <div className="flex overflow-x-auto pb-4 space-x-2 md:flex-wrap md:justify-center md:space-x-4 md:overflow-visible hide-scrollbar">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } text-sm md:text-base`}
                >
                  <span>{category.icon}</span>
                  <span className="whitespace-nowrap">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-200"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm">
                        {service.price}
                      </span>
                    </div>
                    {!isLoggedIn && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm flex items-center space-x-1">
                          <span>🔒</span>
                          <span className="hidden sm:inline">Create Account</span>
                          <span className="sm:hidden">Login</span>
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                      <span className="text-xl md:text-2xl">{service.icon}</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">{service.description}</p>
                    
                    <div className="mb-3 md:mb-4">
                      <div className="flex items-center space-x-2 mb-1 md:mb-2">
                        <div className="flex text-yellow-400 text-sm md:text-base">
                          {'★'.repeat(Math.floor(service.rating))}
                          {'☆'.repeat(5 - Math.floor(service.rating))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-600">({service.reviews})</span>
                      </div>
                    </div>

                    <div className="mb-3 md:mb-4">
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs md:text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={isLoggedIn ? service.link : '#'}
                        onClick={(e) => !isLoggedIn && handleServiceClick(e, service.link)}
                        className={`block w-full text-center py-2 md:py-3 rounded-lg transition-colors font-semibold text-sm md:text-base ${
                          isLoggedIn 
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                      >
                        {isLoggedIn ? 'Learn More & Book' : 'Create Account to Book'}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">What Pet Parents Say</h2>
            <p className="text-gray-600 text-sm md:text-lg">
              Real stories from our happy customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.pet}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm md:text-base mb-2 md:mb-3">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="text-gray-600 italic text-xs md:text-sm md:text-base">"{testimonial.comment}"</p>
                <div className="mt-2 md:mt-3 text-xs md:text-sm text-blue-600 font-semibold">
                  Service: {testimonial.service}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm md:text-lg">
              Get answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <motion.span
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 flex-shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 md:px-6 md:pb-4">
                        <p className="text-gray-600 leading-relaxed text-xs md:text-sm md:text-base">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
          >
            {isLoggedIn 
              ? "Ready to Give Your Pet the Best Care?"
              : "Ready to Get Started?"
            }
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-4"
          >
            {isLoggedIn
              ? "Join thousands of happy pet parents who trust us with their furry family members"
              : "Create an account today and book our premium pet care services"
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
                >
                  Book Service Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
                >
                  📞 Call +91 98765 43210
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignup}
                  className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
                >
                  Create Your Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-sm md:text-lg shadow-lg hover:shadow-xl"
                >
                  Browse Services
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">PetCare</h3>
              <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                Your trusted partner for comprehensive pet care services across India.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <span className="text-xl md:text-2xl cursor-pointer hover:text-pink-400 transition-colors">📘</span>
                <span className="text-xl md:text-2xl cursor-pointer hover:text-pink-400 transition-colors">📷</span>
                <span className="text-xl md:text-2xl cursor-pointer hover:text-pink-400 transition-colors">🐦</span>
              </div>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Our Services</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                {services.slice(0, 4).map(service => (
                  <li key={service.name}>
                    <Link href={service.link} className="hover:text-white transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Info</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>hello@petcare.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Pune, Maharashtra, India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>⏰</span>
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 PetCare. All rights reserved. | Made with ❤️ for pets</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}