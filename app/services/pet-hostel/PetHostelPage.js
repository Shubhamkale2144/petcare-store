'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetHostelPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petType: 'Dogs',
    breed: '',
    petGender: '',
    petAge: '',
    city: '',
    message: '',
    packageType: 'daily'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedPackageType, setSelectedPackageType] = useState('daily');

  const hostelImages = [
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1591946653350-20dae00fae6b?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1576201839709-60a61a82b078?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1593134257782-e89567b77168?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1558788353-f76ad8d7b3e9?w=800&h=600&fit=crop&auto=format'
  ];

  const careImages = [
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&auto=format'
  ];

  const maharashtraCities = [
    'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 
    'Kolhapur', 'Amravati', 'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Dhule',
    'Ahmednagar', 'Chandrapur', 'Parbhani', 'Jalna', 'Bhiwandi', 'Panvel'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % hostelImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your inquiry! Our pet care expert will contact you shortly.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        petType: 'Dogs',
        breed: '',
        petGender: '',
        petAge: '',
        city: '',
        message: '',
        packageType: 'daily'
      });
    }, 2000);
  };

  const dailyPackages = [
    {
      name: 'Starter',
      price: '₹ 599',
      duration: 'Per Day',
      features: [
        'Ideal for pups aged 3 to 8 months',
        'Daily feeding (2 meals)',
        'Daily potty breaks (4 times)',
        'Basic supervision',
        'Basic grooming (brushing)',
        'Bedding provided',
        'Water available 24/7'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Standard',
      price: '₹ 999',
      duration: 'Per Day',
      features: [
        'Everything in Starter +',
        'Ideal for pups above 8 months',
        'Enrichment activities (toys & puzzles)',
        'Photo/video updates (2 daily)',
        'Basic training reinforcement',
        'Play area access',
        'Health monitoring'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Premium',
      price: '₹ 1199',
      duration: 'Per Day',
      features: [
        'Everything in Standard +',
        'One-on-one time with staff',
        'Extra comfortable accommodation',
        '2–3 daily walks/playtime sessions',
        'Bath or grooming services',
        'Climate-controlled room',
        'Training sessions & refreshers',
        'Vet visits facility available'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const monthlyPackages = [
    {
      name: 'Basic Monthly',
      price: '₹ 12,999',
      duration: 'Per Month',
      originalPrice: '₹ 17,997',
      savings: 'Save ₹ 4,998',
      features: [
        'All Starter package features',
        '30 days boarding',
        'Weekly health checkup',
        'Monthly grooming session',
        'Diet planning included',
        'Emergency vet support',
        'Free pickup & drop (within city)'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Standard Monthly',
      price: '₹ 22,999',
      duration: 'Per Month',
      originalPrice: '₹ 29,997',
      savings: 'Save ₹ 6,998',
      features: [
        'All Standard package features',
        '30 days premium boarding',
        'Twice weekly health checkup',
        'Weekly grooming sessions',
        'Personalized diet plan',
        'Training sessions included',
        'Free pickup & drop (within city)',
        'Photo updates daily'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Premium Monthly',
      price: '₹ 29,999',
      duration: 'Per Month',
      originalPrice: '₹ 35,997',
      savings: 'Save ₹ 5,998',
      features: [
        'All Premium package features',
        'Luxury suite accommodation',
        'Daily health monitoring',
        'Professional grooming weekly',
        'Advanced training program',
        '24/7 vet on call',
        'Free pickup & drop (50km radius)',
        'Live camera access',
        'Spa treatments monthly'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const processSteps = [
    {
      icon: '📞',
      title: 'Get in Touch',
      description: 'Call us or fill out the form, our pet care expert will reach out to you shortly.'
    },
    {
      icon: '🐕',
      title: 'Share the Details',
      description: 'Tell your pet\'s needs, hostel, boarding, or sitter, and get all the info you need.'
    },
    {
      icon: '💳',
      title: 'Pay & Relax',
      description: 'Confirm your booking and relax, we\'ll pamper your fur baby with love and care.'
    }
  ];

  const whyChooseUs = [
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: '24/7 CCTV monitoring, secure premises, and emergency protocols'
    },
    {
      icon: '👨‍⚕️',
      title: 'Vet Verified',
      description: 'All hostels are verified by veterinary professionals'
    },
    {
      icon: '🏠',
      title: 'Home-like Environment',
      description: 'Comfortable, stress-free environment for your pets'
    },
    {
      icon: '📱',
      title: 'Daily Updates',
      description: 'Regular photo and video updates of your pet'
    },
    {
      icon: '🚗',
      title: 'Free Transport',
      description: 'Pickup and drop service available in most cities'
    },
    {
      icon: '⭐',
      title: 'Experienced Staff',
      description: 'Trained and certified pet care professionals'
    }
  ];

  const careFeatures = [
    {
      icon: '❄️',
      title: 'Air-Conditioned Rooms',
      description: 'Climate-controlled environments for optimal comfort'
    },
    {
      icon: '🛏️',
      title: 'Premium Bedding',
      description: 'Orthopedic beds and comfortable sleeping arrangements'
    },
    {
      icon: '🛁',
      title: 'Grooming Services',
      description: 'Regular bathing, brushing, and hygiene maintenance'
    },
    {
      icon: '📹',
      title: '24x7 CCTV Monitoring',
      description: 'Round-the-clock surveillance for complete safety'
    },
    {
      icon: '🍖',
      title: 'Quality Food',
      description: 'Premium pet food with customized diet plans'
    },
    {
      icon: '⚕️',
      title: 'Medical Care',
      description: 'On-call veterinary services and medication management'
    }
  ];

  const termsConditions = [
    'All pets must be vaccinated and provide health certificates',
    'Booking confirmation subject to availability',
    'Cancellation 48 hours prior for full refund',
    'Medical emergencies handled with prior consent',
    'Pet behavior assessment required for first-time guests',
    'Additional charges may apply for special requirements'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/services" className="hover:text-orange-500 transition-colors">Services</Link>
                <span className="text-gray-300">/</span>
                <span className="text-orange-500 font-semibold">Pet Hostel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
                🏨 Pet Hostel Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Pet's Purrrrrfect Staycation!
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Dog Hostel Services Across Maharashtra<br />
                <span className="font-semibold text-orange-600">
                  Safe & Verified | 10000+ Trusted | Affordable | Comfortable | No.1 in Maharashtra
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Now 🐾
                </button>
                <Link 
                  href="/become-provider"
                  className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  Become Provider
                </Link>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {hostelImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pet Hostel ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {hostelImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-orange-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Do Pet Parents Choose Us?
            </h2>
            <p className="text-gray-600 text-lg">The reasons why thousands of pet parents trust us with their furry family members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Hostels Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Luxury & Air-Conditioned Pet Hostels Near You
              </h2>
              <p className="text-lg text-gray-600">
                For pet parents who want extra pampering:
              </p>
              <div className="space-y-4">
                {careFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl text-orange-500 mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your pet will feel safe, loved, and right at home. So whether you're heading out on a trip, 
                stuck at work, or need a break, you can count on us to keep your pet safe, pampered, and loved. 
                We offer India's largest chain of the best dog hostels, including air-conditioned, luxury, and 
                24x7 pet boarding options. Connect with us, and our pet care expert will guide you to the perfect 
                solution, be it a dog hostel with food, a short-term stay, or a long-term care hostel tailored to your pet's needs.
              </p>
            </div>

            {/* Right Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {careImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
                    index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Pet Care ${index + 1}`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose the Best Package For Your Pet's Stay
            </h2>
            <p className="text-gray-600 text-lg">Flexible packages for every need and duration</p>
            
            {/* Package Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setSelectedPackageType('daily')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    selectedPackageType === 'daily'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Daily Packages
                </button>
                <button
                  onClick={() => setSelectedPackageType('monthly')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    selectedPackageType === 'monthly'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Monthly Packages
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(selectedPackageType === 'daily' ? dailyPackages : monthlyPackages).map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 border-2 ${
                  pkg.popular ? 'border-orange-400 shadow-2xl' : 'shadow-xl'
                } ${pkg.color}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{pkg.price}</div>
                  <div className="text-gray-600 mb-2">{pkg.duration}</div>
                  {pkg.savings && (
                    <div className="text-green-600 font-semibold text-sm">{pkg.savings}</div>
                  )}
                  {pkg.originalPrice && (
                    <div className="text-gray-500 line-through text-sm">{pkg.originalPrice}</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setFormData({...formData, packageType: selectedPackageType});
                    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            *Service completion is subject to availability of service provider. All prices include GST.
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Quick Easy Process
            </h2>
            <p className="text-gray-600 text-lg">
              Get Safe, Secure and Welcoming environment for your furry companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center p-6 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                <div className="text-2xl text-orange-500 mt-4 font-bold">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Terms & Conditions
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <ul className="space-y-4">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700">{term}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Additional Information:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Check-in time: 2:00 PM | Check-out time: 11:00 AM</li>
                <li>• Late check-out charges may apply after 1:00 PM</li>
                <li>• Bring your pet's favorite food and medication if any</li>
                <li>• Emergency contact information must be provided</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Pet's Stay</h2>
              <p className="text-gray-600 mb-6">Fill out the form and we'll get back to you within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone No *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Id</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    placeholder="Your email address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                    <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    >
                      <option value="daily">Daily Package</option>
                      <option value="monthly">Monthly Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    >
                      <option value="Dogs">Dogs</option>
                      <option value="Cats">Cats</option>
                      <option value="Birds">Birds</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                      placeholder="Pet breed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet Gender</label>
                    <select
                      name="petGender"
                      value={formData.petGender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet's Age</label>
                    <input
                      type="text"
                      name="petAge"
                      value={formData.petAge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                      placeholder="e.g., 2 years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                    >
                      <option value="">Select your city</option>
                      {maharashtraCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leave a message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white resize-none"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" required className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                  <span className="text-sm text-gray-600">By clicking here you agree to our terms and policy.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Service Coverage</h3>
                <p className="text-gray-600 mb-4">
                  We extend our professional pet care services across Maharashtra from rural to urban areas. We've got it all covered.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {maharashtraCities.slice(0, 8).map(city => (
                    <div key={city} className="flex items-center space-x-2 text-gray-700">
                      <span className="text-orange-500">📍</span>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety & Security</h3>
                <p className="text-gray-600 mb-4">
                  Your pet's safety is our top priority with comprehensive security measures.
                </p>
                <div className="space-y-3">
                  {['24/7 CCTV Monitoring', 'Trained Staff', 'Emergency Vet Access', 'Secure Premises', 'Health Insurance'].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-green-500">✅</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🐾 PetCare</h3>
              <p className="text-gray-400">Your pet's home away from home. Safe, comfortable, and loving care across Maharashtra.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/pet-hostel" className="hover:text-white">Pet Hostel</Link></li>
                <li><Link href="/services/pet-grooming" className="hover:text-white">Pet Grooming</Link></li>
                <li><Link href="/services/pet-training" className="hover:text-white">Pet Training</Link></li>
                <li><Link href="/services/pet-insurance" className="hover:text-white">Pet Insurance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 hello@petcare.com</li>
                <li>📍 Serving Across Maharashtra</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 text-sm"
                />
                <button className="bg-orange-500 px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PetCare. All rights reserved. Made with ❤️ for pets</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}