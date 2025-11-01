'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetTransportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relocationType: '',
    departureState: '',
    departureCity: '',
    destinationState: '',
    destinationCity: '',
    expectedDate: '',
    transportMode: '',
    petBreed: '',
    petGender: '',
    petAge: '',
    vaccinationStatus: '',
    travelFriendly: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const transportImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&auto=format'
  ];

  const processSteps = [
    {
      icon: '📋',
      title: 'Documentation & Planning',
      description: 'We handle all paperwork, health certificates, and travel permits'
    },
    {
      icon: '🏠',
      title: 'Home Pickup',
      description: 'Safe and comfortable pickup from your doorstep'
    },
    {
      icon: '✈️',
      title: 'Safe Transportation',
      description: 'Climate-controlled vehicles with trained staff'
    },
    {
      icon: '🏡',
      title: 'Home Delivery',
      description: 'Safe delivery to your new location'
    }
  ];

  const transportTypes = [
    {
      icon: '🚗',
      title: 'ROAD TRANSPORT',
      description: 'Comfortable AC vehicles with regular breaks',
      features: ['Door-to-door service', 'Regular comfort breaks', 'Climate control', 'Live tracking']
    },
    {
      icon: '🚆',
      title: 'RAIL TRANSPORT',
      description: 'Pet-friendly railway services across India',
      features: ['Dedicated pet compartments', 'Regular monitoring', 'Food & water provided', 'Vet on call']
    },
    {
      icon: '🚢',
      title: 'SHIP TRANSPORT',
      description: 'Safe maritime transport for coastal relocations',
      features: ['Special pet cabins', '24/7 supervision', 'Weather monitoring', 'Emergency protocols']
    },
    {
      icon: '✈️',
      title: 'AIR TRANSPORT',
      description: 'Quick and safe air travel for long distances',
      features: ['IATA certified crates', 'Pre-flight vet check', 'Priority handling', 'Climate-controlled cargo']
    }
  ];

  const stats = [
    { number: '1000+', label: 'Happy Deliveries', icon: '🐕' },
    { number: '200+', label: 'Destinations', icon: '📍' },
    { number: '4.9/5', label: 'Star Reviews', icon: '⭐' },
    { number: '50K+', label: 'Unique Visitors', icon: '👥' }
  ];

  const paperworkRequirements = [
    'Health Certificate from Registered Vet',
    'Vaccination Records (Rabies, DHPP, etc.)',
    'Pet Identity & Ownership Proof',
    'Transport Permits & NOCs',
    'Airline/Transport Specific Documents',
    'Import/Export Certificates (if applicable)'
  ];

  const termsConditions = [
    'All pets must be vaccinated at least 2 weeks before travel',
    'Health certificate validity: 10 days from issue date',
    'Cancellation 72 hours prior for full refund',
    'Pets must be at least 8 weeks old for transport',
    'Additional charges for special needs or medications',
    'Owner must provide food for specialized diets'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length);
    }, 3000);
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
      alert('Thank you for your inquiry! Our pet transport expert will contact you shortly.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        relocationType: '',
        departureState: '',
        departureCity: '',
        destinationState: '',
        destinationCity: '',
        expectedDate: '',
        transportMode: '',
        petBreed: '',
        petGender: '',
        petAge: '',
        vaccinationStatus: '',
        travelFriendly: '',
        note: ''
      });
    }, 2000);
  };

  const indianStates = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Gujarat',
    'Rajasthan', 'Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Bihar'
  ];

  const cities = {
    'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Thane'],
    'Delhi': ['New Delhi', 'Dwarka', 'Rohini'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
    'Haryana': ['Gurgaon', 'Faridabad', 'Panipat'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur']
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/services" className="hover:text-blue-500 transition-colors">Services</Link>
                <span className="text-gray-300">/</span>
                <span className="text-blue-500 font-semibold">Pet Transport</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
                🚚 Pet Transport Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Safe Pet Transportation Across India
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Been the most trusted and widest network of Pet shipping across India since 2018.
                <span className="font-semibold text-blue-600 block mt-2">
                  Trusted | Professional | Safe | 1000+ Happy Pets
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Quote 🐾
                </button>
                <Link 
                  href="/contact"
                  className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={transportImages[0]}
                  alt="Pet Transportation"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Trusted Pet Relocation Since 2018
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We have gained trust and recognition all over India due to our honest and dedicated pet relocation services over all these years. Our experts will relocate your pet safely anywhere in India with the utmost care and comfort. We have helped safely deliver 1,000+ pets across the globe.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <p className="text-lg text-gray-700 text-center">
              We offer expert, authentic, and advanced pet transportation services with affordable solutions to all pet parents. We intend to help people who want to take their pets along with them anywhere in India. We provide complete guidance for relocating your pet with 24*7 professional assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Transport Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Type of Transportation
            </h2>
            <p className="text-gray-600 text-lg">You can trust us with your pet across all modes of transport</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {transportTypes.map((type, index) => (
              <div
                key={type.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4 animate-bounce">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{type.description}</p>
                <ul className="space-y-2 text-left">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 max-w-4xl mx-auto">
            <p className="text-gray-600">
              We work with trusted transport services on the road, rail, ship, and air for a hassle-free process. Every step of the way, no matter the distance, you can count on us to provide the compassionate care and attention they need. We ensure your pet's safety and minimize its inconvenience throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* Process Animation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How We Move Your Pet
            </h2>
            <p className="text-gray-600 text-lg">Seamless process from pickup to delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`text-center p-6 rounded-2xl transition-all duration-500 ${
                  index === currentStep
                    ? 'bg-blue-500 text-white shadow-2xl transform scale-105'
                    : 'bg-gray-50 text-gray-800 shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-2xl font-bold mb-2">{index + 1}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-4xl mx-auto">
            <p className="text-gray-600 mb-6">
              With utmost care and comfort, our experts take all the responsibility to relocate your pet safely, anywhere in India. In stressful situations, we help your pet become familiar with the kennel and crate and offer treats to ease separation anxiety. Whether you plan to go on vacations, job transfers or moving to a different state, we help you relocating your pet with complete security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl">👨‍⚕️</div>
                <div>
                  <h4 className="font-bold text-gray-800">Quality checks by a vet</h4>
                  <p className="text-sm text-gray-600">Pre and post travel health checks</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-bold text-gray-800">24*7 complete guidance</h4>
                  <p className="text-sm text-gray-600">Round the clock support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl">🚪</div>
                <div>
                  <h4 className="font-bold text-gray-800">Doorstep services</h4>
                  <p className="text-sm text-gray-600">Pickup and delivery at your location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2 animate-pulse">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paperwork Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Required Paperwork & Documentation
            </h2>
            <p className="text-gray-600 text-lg">We handle all the necessary documentation for smooth pet relocation</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paperworkRequirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{req}</h4>
                    <p className="text-sm text-gray-600 mt-1">We help you obtain and verify all documents</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-3">📋 Important Documentation Notes:</h4>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• Start documentation process at least 2 weeks before travel</li>
                <li>• International travel requires additional permits and quarantine planning</li>
                <li>• Some airlines require specific health certificates</li>
                <li>• Keep digital and physical copies of all documents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Concerns Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              We Understand Your Pet's Travel Concerns
            </h2>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <p className="text-lg text-gray-700 text-center mb-6">
              With us, you have no reason to worry about your pet's safety and comfort. We ensure that your pet receives the best care and is comfortable throughout the journey. For safe and secure pet relocation, whether you own a dog, a cat, a guinea pig, a hamster or a rabbit, you can trust our experienced team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-center space-x-3">
                <div className="text-2xl text-green-500">✅</div>
                <div>
                  <h4 className="font-bold text-gray-800">Stress-free Travel</h4>
                  <p className="text-sm text-gray-600">We minimize anxiety with familiar items</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl text-green-500">✅</div>
                <div>
                  <h4 className="font-bold text-gray-800">Regular Updates</h4>
                  <p className="text-sm text-gray-600">Photos and status updates during journey</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl text-green-500">✅</div>
                <div>
                  <h4 className="font-bold text-gray-800">Emergency Support</h4>
                  <p className="text-sm text-gray-600">24/7 vet support during transit</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl text-green-500">✅</div>
                <div>
                  <h4 className="font-bold text-gray-800">Comfort Stops</h4>
                  <p className="text-sm text-gray-600">Regular breaks for food and exercise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Your Pet Transport Quote
              </h2>
              <p className="text-gray-600 text-lg">
                Hey! Still not found what you are looking for? No worries!! Let our pet experts come to your rescue.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Pet Parent Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Pet Parent Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Relocation Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Relocation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relocation Type</label>
                      <select
                        name="relocationType"
                        value={formData.relocationType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select Type</option>
                        <option value="domestic">Domestic</option>
                        <option value="international">International</option>
                        <option value="temporary">Temporary</option>
                        <option value="permanent">Permanent Move</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Departure State</label>
                      <select
                        name="departureState"
                        value={formData.departureState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Departure City</label>
                      <select
                        name="departureCity"
                        value={formData.departureCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select City</option>
                        {formData.departureState && cities[formData.departureState]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination State</label>
                      <select
                        name="destinationState"
                        value={formData.destinationState}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination City</label>
                      <select
                        name="destinationCity"
                        value={formData.destinationCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select City</option>
                        {formData.destinationState && cities[formData.destinationState]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Date</label>
                      <input
                        type="date"
                        name="expectedDate"
                        value={formData.expectedDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Transport Mode */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Relocation Mode Preference:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Bus', 'Car', 'Train', 'Flight'].map((mode) => (
                        <label key={mode} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                          <input
                            type="radio"
                            name="transportMode"
                            value={mode.toLowerCase()}
                            onChange={handleInputChange}
                            className="text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pet Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Pet Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet Breed</label>
                      <select
                        name="petBreed"
                        value={formData.petBreed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select Breed</option>
                        <option value="labrador">Labrador</option>
                        <option value="german-shepherd">German Shepherd</option>
                        <option value="persian">Persian Cat</option>
                        <option value="siamese">Siamese Cat</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet's Gender</label>
                      <select
                        name="petGender"
                        value={formData.petGender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet's Age</label>
                      <input
                        type="text"
                        name="petAge"
                        value={formData.petAge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., 2 years"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vaccination Status</label>
                      <select
                        name="vaccinationStatus"
                        value={formData.vaccinationStatus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select Status</option>
                        <option value="up-to-date">Up to Date</option>
                        <option value="needs-update">Needs Update</option>
                        <option value="not-vaccinated">Not Vaccinated</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Is your pet travel friendly?</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="travelFriendly"
                          value="yes"
                          onChange={handleInputChange}
                          className="text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="travelFriendly"
                          value="no"
                          onChange={handleInputChange}
                          className="text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="travelFriendly"
                          value="unsure"
                          onChange={handleInputChange}
                          className="text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Not Sure</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Any special requirements, medical conditions, or additional notes..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Terms & Conditions
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            <ul className="space-y-4">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-gray-700">{term}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">📞 Need Help with Documentation?</h4>
              <p className="text-green-700 text-sm">
                Our team assists you with all paperwork, from health certificates to transport permits. 
                Contact us for complete documentation support.
              </p>
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
              <p className="text-gray-400">Safe and reliable pet transportation services across India since 2018.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/pet-transport" className="hover:text-white">Pet Transport</Link></li>
                <li><Link href="/services/pet-hostel" className="hover:text-white">Pet Hostel</Link></li>
                <li><Link href="/services/pet-grooming" className="hover:text-white">Pet Grooming</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 transport@petcare.com</li>
                <li>📍 Pan India Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Emergency</h4>
              <div className="text-gray-400">
                <p>24/7 Support Available</p>
                <p className="text-sm mt-1">For urgent pet transport needs</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PetCare. All rights reserved. Made with ❤️ for pets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}