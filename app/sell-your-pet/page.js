'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PetForm from '../components/PetForm';

export default function SellYourPetPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!token && !!user);
    };
    checkAuth();
  }, []);

  const handleFormSubmit = (data) => {
    if (!isLoggedIn) {
      setFormData(data);
      router.push('/login?redirect=sell-pet');
      return;
    }
    submitForm(data);
  };

  const submitForm = async (data) => {
    try {
      const response = await fetch('/api/sell-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Pet listing submitted successfully! Our team will review it within 24 hours.');
        setFormData(null);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  };

  const processSteps = [
    {
      step: 1,
      title: 'Pet Details',
      description: 'Provide basic information about your pet',
      icon: '🐕'
    },
    {
      step: 2,
      title: 'Health & Medical',
      description: 'Share health records and medical history',
      icon: '🏥'
    },
    {
      step: 3,
      title: 'Photos & Documents',
      description: 'Upload photos and required documents',
      icon: '📸'
    },
    {
      step: 4,
      title: 'Pricing & Terms',
      description: 'Set price and agree to terms',
      icon: '💰'
    }
  ];

  const requirements = [
    {
      category: 'Required Documents',
      items: [
        'Vaccination records (last 1 year)',
        'Veterinary health certificate',
        'Breed registration papers (if any)',
        'Proof of ownership',
        'Government ID proof'
      ]
    },
    {
      category: 'Health Requirements',
      items: [
        'Up-to-date vaccinations',
        'Recent deworming treatment',
        'No contagious diseases',
        'Spay/Neuter certificate',
        'Recent health check-up report'
      ]
    },
    {
      category: 'Legal Requirements',
      items: [
        'Valid ID proof',
        'Proof of ownership',
        'Transfer agreement',
        'No animal cruelty history',
        'Family consent'
      ]
    }
  ];

  const pricingInfo = [
    {
      type: 'Pure Breed Dogs',
      range: '₹5,000 - ₹50,000+',
      factors: ['Breed rarity', 'Pedigree quality', 'Age', 'Training']
    },
    {
      type: 'Mixed Breed Dogs',
      range: '₹2,000 - ₹15,000',
      factors: ['Age', 'Health condition', 'Temperament', 'Training']
    },
    {
      type: 'Cats',
      range: '₹1,500 - ₹25,000',
      factors: ['Breed', 'Age', 'Health', 'Pedigree']
    },
    {
      type: 'Birds & Small Pets',
      range: '₹500 - ₹10,000',
      factors: ['Species', 'Age', 'Rarity', 'Health']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-blue-600 font-semibold">Sell Your Pet</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">U</span>
                  </div>
                  <span className="text-gray-700 font-medium">Welcome!</span>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link 
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sell Your Pet Safely
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find loving homes for your pets through our verified and secure platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('selling-process').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-md"
              >
                Start Selling Process
              </button>
              <button 
                onClick={() => document.getElementById('requirements').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-bold text-lg"
              >
                View Requirements
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl text-blue-600 mb-2">🏠</div>
              <div className="text-2xl font-bold text-gray-800">1,200+</div>
              <div className="text-gray-600 text-sm">Successful Adoptions</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl text-green-600 mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-800">4.8/5</div>
              <div className="text-gray-600 text-sm">Seller Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl text-purple-600 mb-2">🔒</div>
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-gray-600 text-sm">Verified Buyers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl text-orange-600 mb-2">💰</div>
              <div className="text-2xl font-bold text-gray-800">₹50L+</div>
              <div className="text-gray-600 text-sm">Total Transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section id="selling-process" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Simple 4-step process to sell your pet safely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Requirements & Documentation
            </h2>
            <p className="text-gray-600">
              Ensure you have everything ready before listing your pet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">📋</span>
                  {req.category}
                </h3>
                <ul className="space-y-2">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-600 text-sm">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pricing Guide
            </h2>
            <p className="text-gray-600">
              Understand market rates for different pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingInfo.map((price, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{price.type}</h3>
                <div className="text-xl font-bold text-green-600 mb-4">{price.range}</div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-sm">Price Factors:</h4>
                  {price.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-blue-500">•</span>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                List Your Pet for Sale
              </h2>
              <p className="text-gray-600">
                {isLoggedIn 
                  ? "Fill out the form below to list your pet"
                  : "Please login or sign up to submit your pet listing"
                }
              </p>
            </div>

            {isLoggedIn ? (
              <PetForm onSubmit={handleFormSubmit} />
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Authentication Required</h3>
                <p className="text-gray-600 mb-6">
                  Please login or create an account to access the pet selling form and ensure secure transactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/login"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Login to Continue
                  </Link>
                  <Link 
                    href="/signup"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How long does the approval process take?</h3>
                <p className="text-gray-600">Typically 24-48 hours after submitting all required documents. We verify health records and ownership documents.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What happens after I list my pet?</h3>
                <p className="text-gray-600">Your pet will be visible to verified buyers. You'll receive inquiries and can schedule meet-ups through our secure messaging system.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Are there any fees?</h3>
                <p className="text-gray-600">We charge a 5% success fee only when your pet is successfully sold through our platform. No upfront costs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">PetCare</h3>
              <p className="text-gray-400 mb-4">
                Safe and responsible pet trading platform. Connecting loving homes with deserving pets.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Selling Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Pricing Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Requirements</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seller Protection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>sell@petcare.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>🕒</span>
                  <span>Mon-Sun: 9AM-9PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCare. All rights reserved. | Safe Pet Trading Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}