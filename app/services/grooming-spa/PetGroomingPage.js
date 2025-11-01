'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PetGroomingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const toggleFaq = (index) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    router.push('/login?redirect=/services/grooming-spa');
  };

  const groomingBenefits = [
    {
      icon: '🛁',
      title: 'Better Hygiene',
      description: 'Clean pet, fewer germs, fresher cuddles.'
    },
    {
      icon: '🌡️',
      title: 'Body Temperature',
      description: 'A trimmed fur helps regulate body heat.'
    },
    {
      icon: '✨',
      title: 'Shedding and Tangling',
      description: 'Shiny, tangle-free coat with regular grooming.'
    },
    {
      icon: '👁️',
      title: 'Diseases Detection',
      description: 'Spot issues early, ensure timely care.'
    }
  ];

  const groomingProcess = [
    {
      icon: '❤️',
      title: 'Pet-First Approach',
      description: 'The groomer arrives and makes your pet feel safe and relaxed before beginning.'
    },
    {
      icon: '🔍',
      title: 'Skin & Coat Assessment',
      description: 'The groomer assesses your pet\'s skin type and coat condition for a tailored grooming session.'
    },
    {
      icon: '⭐',
      title: 'Quality Commitment',
      description: 'We use only suitable products and commit to delivering top-quality grooming every time.'
    }
  ];

  const groomingOfferings = [
    {
      icon: '🛁',
      title: 'Spa Bath',
      description: 'Luxury bathing with premium products'
    },
    {
      icon: '✂️',
      title: 'Full Grooming',
      description: 'Complete grooming package'
    },
    {
      icon: '💅',
      title: 'Nail Clipping',
      description: 'Safe and precise nail care'
    },
    {
      icon: '💇',
      title: 'Hair Cuts',
      description: 'Stylish and breed-specific cuts'
    },
    {
      icon: '🏥',
      title: 'Medical Bath',
      description: 'Therapeutic bathing for skin conditions'
    },
    {
      icon: '🔗',
      title: 'Knot/Mats Removal',
      description: 'Gentle detangling and mat removal'
    },
    {
      icon: '🪳',
      title: 'Anti-Tick Treatment',
      description: 'Effective tick and flea prevention'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹ 999',
      type: 'Grooming',
      features: [
        'Basic bath & blow-dry',
        'Nail clipping',
        'Ear cleaning',
        'Light brushing',
        'Ideal for regular maintenance'
      ],
      popular: false,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Plus',
      price: '₹ 1,499',
      type: 'Grooming',
      features: [
        'Everything in Basic +',
        'Deep conditioning',
        'Teeth brushing',
        'Paw pad treatment',
        'De-shedding treatment',
        'Coat moisturizing'
      ],
      popular: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Pro',
      price: '₹ 1,999',
      type: 'Grooming',
      features: [
        'Everything in Plus +',
        'Breed-specific haircut',
        'Skin treatment',
        'Anti-tick massage',
        'Aromatherapy',
        'Blueberry facial'
      ],
      popular: false,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      name: 'Elite',
      price: '₹ 2,499',
      type: 'Medical',
      features: [
        'Everything in Pro +',
        'De-Stressing Massage',
        'Paw Butter Treatment',
        'Nose Clean',
        'Premium Perfume',
        'Designer Hair Styling',
        'Full Body Trimming'
      ],
      popular: false,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const services = [
    {
      id: 1,
      title: "Full Grooming Services",
      description: "Gentle, initial grooming experience for your little one.",
      price: "₹1,499",
      duration: "2-3 hours",
      options: [
        "Puppy/Kitten Grooming",
        "Full Grooming & Haircut",
        "Haircut & Styling",
        "Full Grooming",
        "Bubble Up Bath & Blow Dry"
      ],
      includes: [
        "Eyes, Ears & Teeth Cleaning",
        "Deshedding",
        "Nail Clipping",
        "Bath: Deep Cleansing or Tick & Flea Preventive Treatment",
        "Conditioning",
        "Blow Drying & Hair Setting"
      ],
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&h=400&fit=crop&auto=format",
      badge: "Most Popular"
    },
    {
      id: 2,
      title: "Massage & Packs",
      description: "Soothing skin, coat, and relaxation therapies.",
      price: "₹899",
      duration: "1 hour",
      options: [
        "Calming Massage",
        "Bug-Repelling Preventive Massage",
        "Natural Tick & Flea Preventive Pack",
        "Natural Skin & Coat Conditioning Pack"
      ],
      includes: [
        "With lavender & cold-pressed coconut oil for stress relief and coat nourishment",
        "Note: Massages & Packs can only be availed with Full Grooming, Full Grooming & Haircut, or Bubble Up Bath & Blow Dry services."
      ],
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=400&fit=crop&auto=format",
      badge: "Relaxing"
    },
    {
      id: 3,
      title: "Quick Services",
      description: "Fast, effective touch-ups to keep your pet tidy.",
      price: "₹499",
      duration: "30-45 mins",
      options: [
        "Pawdicure",
        "ENT Maintenance",
        "Face Trim",
        "Sanitary Trim",
        "Brush & Refresh"
      ],
      includes: [
        "Nail clipping",
        "Paw cleaning",
        "Deep conditioning of paw pads"
      ],
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop&auto=format",
      badge: "Quick Fix"
    },
    {
      id: 4,
      title: "Premium Spa Package",
      description: "Ultimate pampering experience for your beloved pet.",
      price: "₹2,499",
      duration: "4 hours",
      options: [
        "Full Grooming & Styling",
        "Aromatherapy Massage",
        "Paw & Nail Treatment",
        "Coat Conditioning"
      ],
      includes: [
        "Complete grooming session",
        "Relaxing aromatherapy",
        "Paw spa treatment",
        "Premium coat conditioning",
        "Blueberry facial treatment"
      ],
      image: "https://images.unsplash.com/photo-1623387641168-d5783f5937a6?w=500&h=400&fit=crop&auto=format",
      badge: "Luxury"
    },
    {
      id: 5,
      title: "Medical Grooming",
      description: "Specialized grooming for pets with medical conditions.",
      price: "₹1,799",
      duration: "2-3 hours",
      options: [
        "Senior Pet Grooming",
        "Special Needs Grooming",
        "Post-Surgery Grooming",
        "Skin Condition Care"
      ],
      includes: [
        "Gentle handling techniques",
        "Medicated baths if required",
        "Special attention to sensitive areas",
        "Veterinary recommended products"
      ],
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop&auto=format",
      badge: "Medical Care"
    },
    {
      id: 6,
      title: "Breed-Specific Grooming",
      description: "Expert grooming tailored to your pet's breed requirements.",
      price: "₹1,999",
      duration: "3-4 hours",
      options: [
        "Poodle Clip & Style",
        "Golden Retriever Deshedding",
        "Persian Cat Full Groom",
        "Husky Coat Maintenance"
      ],
      includes: [
        "Breed-specific haircut",
        "Proper coat maintenance",
        "Breed standard styling",
        "Specialized tools and techniques"
      ],
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&h=400&fit=crop&auto=format",
      badge: "Expert"
    }
  ];

  const beforeAfterImages = [
    {
      before: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop&auto=format",
      after: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&auto=format",
      name: "Max - Golden Retriever",
      service: "Full Grooming & Haircut"
    },
    {
      before: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&auto=format",
      after: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop&auto=format",
      name: "Luna - Persian Cat",
      service: "Premium Spa Package"
    },
    {
      before: "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400&h=300&fit=crop&auto=format",
      after: "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=400&h=300&fit=crop&auto=format",
      name: "Rocky - Bulldog",
      service: "Breed-Specific Grooming"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing service! My Labrador Max found his perfect grooming routine. The team is professional and caring.",
      pet: "Labrador",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format"
    },
    {
      name: "Rahul Verma",
      rating: 5,
      comment: "Best pet spa in town! My cat Luna always comes back happy and beautifully groomed. Highly recommended!",
      pet: "Persian Cat",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
    },
    {
      name: "Anita Patel",
      rating: 5,
      comment: "The medical grooming service saved us! Our senior dog with arthritis gets the gentle care he needs.",
      pet: "Senior Dog",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format"
    }
  ];

  const faqs = [
    {
      question: "How much does pet grooming cost in India?",
      answer: "Basic grooming starts at ₹999, Plus package at ₹1,499, Pro package at ₹1,999, and Elite package at ₹2,499. The cost depends on your pet's breed and the services required."
    },
    {
      question: "Do you provide home grooming services?",
      answer: "Yes! We offer doorstep grooming services across India. Our professional groomers come to your home with all necessary equipment for a stress-free experience."
    },
    {
      question: "What's included in the spa bath service?",
      answer: "Our spa bath includes deep cleansing, conditioning, blow drying, coat moisturizing, and premium grooming products for a luxurious bathing experience."
    },
    {
      question: "How often should I groom my pet?",
      answer: "Most pets benefit from grooming every 4-6 weeks. However, breeds with longer hair may need grooming every 3-4 weeks, while short-haired breeds can go 6-8 weeks."
    },
    {
      question: "Do you handle senior pets or pets with medical conditions?",
      answer: "Absolutely! We have specialized medical grooming services with gentle handling techniques and veterinary-recommended products for senior pets and those with medical conditions."
    },
    {
      question: "What safety measures do you follow?",
      answer: "We follow strict safety protocols including sanitized equipment, temperature-controlled environment, trained staff, and emergency protocols. All pets are supervised throughout their grooming session."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-1">
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <span className="text-gray-400">›</span>
              <Link href="/services" className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-1">
                <span>Services</span>
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-800 font-medium">Grooming & Spa</span>
            </div>
            <Link 
              href="/login" 
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>🔐</span>
              <span>Login to Book</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Pet Grooming & Spa Services 🐾
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
            Professional grooming services to keep your pet looking and feeling their best. 
            Luxury treatments with love and care.
          </p>
          <div className="animate-fade-in-up animation-delay-500">
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
            >
              Explore Our Services ↓
            </button>
          </div>
        </div>
      </section>

      {/* Why Grooming Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why is Pet Grooming Important?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kudos to you for putting your pet first! Because grooming isnt just pampering, its essential care. 
              And, who doesnt want their pet to look Purrrrrfect?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {groomingBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grooming Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Grooming Starts with Care at PetCare
            </h2>
            <p className="text-gray-600 text-lg">
              You choose your preferred time, and we will assign a verified professional groomer for your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {groomingProcess.map((step, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grooming Offerings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              PetCare Offerings
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {groomingOfferings.map((offering, index) => (
              <div 
                key={index} 
                className="text-center p-4 bg-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-orange-200"
              >
                <div className="text-2xl mb-2">{offering.icon}</div>
                <h3 className="text-sm font-semibold text-gray-800">{offering.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              PetCare Pricing Plans
            </h2>
            <p className="text-gray-600 text-lg">Pamper your pet, find the best package</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={plan.name} 
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 border-2 ${
                  plan.popular ? 'border-orange-400 shadow-2xl' : 'shadow-xl border-gray-200'
                } ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{plan.price}</div>
                  <div className="text-gray-600 mb-2">{plan.type}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBookAppointment({ title: `${plan.name} Package`, price: plan.price })}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
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
            *Disclaimer: Service completion is subject to availability of service provider.
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Premium Grooming Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Safe and hygienic grooming sessions for your beloved pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    ⏱️ {service.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span>✨</span> Available Options:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.options.map((option, optIndex) => (
                        <li key={optIndex} className="flex items-center gap-2">
                          <span className="text-orange-500">•</span> {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span>✅</span> Whats Included:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.includes.map((item, incIndex) => (
                        <li key={incIndex} className="flex items-center gap-2">
                          <span className="text-green-500 text-lg">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{service.price}</span>
                      <span className="text-sm text-gray-500 block">starting from</span>
                    </div>
                    <button
                      onClick={() => handleBookAppointment(service)}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>📅</span>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Grooming Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🐾 Basic Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Safe and hygienic grooming sessions
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Pet bath and blow-dry
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Deshedding and coat care
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Tick & flea removal treatment
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Premium Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Custom spa services for dogs and cats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Medical and senior pet grooming
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Affordable grooming packages and subscriptions
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Doorstep services within India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Results */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ✨ Beautiful Transformations
            </h2>
            <p className="text-gray-600 text-lg">
              Witness the amazing results of our professional grooming services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beforeAfterImages.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{item.name}</h3>
                  <p className="text-orange-600 text-sm text-center mb-4 font-medium">{item.service}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Before</h4>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.before}
                          alt="Before"
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">After</h4>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.after}
                          alt="After"
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              💖 Loved by Pet Parents
            </h2>
            <p className="text-gray-600 text-lg">
              See what our happy customers have to say about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">Pet: {testimonial.pet}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">Your grooming questions, answered</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <span className={`text-orange-500 text-xl font-bold transition-transform duration-300 ${
                    expandedFaqs[index] ? 'rotate-45' : 'rotate-0'
                  }`}>
                    +
                  </span>
                </button>
                {expandedFaqs[index] && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pet Salon and Spa in India - Right at Home!
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Want to skip the hassle of visiting a salon? Book a pet spa in India at home with PetCare. 
            From puppy grooming to breed-specific styles, we ensure your pet looks and feels their best.
          </p>
          <button 
            onClick={() => handleBookAppointment({ title: "Consultation", price: "Free" })}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl transform hover:scale-105"
          >
            Book Your Home Spa Today
          </button>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Login Required</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔐</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Login to Book {selectedService?.title}
                </h4>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to book appointments and manage your pets spa sessions.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
                  >
                    Login to Continue
                  </button>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Maybe Later
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Dont have an account? <Link href="/register" className="text-orange-500 hover:underline">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}