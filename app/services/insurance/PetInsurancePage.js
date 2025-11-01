'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetInsurancePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    petType: '',
    breed: '',
    gender: '',
    petName: '',
    age: '',
    healthCondition: '',
    vaccinationStatus: '',
    coverageAmount: '',
    previousPolicy: '',
    medicalHistory: '',
    insurancePreference: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const insuranceImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&auto=format'
  ];

  const insurancePackages = [
    {
      name: 'Basic Care',
      price: '₹ 499',
      duration: 'Per Month',
      coverage: 'Up to ₹ 50,000',
      features: [
        'Accident Coverage',
        'Basic Illness Coverage',
        'Emergency Care',
        '24/7 Vet Helpline',
        'Claim Processing'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Standard Care',
      price: '₹ 899',
      duration: 'Per Month',
      coverage: 'Up to ₹ 1,00,000',
      features: [
        'All Basic features +',
        'Comprehensive Illness Coverage',
        'Routine Checkups',
        'Vaccination Coverage',
        'Diagnostic Tests',
        'Medicine Coverage'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Premium Care',
      price: '₹ 1,499',
      duration: 'Per Month',
      coverage: 'Up to ₹ 2,50,000',
      features: [
        'All Standard features +',
        'Dental Care',
        'Surgery Coverage',
        'Chronic Conditions',
        'Alternative Therapies',
        'Behavioral Therapy',
        'Rehabilitation'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      name: 'Ultimate Care',
      price: '₹ 2,499',
      duration: 'Per Month',
      coverage: 'Up to ₹ 5,00,000',
      features: [
        'All Premium features +',
        'Cancer Treatment',
        'International Coverage',
        'Pet Funeral Services',
        'Lost Pet Advertising',
        'Boarding Fees Coverage',
        '24/7 Emergency Service'
      ],
      popular: false,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const annualPackages = [
    {
      name: 'Basic Annual',
      price: '₹ 4,999',
      duration: 'Per Year',
      originalPrice: '₹ 5,988',
      savings: 'Save ₹ 989',
      coverage: 'Up to ₹ 50,000',
      features: [
        '2 Free Health Checkups',
        'Vaccination Coverage',
        'Accident Protection',
        'Basic Illness Cover',
        'Annual Dental Cleaning'
      ]
    },
    {
      name: 'Standard Annual',
      price: '₹ 9,999',
      duration: 'Per Year',
      originalPrice: '₹ 11,988',
      savings: 'Save ₹ 1,989',
      coverage: 'Up to ₹ 1,00,000',
      features: [
        '4 Free Health Checkups',
        'Complete Vaccination',
        'Surgery Coverage',
        'Diagnostic Tests',
        'Medicine Coverage'
      ]
    },
    {
      name: 'Premium Annual',
      price: '₹ 14,999',
      duration: 'Per Year',
      originalPrice: '₹ 17,988',
      savings: 'Save ₹ 2,989',
      coverage: 'Up to ₹ 2,50,000',
      features: [
        '6 Free Health Checkups',
        'Comprehensive Coverage',
        'Chronic Disease Cover',
        'Alternative Therapy',
        'Emergency Services'
      ]
    }
  ];

  const coverageOptions = [
    {
      icon: '🚑',
      title: 'Accident Coverage',
      description: 'Emergency treatments for accidents and injuries'
    },
    {
      icon: '🏥',
      title: 'Illness Coverage',
      description: 'Comprehensive coverage for various illnesses'
    },
    {
      icon: '🩺',
      title: 'Routine Checkups',
      description: 'Regular health examinations and preventive care'
    },
    {
      icon: '💉',
      title: 'Vaccination & Preventative Care',
      description: 'Vaccinations and preventive treatments'
    },
    {
      icon: '🦷',
      title: 'Dental Care',
      description: 'Dental cleaning, extractions, and oral treatments'
    },
    {
      icon: '🛡️',
      title: 'Comprehensive Coverage',
      description: 'Complete protection including chronic conditions'
    }
  ];

  const processSteps = [
    {
      icon: '📝',
      title: 'Get Quote',
      description: 'Fill simple form and get instant insurance quote'
    },
    {
      icon: '🏥',
      title: 'Health Check',
      description: 'Quick health assessment for your pet'
    },
    {
      icon: '📄',
      title: 'Choose Plan',
      description: 'Select the perfect insurance plan for your pet'
    },
    {
      icon: '🎉',
      title: 'Get Covered',
      description: 'Your pet is now protected and insured'
    }
  ];

  const policyDetails = [
    'Waiting Period: 15 days for illness, 48 hours for accidents',
    'Pre-existing conditions not covered',
    'Annual deductible: ₹ 2,500 for Basic, ₹ 5,000 for Standard, ₹ 7,500 for Premium',
    'Claim settlement within 7 working days',
    'Network of 5000+ veterinary hospitals across India',
    'Cashless treatment available at network hospitals'
  ];

  const termsConditions = [
    'Pets must be between 8 weeks and 8 years old for new policies',
    'Annual health checkup mandatory for policy renewal',
    'Vaccination records must be up to date',
    '30-day free look period after policy purchase',
    'Premium increases by 10% after pet turns 8 years',
    'Policy can be transferred to new owner if pet is sold'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % insuranceImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        insurancePreference: checked 
          ? [...prev.insurancePreference, value]
          : prev.insurancePreference.filter(item => item !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your interest! Our insurance expert will contact you shortly with the best plan.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        petType: '',
        breed: '',
        gender: '',
        petName: '',
        age: '',
        healthCondition: '',
        vaccinationStatus: '',
        coverageAmount: '',
        previousPolicy: '',
        medicalHistory: '',
        insurancePreference: []
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

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Guinea Pig', 'Hamster', 'Other'];
  const dogBreeds = ['Labrador', 'German Shepherd', 'Golden Retriever', 'Poodle', 'Beagle', 'Other'];
  const catBreeds = ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Ragdoll', 'Other'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/services" className="hover:text-green-500 transition-colors">Services</Link>
                <span className="text-gray-300">/</span>
                <span className="text-green-500 font-semibold">Pet Insurance</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
                🛡️ Pet Insurance Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Give the care your pets deserve!
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                At PetCare, we understand that your furry friends are family. We are a one-stop solution for all your pet insurance-related needs. Be it a woof woof or meow meow, we cover them all.
              </p>
              <p className="text-lg text-gray-600">
                From all breeds to all sizes, we insure your pets so you can say goodbye to your worries and let us take care of your pet's health. Give us the chance to be your trusted partner in keeping your furball healthy and safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('insurance-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Insured 🐾
                </button>
                <button 
                  onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  View Plans
                </button>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {insuranceImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pet Insurance ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {insuranceImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-green-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Coverage Options
            </h2>
            <p className="text-gray-600 text-lg">Choose the protection that fits your pet's needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coverageOptions.map((option, index) => (
              <div
                key={option.title}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600 leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Packages */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Affordable Monthly Insurance Plans
            </h2>
            <p className="text-gray-600 text-lg">Flexible plans starting from just ₹499 per month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {insurancePackages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 border-2 ${
                  pkg.popular ? 'border-green-400 shadow-2xl' : 'shadow-xl border-gray-200'
                } ${pkg.color}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{pkg.price}</div>
                  <div className="text-gray-600 mb-2">{pkg.duration}</div>
                  <div className="text-lg font-semibold text-green-600">{pkg.coverage}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById('insurance-form').scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Save More with Annual Plans
            </h2>
            <p className="text-gray-600 text-lg">Get 2 months free when you choose annual payment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {annualPackages.map((pkg, index) => (
              <div
                key={pkg.name}
                className="relative rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{pkg.price}</div>
                  <div className="text-gray-600 mb-2">{pkg.duration}</div>
                  <div className="text-green-600 font-semibold text-sm mb-1">{pkg.savings}</div>
                  <div className="text-gray-500 line-through text-sm">{pkg.originalPrice}</div>
                  <div className="text-lg font-semibold text-blue-600 mt-2">{pkg.coverage}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById('insurance-form').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Save with Annual
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Policy Works */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Pet Insurance Works
            </h2>
            <p className="text-gray-600 text-lg">Simple 4-step process to get your pet insured</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200"
              >
                <div className="text-4xl mb-4 animate-bounce">{step.icon}</div>
                <div className="text-2xl font-bold text-green-500 mb-2">{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Policy Details */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Policy Details & Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policyDetails.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mt-1">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-700">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Form */}
      <section id="insurance-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Your Pet Insured Today!
              </h2>
              <p className="text-gray-600 text-lg">
                Hey! Still not found what you are looking for? No worries!! Let our pet experts come to your rescue.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone no *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select City</option>
                        {formData.state && cities[formData.state]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pet Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Pet Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Pet type</label>
                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Pet Type</option>
                        {petTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Breed</label>
                      <select
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Breed</option>
                        {formData.petType === 'Dog' && dogBreeds.map(breed => (
                          <option key={breed} value={breed}>{breed}</option>
                        ))}
                        {formData.petType === 'Cat' && catBreeds.map(breed => (
                          <option key={breed} value={breed}>{breed}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your pet's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Age</label>
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Age</option>
                        <option value="0-1">0-1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-8">5-8 years</option>
                        <option value="8+">8+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Health Condition</label>
                      <select
                        name="healthCondition"
                        value={formData.healthCondition}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Condition</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vaccination Status</label>
                      <select
                        name="vaccinationStatus"
                        value={formData.vaccinationStatus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Status</option>
                        <option value="Up to date">Up to date</option>
                        <option value="Partially vaccinated">Partially vaccinated</option>
                        <option value="Not vaccinated">Not vaccinated</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Coverage Amount</label>
                      <select
                        name="coverageAmount"
                        value={formData.coverageAmount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Coverage</option>
                        <option value="50000">₹ 50,000</option>
                        <option value="100000">₹ 1,00,000</option>
                        <option value="250000">₹ 2,50,000</option>
                        <option value="500000">₹ 5,00,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Any previous policy?</label>
                      <select
                        name="previousPolicy"
                        value={formData.previousPolicy}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Any medical history we should know about?</label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                      placeholder="Describe any medical conditions, allergies, or previous treatments..."
                    />
                  </div>
                </div>

                {/* Insurance Preferences */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Insurance Preference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coverageOptions.map((option) => (
                      <label key={option.title} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="insurancePreference"
                          value={option.title}
                          onChange={handleInputChange}
                          checked={formData.insurancePreference.includes(option.title)}
                          className="text-green-500 focus:ring-green-500"
                        />
                        <span className="text-gray-700">{option.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Getting Your Quote...' : 'Get Free Insurance Quote'}
                </button>
              </form>
            </div>
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
            <ul className="space-y-4 mb-8">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">{term}</span>
                </li>
              ))}
            </ul>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">📞 Need Help Choosing a Plan?</h4>
              <p className="text-blue-700 text-sm">
                Our insurance experts are available to help you select the perfect coverage for your pet. 
                Call us at +91 98765 43210 for personalized assistance.
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
              <p className="text-gray-400">Comprehensive pet insurance solutions to keep your furry friends protected and healthy.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Insurance Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/insurance" className="hover:text-white">Pet Insurance</Link></li>
                <li><Link href="/services/pet-transport" className="hover:text-white">Pet Transport</Link></li>
                <li><Link href="/services/pet-hostel" className="hover:text-white">Pet Hostel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 insurance@petcare.com</li>
                <li>📍 Pan India Coverage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Claims</h4>
              <div className="text-gray-400">
                <p>24/7 Claims Support</p>
                <p className="text-sm mt-1">Quick claim processing</p>
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