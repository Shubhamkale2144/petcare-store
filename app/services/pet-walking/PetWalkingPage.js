'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PetWalkingPage() {
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
    walkingPackage: '',
    schedule: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const walkingImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1591946653350-20dae00fae6b?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1576201839709-60a61a82b078?w=800&h=600&fit=crop&auto=format'
  ];

  const walkingBenefits = [
    {
      icon: '🛡️',
      title: 'Immunity',
      description: 'Resistance from illness and disease'
    },
    {
      icon: '😴',
      title: 'Sleep',
      description: 'Deeper more restful nights'
    },
    {
      icon: '💪',
      title: 'Fitness',
      description: 'Build muscle and endurance'
    },
    {
      icon: '🍽️',
      title: 'Digestion',
      description: 'Aids nutrient absorption'
    }
  ];

  const walkingPackages = [
    {
      name: 'Starter Walk',
      price: '₹ 250',
      duration: 'Single Walk',
      features: [
        '1 walk session',
        '30 mins walk time',
        'Any day of the week',
        'Fresh water provided',
        'Basic activity report'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Standard Walk',
      price: '₹ 6,000',
      duration: 'Monthly Package',
      features: [
        'Everything in Starter +',
        'Regulated walks on everyday basis',
        'Flexible timing options',
        'Regular progress updates',
        'Training reinforcement'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Premium Walk',
      price: '₹ 10,000',
      duration: 'Premium Monthly',
      features: [
        'Everything in Standard +',
        '2 walks a day according to pee and poo breaks',
        'Dedicated walker',
        'Priority scheduling',
        'Health monitoring'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const extendedPackages = [
    {
      duration: 'daily',
      price: '₹299',
      description: 'Single session - 1 hour',
      features: ['30-45 minutes walk', 'Fresh water provided', 'Basic obedience reinforcement', 'Activity report']
    },
    {
      duration: 'weekly',
      price: '₹1,799',
      originalPrice: '₹2,093',
      discount: '14% off',
      description: '7 days unlimited walks',
      features: ['7 walking sessions', 'Flexible timing', 'Regular progress updates', 'Training reinforcement']
    },
    {
      duration: 'monthly',
      price: '₹5,999',
      originalPrice: '₹8,970',
      discount: '33% off',
      description: '30 days unlimited walks',
      features: ['30 walking sessions', 'Choose your preferred walker', 'Monthly activity report', 'Health monitoring']
    },
    {
      duration: '3-months',
      price: '₹15,999',
      originalPrice: '₹26,910',
      discount: '40% off',
      description: '90 days unlimited walks',
      features: ['90 walking sessions', 'Dedicated walker', 'Weekly progress reports', 'Priority scheduling']
    },
    {
      duration: '6-months',
      price: '₹28,999',
      originalPrice: '₹53,820',
      discount: '46% off',
      description: '180 days unlimited walks',
      features: ['180 walking sessions', 'Personalized training', 'Health assessment', 'Emergency support']
    },
    {
      duration: 'yearly',
      price: '₹49,999',
      originalPrice: '₹107,640',
      discount: '53% off',
      description: '365 days unlimited walks',
      features: ['365 walking sessions', 'VIP treatment', 'Annual health report', 'Free grooming session']
    }
  ];

  const processSteps = [
    {
      icon: '📦',
      title: 'Choose your package',
      description: 'Select the perfect walking plan for your pet\'s needs'
    },
    {
      icon: '🐕',
      title: 'Share the Details',
      description: 'Tell us about your pet and walking preferences'
    },
    {
      icon: '💳',
      title: 'Pay & Relax',
      description: 'Confirm booking and watch your pet enjoy their walks'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Walkers', icon: '👨‍💼' },
    { number: '50+', label: 'Cities Available', icon: '🏙️' },
    { number: '10000+', label: 'Happy Customers', icon: '😊' },
    { number: '8+', label: 'Years in Pet walking', icon: '📅' }
  ];

  const breedServices = [
    'German Shepherd walking service and daily walks',
    'Labrador walking service and daily exercise needs',
    'Siberian Husky exercise walks and walking service',
    'Walking service for Golden Retrievers and Border Collies',
    'Beagle walking service and Shih Tzu dog walker',
    'Specialised plans for walking reactive dogs',
    'Senior dogs and high-energy breed walking',
    'Walking routines for all small and large breeds'
  ];

  const serviceFeatures = [
    'Customised dog walking plan for every breed',
    'Private dog walker options for shy or reactive pets',
    'Regular dog walking schedule for consistency',
    'Home dog walking service for comfort and ease',
    'Special dog walking for busy pet parents',
    'Trained in dog obedience during walks',
    'Socialisation walks for dogs',
    'Walking hyperactive dogs'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % walkingImages.length);
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
      alert('Thank you for your interest! Our walking expert will contact you shortly.');
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
        walkingPackage: '',
        schedule: '',
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
                <span className="text-green-500 font-semibold">Pet Walking</span>
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
                🐕 Professional Pet Walking
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Keep Your Best Friend Active & Happy!
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional dog walking services to keep your furry friend healthy, active, and stimulated.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('walking-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Walking Service 🐾
                </button>
                <button 
                  onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  View Packages
                </button>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {walkingImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pet Walking ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {walkingImages.map((_, index) => (
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

      {/* Why Walking Matters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why is Dog Walking Important?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A daily stroll isn't just routine, it's joy, stimulation, and a bonding moment for your pup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {walkingBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4 animate-bounce">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walking Packages */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Pet's Stroll
            </h2>
            <p className="text-gray-600 text-lg">Flexible packages for every need and budget</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {walkingPackages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 border-2 ${
                  pkg.popular ? 'border-green-400 shadow-2xl' : 'shadow-xl border-gray-200'
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
                    setFormData({...formData, walkingPackage: pkg.name});
                    document.getElementById('walking-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            *Service completion is subject to availability of service provider.
          </div>
        </div>
      </section>

      {/* Extended Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🐕 Professional Dog Walking Packages
            </h2>
            <p className="text-gray-600 text-lg">
              Keep your furry friend active and healthy with our expert walking services
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extendedPackages.map((pkg, index) => (
                <div 
                  key={pkg.duration} 
                  className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-center relative overflow-hidden"
                >
                  {/* Popular Badge for Best Value */}
                  {pkg.duration === 'monthly' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg z-10">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                    {pkg.duration.replace('-', ' ')} Package
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-600">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="text-gray-500 line-through text-lg">{pkg.originalPrice}</span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {pkg.discount}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg font-medium">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                        <span className="text-green-500 text-lg">✓</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setFormData({...formData, walkingPackage: `${pkg.duration} package`});
                      document.getElementById('walking-form').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Book This Package
                  </button>

                  {/* Savings Info */}
                  {pkg.discount && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-semibold">
                        Save {pkg.discount} • Best value for money
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🕒</div>
                <h4 className="font-bold text-gray-800 mb-2">Flexible Timing</h4>
                <p className="text-gray-600 text-sm">Choose morning, evening, or custom timings that work for your schedule</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-bold text-gray-800 mb-2">Live Updates</h4>
                <p className="text-gray-600 text-sm">Get real-time updates, photos, and activity reports after each walk</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-bold text-gray-800 mb-2">Trained Walkers</h4>
                <p className="text-gray-600 text-sm">All our walkers are certified, experienced, and pet first-aid trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Quick Easy Process
            </h2>
            <p className="text-gray-600 text-lg">
              Get professional walking services for your furry companion in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                <div className="text-2xl text-green-500 mt-4 font-bold">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              PetCare Results
            </h2>
            <p className="text-gray-600 text-lg">
              Results Bright As Your Pet's Eyes. Every wag, purr, and paw-print is a testament to the trust 10000+ pet parents have placed in us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pet Walking Services Near You
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <p className="text-gray-600 text-lg mb-6">
                From solo dog walks near me to structured dog walking sessions designed for leash training on walks, 
                our verified dog walkers in India ensure your dog gets the physical activity, socialisation, and 
                stimulation they need every day.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">We Cover:</h3>
                  <ul className="space-y-3">
                    {serviceFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Breed-Specific Services:</h3>
                  <ul className="space-y-3">
                    {breedServices.map((service, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-3">🌟 Why Choose Our Walking Services?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Trained and experienced dog walkers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Flexible packages tailored to your schedule</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Reliable service with real-time updates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Perfect for working professionals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">
            Are you a service provider?
          </h2>
          <p className="text-black/90 text-xl mb-8 opacity-90">
            Be part of our pet-lovers community, list your services online and get discovered nationwide!
          </p>
          <Link
            href="/become-provider"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Walking Form */}
      <section id="walking-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Book Your Pet's Walking Service
              </h2>
              <p className="text-gray-600 text-lg">
                Fill in your details and our walking expert will contact you with the perfect plan
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type *</label>
                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Pet Type</option>
                        <option value="Dog">Dog</option>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Your pet's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Age</option>
                        <option value="0-1 year">0-1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-8 years">5-8 years</option>
                        <option value="8+ years">8+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Walking Package</label>
                      <select
                        name="walkingPackage"
                        value={formData.walkingPackage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Package</option>
                        {walkingPackages.map(pkg => (
                          <option key={pkg.name} value={pkg.name}>{pkg.name} - {pkg.price}</option>
                        ))}
                        {extendedPackages.map(pkg => (
                          <option key={pkg.duration} value={pkg.duration}>{pkg.duration} - {pkg.price}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Schedule</label>
                      <select
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      >
                        <option value="">Select Schedule</option>
                        <option value="Morning">Morning (7-10 AM)</option>
                        <option value="Afternoon">Afternoon (12-3 PM)</option>
                        <option value="Evening">Evening (5-8 PM)</option>
                        <option value="Flexible">Flexible Timing</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                      placeholder="Any special requirements, medical conditions, behavior notes, or additional instructions..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Walking Service'}
                </button>
              </form>
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
              <p className="text-gray-400">Professional pet walking services to keep your furry friends active, healthy, and happy.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Walking Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/pet-walking" className="hover:text-white">Pet Walking</Link></li>
                <li><Link href="/services/grooming-spa" className="hover:text-white">Grooming & Spa</Link></li>
                <li><Link href="/services/training" className="hover:text-white">Pet Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 walking@petcare.com</li>
                <li>📍 Serving Across India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Emergency</h4>
              <div className="text-gray-400">
                <p>24/7 Support Available</p>
                <p className="text-sm mt-1">For urgent pet walking needs</p>
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