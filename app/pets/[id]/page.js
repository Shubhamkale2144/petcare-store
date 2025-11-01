'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPetProductById } from '../../data/pets';

export default function PetDetailPage() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  
  const params = useParams();
  const router = useRouter();
  const petId = params.id;

  useEffect(() => {
    loadPet();
    loadCartFromStorage();
  }, [petId]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const loadCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('petcare-cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
        setCartCount(cartData.reduce((total, item) => total + item.quantity, 0));
      }
    }
  };

  const saveCartToStorage = (cartData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('petcare-cart', JSON.stringify(cartData));
    }
  };

  const loadPet = async () => {
    try {
      setTimeout(() => {
        const foundPet = getPetProductById(petId);
        if (foundPet) {
          setPet(foundPet);
        } else {
          showNotification('Pet not found', 'error');
        }
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading pet:', error);
      showNotification('Failed to load pet', 'error');
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!pet) return;

    if (!pet.available) {
      showNotification('This pet is not available for adoption', 'error');
      return;
    }

    const cartItem = {
      id: pet.id,
      name: pet.name,
      price: pet.price,
      image: pet.image,
      category: 'pet',
      type: 'pet',
      breed: pet.breed,
      quantity: 1,
      cartId: Date.now(),
      link: pet.link || `/pets/${pet.id}`
    };

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    let newCart;
    if (existingItemIndex > -1) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    showNotification(`Added ${pet.name} to cart!`, 'success');
  };

  const adoptNow = () => {
    if (!pet) return;

    if (!pet.available) {
      showNotification('This pet is not available for adoption', 'error');
      return;
    }

    // Add to cart first
    const cartItem = {
      id: pet.id,
      name: pet.name,
      price: pet.price,
      image: pet.image,
      category: 'pet',
      type: 'pet',
      breed: pet.breed,
      quantity: 1,
      cartId: Date.now(),
      link: pet.link || `/pets/${pet.id}`
    };

    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

    let newCart;
    if (existingItemIndex > -1) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    
    showNotification(`Proceeding to adopt "${pet.name}"`, 'info');
    
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading pet details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">😿</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Pet Not Found</h1>
            <p className="text-slate-600 mb-6">The pet you're looking for doesn't exist.</p>
            <Link 
              href="/pets" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
            >
              ← Back to Pets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'error' ? 'bg-rose-500' : 
          notification.type === 'info' ? 'bg-blue-500' : 'bg-emerald-500'
        } text-white max-w-sm`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-white hover:text-slate-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-blue-600 hidden sm:block">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/pets" className="hover:text-blue-600 transition-colors">Pets</Link>
                <span className="text-slate-300">/</span>
                <span className="text-blue-600 font-semibold truncate max-w-xs">{pet.name}</span>
              </div>
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/pets" className="hover:text-blue-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Pets
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pet Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              <img
                src={pet.additionalImages ? pet.additionalImages[activeImage] : pet.image}
                alt={pet.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {pet.additionalImages && pet.additionalImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {pet.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-blue-500' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-2 ${
                  pet.badge === 'Friendly' ? 'bg-emerald-500' :
                  pet.badge === 'Calm' ? 'bg-blue-500' :
                  pet.badge === 'Active' ? 'bg-orange-500' :
                  pet.badge === 'Playful' ? 'bg-purple-500' :
                  pet.badge === 'Talkative' ? 'bg-cyan-500' :
                  pet.badge === 'Gentle' ? 'bg-pink-500' :
                  pet.badge === 'Loyal' ? 'bg-rose-500' :
                  pet.badge === 'Curious' ? 'bg-yellow-500' :
                  pet.badge === 'Majestic' ? 'bg-indigo-500' :
                  pet.badge === 'Energetic' ? 'bg-red-500' :
                  'bg-slate-500'
                }`}>
                  {pet.badge}
                </span>
                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${
                  pet.type === 'dog' ? 'bg-amber-600' : 
                  pet.type === 'cat' ? 'bg-indigo-500' : 
                  pet.type === 'bird' ? 'bg-emerald-500' : 'bg-pink-500'
                }`}>
                  {pet.type === 'dog' ? '🐶 Dog' : 
                   pet.type === 'cat' ? '🐱 Cat' : 
                   pet.type === 'bird' ? '🦜 Bird' : '🐰 Rabbit'}
                </span>
                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${
                  pet.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                }`}>
                  {pet.gender === 'male' ? '♂ Male' : '♀ Female'}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-4">{pet.name}</h1>
            <p className="text-slate-600 mb-6 leading-relaxed">{pet.description}</p>

            {/* Breed */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Breed:
              </label>
              <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                <span className="text-slate-800 font-medium">{pet.breed}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-slate-800">₹{pet.price.toLocaleString()}</span>
              </div>
              <p className="text-emerald-600 font-medium">Adoption fee includes vaccination and health checkup</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={adoptNow}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  pet.available
                    ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Adopt Now
              </button>
              <button
                onClick={addToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  pet.available
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>

            {/* Availability Info */}
            {pet.available ? (
              <p className="text-emerald-600 text-sm mt-3 text-center">
                Available for adoption - Ready to join your family!
              </p>
            ) : (
              <p className="text-rose-600 text-sm mt-3 text-center">
                Currently not available for adoption
              </p>
            )}
          </div>
        </div>

        {/* Pet Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              <button className="flex-shrink-0 px-6 py-4 font-medium text-slate-800 border-b-2 border-blue-500">
                Pet Details
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pet Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Pet Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Name</dt>
                    <dd className="text-slate-800 font-medium">{pet.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Breed</dt>
                    <dd className="text-slate-800">{pet.breed}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Age</dt>
                    <dd className="text-slate-800">{pet.age} year{pet.age > 1 ? 's' : ''} old</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Gender</dt>
                    <dd className="text-slate-800 capitalize">{pet.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Location</dt>
                    <dd className="text-slate-800">📍 {pet.location}</dd>
                  </div>
                </dl>
              </div>

              {/* Health Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Health & Care</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Vaccination Status</dt>
                    <dd className="text-slate-800">{pet.vaccination}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Health Condition</dt>
                    <dd className="text-slate-800">{pet.health}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Availability</dt>
                    <dd className={`font-medium ${
                      pet.available ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {pet.available ? 'Available for Adoption' : 'Not Available'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Temperament */}
            {pet.temperament && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Temperament & Personality</h3>
                <div className="flex flex-wrap gap-2">
                  {pet.temperament.map((trait, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {pet.features && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Special Features</h3>
                <ul className="space-y-2">
                  {pet.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Instructions */}
            {pet.careInstructions && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Care Instructions</h3>
                <p className="text-slate-600 leading-relaxed">{pet.careInstructions}</p>
              </div>
            )}

            {/* Detailed Description */}
            {pet.detailedDescription && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">About {pet.name}</h3>
                <p className="text-slate-600 leading-relaxed">{pet.detailedDescription}</p>
              </div>
            )}

            {/* Adoption Process */}
            {pet.adoptionProcess && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">🏠 Adoption Process</h3>
                <p className="text-blue-700 leading-relaxed">{pet.adoptionProcess}</p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Pets */}
        <div className="text-center mt-8">
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to All Pets
          </Link>
        </div>
      </div>

      {/* Cart Floating Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href="/cart"
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold flex items-center gap-2 hover:bg-blue-600"
          >
            <span>🛒</span>
            <span>Cart ({cartCount})</span>
            <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm">
              ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}