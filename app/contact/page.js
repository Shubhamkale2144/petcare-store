'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'hello@petcare.com',
      description: 'We reply within 2 hours',
      link: 'mailto:hello@petcare.com',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91 98765 43210',
      description: 'Mon to Sun: 9AM to 9PM',
      link: 'tel:+919876543210',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '+91 98765 43210',
      description: 'Instant messaging',
      link: 'https://wa.me/919876543210',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: '🏢',
      title: 'Visit Office',
      details: 'Pune, Maharashtra',
      description: 'Meet us in person',
      link: '#location',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  const offices = [
    {
      city: 'Pune Headquarters',
      address: '123 PetCare Plaza, Bund Garden Road, Pune, Maharashtra 411001',
      phone: '+91 98765 43210',
      email: 'pune@petcare.com',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
      landmark: 'Near Bund Garden',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format',
      pets: ['Dogs', 'Cats', 'Birds', 'Small Pets']
    },
    {
      city: 'Mumbai Branch',
      address: '456 Marine Drive, Nariman Point, Mumbai, Maharashtra 400021',
      phone: '+91 98765 43211',
      email: 'mumbai@petcare.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
      landmark: 'Overlooking Arabian Sea',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop&auto=format',
      pets: ['Dogs', 'Cats', 'Fish', 'Reptiles']
    },
    {
      city: 'Bangalore Branch',
      address: '789 MG Road, Brigade Road, Bangalore, Karnataka 560001',
      phone: '+91 98765 43212',
      email: 'bangalore@petcare.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
      landmark: 'Heart of the city',
      image: 'https://images.unsplash.com/photo-1567599753820-3d3f5ef27d6a?w=400&h=300&fit=crop&auto=format',
      pets: ['Dogs', 'Cats', 'Exotic Birds', 'Small Mammals']
    }
  ];

  const teamContacts = [
    {
      department: 'Sales & Listings',
      person: 'Anita Sharma',
      role: 'Sales Manager',
      email: 'sales@petcare.com',
      phone: '+91 98765 43213',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      expertise: ['Pet Adoption', 'Breeder Relations', 'Listing Management']
    },
    {
      department: 'Customer Support',
      person: 'Rahul Verma',
      role: 'Support Lead',
      email: 'support@petcare.com',
      phone: '+91 98765 43214',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      expertise: ['Customer Care', 'Issue Resolution', '24/7 Support']
    },
    {
      department: 'Veterinary Services',
      person: 'Dr. Priya Patel',
      role: 'Chief Veterinarian',
      email: 'vet@petcare.com',
      phone: '+91 98765 43215',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      expertise: ['Health Checkups', 'Vaccinations', 'Emergency Care']
    }
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond within 2-4 hours during business hours. For urgent matters, please call us directly.'
    },
    {
      question: 'Do you provide emergency pet care services?',
      answer: 'Yes, we have 24/7 emergency support for critical pet care situations. Call our emergency line for immediate assistance.'
    },
    {
      question: 'Can I visit your office without an appointment?',
      answer: 'While appointments are preferred, walk-ins are welcome during business hours. We recommend calling ahead to ensure availability.'
    },
    {
      question: 'What types of pets do you work with?',
      answer: 'We work with all types of pets including dogs, cats, birds, fish, reptiles, and small mammals. Our experts are trained for various species.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Mehta',
      role: 'Pet Parent',
      content: 'PetCare helped me find the perfect Labrador for my family. The verification process gave us complete peace of mind.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Sunita Reddy',
      role: 'Breeder',
      content: 'As a responsible breeder, I appreciate the platform\'s commitment to ethical practices and animal welfare.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      role: 'Veterinary Partner',
      content: 'Partnering with PetCare has allowed us to reach more pet owners and provide quality care to their beloved pets.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4
    }
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (!value) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))) {
          newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'subject':
        if (!value.trim()) {
          newErrors.subject = 'Subject is required';
        } else {
          delete newErrors.subject;
        }
        break;

      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const isFormValid = Object.keys(formData).every(key => 
      validateField(key, formData[key])
    );

    if (!isFormValid) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                     Object.keys(formData).every(key => formData[key].trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition-all duration-300 shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Desktop Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-purple-600 font-semibold">Contact Us</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/food" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Pet Food</Link>
              <Link href="/veterinarians" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Veterinarians</Link>
              <Link href="/products" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Products</Link>
              <Link href="/sell-your-pet" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Sell Your Pet</Link>
              <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-purple-600 font-semibold border-b-2 border-purple-600">Contact</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center space-x-2 text-sm text-gray-500 mt-3">
            <Link href="/" className="hover:text-purple-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/food" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">🍖</span>
                  <span>Pet Food</span>
                </Link>
                <Link 
                  href="/veterinarians" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">🩺</span>
                  <span>Veterinarians</span>
                </Link>
                <Link 
                  href="/products" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">🛍️</span>
                  <span>Products</span>
                </Link>
                <Link 
                  href="/sell-your-pet" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">🐾</span>
                  <span>Sell Your Pet</span>
                </Link>
                <Link 
                  href="/about" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">ℹ️</span>
                  <span>About Us</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 text-purple-700 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">📞</span>
                  <span>Contact</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-16 md:py-24 bg-purple-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=800&fit=crop')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-6 md:mb-8 text-purple-100 drop-shadow">
              We're here to help you and your furry friends. Reach out anytime!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-purple-700 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>
              <button 
                onClick={() => document.getElementById('location').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-300 font-bold text-lg hover:shadow-xl transform hover:scale-105"
              >
                Visit Our Offices
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-30 animate-ping"></div>
      </section>

      {/* Contact Methods with Enhanced Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Multiple Ways to Connect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose your preferred method to get in touch with our pet care experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className={`${method.bgColor} rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 group border border-transparent hover:border-white`}
                onClick={method.title === 'Visit Office' ? (e) => {
                  e.preventDefault();
                  document.getElementById('location').scrollIntoView({ behavior: 'smooth' });
                } : undefined}
              >
                <div className={`text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 ${method.iconColor}`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">{method.title}</h3>
                <p className="text-gray-700 font-semibold mb-1 text-lg">{method.details}</p>
                <p className="text-gray-600">{method.description}</p>
                <div className="mt-4 w-12 h-1 bg-purple-400 mx-auto rounded-full group-hover:w-16 transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info with Enhanced Design */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-100 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-6">We'll get back to you within 2 hours</p>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-green-500 text-lg mr-2">✅</span>
                      <span className="text-green-700">Thank you! Your message has been sent successfully.</span>
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-red-500 text-lg mr-2">⚠️</span>
                      <span className="text-red-700">{errors.submit}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.name && touched.name 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && touched.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.email && touched.email 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.phone && touched.phone 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                        placeholder="10-digit phone number"
                        maxLength="10"
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.subject && touched.subject 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="selling">Selling a Pet</option>
                        <option value="adoption">Pet Adoption</option>
                        <option value="services">Our Services</option>
                        <option value="support">Customer Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && touched.subject && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        errors.message && touched.message 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                      placeholder="Tell us how we can help you and your pet..."
                    />
                    {errors.message && touched.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message 🚀'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Team Contacts with Images */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
                <div className="space-y-6">
                  {teamContacts.map((contact, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                      <div className="flex-shrink-0">
                        <Image
                          src={contact.image}
                          alt={contact.person}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-purple-200"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{contact.department}</h3>
                        <p className="text-purple-600 font-medium mb-2">
                          {contact.person} - {contact.role}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-500">📧</span>
                            <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-purple-600">
                              {contact.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-500">📞</span>
                            <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-purple-600">
                              {contact.phone}
                            </a>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {contact.expertise.map((skill, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-purple-600 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Why Pet Owners Love Us</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-purple-200">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-purple-200">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">4.9/5</div>
                    <div className="text-purple-200">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">25K+</div>
                    <div className="text-purple-200">Happy Pets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Office Locations with Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Pet-Friendly Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Visit us at any of our conveniently located offices across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={office.image}
                    alt={office.city}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {office.city.includes('Headquarters') ? '🏠 HQ' : '🏢 Branch'}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{office.city}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-500 mt-1 flex-shrink-0">📍</span>
                      <div>
                        <p className="text-gray-700 font-medium">Address</p>
                        <p className="text-gray-600 text-sm">{office.address}</p>
                        <p className="text-purple-600 text-sm mt-1 font-medium">{office.landmark}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-500">📞</span>
                      <div>
                        <p className="text-gray-700 font-medium">Phone</p>
                        <a href={`tel:${office.phone}`} className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          {office.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-500">📧</span>
                      <div>
                        <p className="text-gray-700 font-medium">Email</p>
                        <a href={`mailto:${office.email}`} className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          {office.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-500 mt-1">🕒</span>
                      <div>
                        <p className="text-gray-700 font-medium">Business Hours</p>
                        <p className="text-gray-600 text-sm">{office.hours}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-gray-700 font-medium mb-2">Pet Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {office.pets.map((pet, idx) => (
                          <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {pet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Pet Parents Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from our community of happy pet owners and partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < testimonial.rating 
                              ? 'text-yellow-500' 
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Google Maps Section */}
      <section id="location" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Us on Map</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Visit our headquarters in Pune - easily accessible from all parts of the city
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Real Google Maps Embed */}
              <div className="h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.85741641538485!3d18.564061872538724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c065144d8edf%3A0x3703b8095866c54b!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1648085942413!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PetCare Pune Office Location"
                ></iframe>
              </div>
              <div className="p-6 bg-purple-600 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">PetCare Headquarters</h3>
                    <p className="opacity-90">123 PetCare Plaza, Bund Garden Road, Pune, Maharashtra 411001</p>
                    <div className="flex flex-wrap items-center space-x-4 text-sm opacity-80 mt-2">
                      <span className="flex items-center">📍 Near Bund Garden</span>
                      <span className="flex items-center">🅿️ Parking Available</span>
                      <span className="flex items-center">🚉 2km from Railway Station</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Quick answers to common questions about our services</p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-purple-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-purple-500 mr-3">❓</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-purple-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
            Whether you're looking to sell a pet, adopt a new furry friend, or explore our services, 
            we're here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sell-your-pet"
              className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🐾 Sell Your Pet
            </Link>
            <Link 
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-300 font-medium hover:shadow-xl transform hover:scale-105"
            >
              🛍️ Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PetCare</h3>
              <p className="text-gray-400 mb-4">
                India's most trusted pet care platform. Connecting loving homes with deserving pets.
              </p>
              <div className="flex space-x-4">
                <span className="text-2xl cursor-pointer hover:text-purple-400 transition-colors">📘</span>
                <span className="text-2xl cursor-pointer hover:text-purple-400 transition-colors">📷</span>
                <span className="text-2xl cursor-pointer hover:text-purple-400 transition-colors">🐦</span>
                <span className="text-2xl cursor-pointer hover:text-purple-400 transition-colors">💼</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/sell-your-pet" className="hover:text-white transition-colors">Sell Your Pet</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>hello@petcare.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Pune, Maharashtra</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>🕒</span>
                  <span>24/7 Support</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCare. All rights reserved. | Made with ❤️ for pets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}