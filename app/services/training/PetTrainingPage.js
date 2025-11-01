'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetTrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    petType: '',
    breed: '',
    petName: '',
    age: '',
    trainingType: '',
    package: '',
    experience: '',
    behaviorIssues: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const trainingImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1591946653350-20dae00fae6b?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1576201839709-60a61a82b078?w=800&h=600&fit=crop&auto=format'
  ];

  const trainingBenefits = [
    {
      icon: '🏠',
      title: 'Your home stays organized',
      description: 'No more chewed furniture or scattered belongings'
    },
    {
      icon: '💬',
      title: 'Communication gets easier',
      description: 'Understand and respond to your pet\'s needs effectively'
    },
    {
      icon: '🚶',
      title: 'Walks turn stress-free',
      description: 'Enjoy peaceful walks without pulling or barking'
    },
    {
      icon: '❤️',
      title: 'Your bond gets stronger',
      description: 'Build trust and deepen your connection with your pet'
    }
  ];

  const trainingServices = [
    {
      icon: '👨‍🏫',
      title: 'Private Training',
      description: 'One-on-one sessions tailored to your pet\'s specific needs'
    },
    {
      icon: '🎯',
      title: 'Targeted Training',
      description: 'Focus on specific behavior issues or skill development'
    },
    {
      icon: '📝',
      title: 'Personalised Training',
      description: 'Custom training plans based on your pet\'s personality'
    },
    {
      icon: '🏆',
      title: 'Training for Shows',
      description: 'Professional training for competitions and dog shows'
    }
  ];

  const trainingPackages = [
    {
      name: 'Beginner',
      price: '₹ 4,999',
      duration: '4-5 Sessions',
      features: [
        'Parent-teacher meeting: 1 session (virtual)',
        'Pee and poo guidance: 4-5 sessions',
        'Additional sessions based on puppy\'s needs',
        'Basic obedience introduction',
        'Ideal for puppies above 2 months'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Foundation',
      price: '₹ 9,999',
      duration: '11 Sessions',
      features: [
        'Canine Behavior - 3 sessions (Overexcitement, home socialization, excessive barking)',
        'Societal manners - 3 sessions (Leash walking, socialization with other pets)',
        'Obedience commands - 5 sessions (Stay, come, sit, No, Drop it commands)',
        'Regular pet report cards',
        'Ideal for pets above 3 months'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Advance',
      price: '₹ 11,999',
      duration: '15+ Sessions',
      features: [
        'Everything in Foundation +',
        'Advanced commands (roll over, loose leash walking, fetch & no biting)',
        'Behavior maintenance tips & tricks',
        'Additional sessions based on dog\'s needs',
        'Ideal for pets above 3 months'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const additionalServices = [
    {
      name: 'Behavior Correction',
      price: '₹ 2,999',
      description: 'Address specific behavior issues like aggression, anxiety, or fear'
    },
    {
      name: 'Advanced Obedience',
      price: '₹ 3,999',
      description: 'Master complex commands and off-leash training'
    },
    {
      name: 'Puppy Training',
      price: '₹ 1,999',
      description: 'Specialized training for puppies (2-6 months)'
    },
    {
      name: 'Therapy Dog Training',
      price: '₹ 6,999',
      description: 'Prepare your dog for therapy and service work'
    }
  ];

  const processSteps = [
    {
      icon: '📦',
      title: 'Choose your package',
      description: 'Select the perfect training plan for your pet\'s needs'
    },
    {
      icon: '🐕',
      title: 'Share the Details',
      description: 'Tell us about your pet and specific training requirements'
    },
    {
      icon: '💳',
      title: 'Pay & Relax',
      description: 'Confirm booking and watch your pet transform'
    }
  ];

  const trainingMethods = [
    {
      icon: '🎯',
      title: 'Positive Reinforcement',
      description: 'Reward-based training using treats and praise'
    },
    {
      icon: '🧠',
      title: 'Science-Based Methods',
      description: 'Techniques backed by animal behavior research'
    },
    {
      icon: '❤️',
      title: 'Force-Free Approach',
      description: 'No punishment, only positive encouragement'
    },
    {
      icon: '🏠',
      title: 'Home Environment',
      description: 'Training in familiar surroundings for better results'
    }
  ];

  const termsConditions = [
    'All training sessions are conducted by certified professional trainers',
    'Cancellation 24 hours prior for rescheduling',
    'Additional charges may apply for specialized behavior issues',
    'Training equipment provided during sessions',
    'Progress reports shared after each session',
    'Follow-up support included for 30 days'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % trainingImages.length);
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
      alert('Thank you for your interest! Our training expert will contact you shortly.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        petType: '',
        breed: '',
        petName: '',
        age: '',
        trainingType: '',
        package: '',
        experience: '',
        behaviorIssues: '',
        specialRequirements: ''
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
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/services" className="hover:text-indigo-500 transition-colors">Services</Link>
                <span className="text-gray-300">/</span>
                <span className="text-indigo-500 font-semibold">Pet Training</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold">
                🎓 Professional Pet Training
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                What happens when your dog is well-trained?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Life becomes smoother, calmer, and a lot more fun, for both of you! Here's how:
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {trainingBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl text-indigo-500 mt-1">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => document.getElementById('training-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-indigo-500 text-white px-8 py-4 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Training 🐾
                </button>
                <button 
                  onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-indigo-500 text-indigo-500 px-8 py-4 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  View Plans
                </button>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {trainingImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pet Training ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {trainingImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-indigo-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              PetCare Training Offerings
            </h2>
            <p className="text-gray-600 text-lg">
              We offer 100% force-free training fully customized to suit you and your dog's unique requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trainingServices.map((service, index) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4 animate-bounce">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Training Methodology
            </h2>
            <p className="text-gray-600 text-lg">Modern, scientific, and compassionate training approaches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trainingMethods.map((method, index) => (
              <div
                key={method.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Packages */}
      <section id="packages" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Training Packages
            </h2>
            <p className="text-gray-600 text-lg">Discover the right training plans for your pet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trainingPackages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 border-2 ${
                  pkg.popular ? 'border-indigo-400 shadow-2xl' : 'shadow-xl border-gray-200'
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
                  <div className="text-gray-600 mb-4">{pkg.duration}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setFormData({...formData, package: pkg.name});
                    document.getElementById('training-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Additional Training Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-800">{service.name}</h4>
                    <span className="text-indigo-600 font-bold">{service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            *Service completion is subject to availability of service provider. All prices include GST.
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Quick Easy Process
            </h2>
            <p className="text-gray-600 text-lg">
              Get professional training for your furry companion in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                <div className="text-2xl text-indigo-500 mt-4 font-bold">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">
            Are you a training service provider?
          </h2>
          <p className="text-black/90 text-xl mb-8 opacity-90">
            Be part of our pet-lovers community, list your services online and get discovered nationwide!
          </p>
          <Link
            href="/become-provider"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Training Form */}
      <section id="training-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Start Your Pets Training Journey
              </h2>
              <p className="text-gray-600 text-lg">
                Fill in your details and our training expert will contact you with the perfect plan
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type *</label>
                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Pet Type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                      <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Pet breed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Your pet's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Age</option>
                        <option value="0-2 months">0-2 months</option>
                        <option value="2-6 months">2-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3+ years">3+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Type</label>
                      <select
                        name="trainingType"
                        value={formData.trainingType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Training Type</option>
                        <option value="Basic Obedience">Basic Obedience</option>
                        <option value="Behavior Correction">Behavior Correction</option>
                        <option value="Advanced Training">Advanced Training</option>
                        <option value="Show Training">Show Training</option>
                        <option value="Puppy Training">Puppy Training</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Package</label>
                      <select
                        name="package"
                        value={formData.package}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Package</option>
                        {trainingPackages.map(pkg => (
                          <option key={pkg.name} value={pkg.name}>{pkg.name} - {pkg.price}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Training Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select Experience</option>
                      <option value="None">No previous training</option>
                      <option value="Basic">Basic training at home</option>
                      <option value="Professional">Professional training before</option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specific Behavior Issues</label>
                    <textarea
                      name="behaviorIssues"
                      value={formData.behaviorIssues}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Describe any specific behavior issues like barking, chewing, aggression, etc."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Any special requirements, medical conditions, or additional notes..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-500 text-white py-4 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Training Consultation'}
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
            <ul className="space-y-4">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700">{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🐾 PetCare</h3>
              <p className="text-gray-400">Professional pet training services to build better relationships between pets and their families.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Training Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/training" className="hover:text-white">Pet Training</Link></li>
                <li><Link href="/services/pet-transport" className="hover:text-white">Pet Transport</Link></li>
                <li><Link href="/services/insurance" className="hover:text-white">Pet Insurance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 training@petcare.com</li>
                <li>📍 Serving Across India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="text-gray-400">
                <p>Certified Trainers</p>
                <p className="text-sm mt-1">Force-free methods only</p>
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