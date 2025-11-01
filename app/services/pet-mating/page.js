'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetMatingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petType: 'Dogs',
    breed: '',
    gender: '',
    isPetParent: '',
    plan: '',
    location: 'Pune',
    remarks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedPetType, setSelectedPetType] = useState('all');

  const matingImages = [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop&auto=format'
  ];

  const allPets = [
    {
      type: 'Dogs',
      pets: [
        {
          name: 'Hiroki',
          breed: 'Pug',
          gender: 'Male',
          age: '2 Years',
          city: 'Pune',
          temperament: 'Playful, Gentle, Affectionate',
          needs: 'Looking for Female Pug',
          image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop&auto=format',
          kciRegistered: true,
          vaccinated: true
        },
        {
          name: 'Sheru',
          breed: 'Indian Spitz',
          gender: 'Male',
          age: '3 Years',
          city: 'Pune',
          temperament: 'Energetic, Friendly, Loyal',
          needs: 'Looking for Female Indian Spitz',
          image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&auto=format',
          kciRegistered: true,
          vaccinated: true
        },
        {
          name: 'Muffin',
          breed: 'Lhasa Apso',
          gender: 'Male',
          age: '2.5 Years',
          city: 'Pune',
          temperament: 'Calm, Gentle, Protective',
          needs: 'Looking for Female Lhasa Apso',
          image: 'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=400&h=300&fit=crop&auto=format',
          kciRegistered: true,
          vaccinated: true
        },
        {
          name: 'Mufasa',
          breed: 'German Shepherd',
          gender: 'Male',
          age: '3 Years',
          city: 'Pune',
          temperament: 'Intelligent, Loyal, Protective',
          needs: 'Looking for Female German Shepherd',
          image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400&h=300&fit=crop&auto=format',
          kciRegistered: true,
          vaccinated: true
        }
      ]
    },
    {
      type: 'Cats',
      pets: [
        {
          name: 'Luna',
          breed: 'Persian',
          gender: 'Female',
          age: '1.5 Years',
          city: 'Pune',
          temperament: 'Calm, Affectionate, Gentle',
          needs: 'Looking for Male Persian',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&auto=format',
          vaccinated: true,
          pedigree: true
        },
        {
          name: 'Simba',
          breed: 'Maine Coon',
          gender: 'Male',
          age: '2 Years',
          city: 'Pune',
          temperament: 'Playful, Friendly, Large',
          needs: 'Looking for Female Maine Coon',
          image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop&auto=format',
          vaccinated: true,
          pedigree: true
        },
        {
          name: 'Bella',
          breed: 'Siamese',
          gender: 'Female',
          age: '1.8 Years',
          city: 'Pune',
          temperament: 'Vocal, Intelligent, Social',
          needs: 'Looking for Male Siamese',
          image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop&auto=format',
          vaccinated: true,
          pedigree: true
        }
      ]
    },
    {
      type: 'Birds',
      pets: [
        {
          name: 'Rio',
          breed: 'Parrot',
          gender: 'Male',
          age: '1 Year',
          city: 'Pune',
          temperament: 'Talkative, Intelligent, Social',
          needs: 'Looking for Female Parrot',
          image: 'https://images.unsplash.com/photo-1552727451-6f5671e14d83?w=400&h=300&fit=crop&auto=format',
          vaccinated: true
        },
        {
          name: 'Sky',
          breed: 'Lovebirds',
          gender: 'Female',
          age: '8 Months',
          city: 'Pune',
          temperament: 'Affectionate, Active, Colorful',
          needs: 'Looking for Male Lovebirds',
          image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&h=300&fit=crop&auto=format',
          vaccinated: true
        }
      ]
    },
    {
      type: 'Rabbits',
      pets: [
        {
          name: 'Snowball',
          breed: 'Himalayan',
          gender: 'Male',
          age: '1 Year',
          city: 'Pune',
          temperament: 'Gentle, Calm, Friendly',
          needs: 'Looking for Female Himalayan',
          image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop&auto=format',
          vaccinated: true
        },
        {
          name: 'Coco',
          breed: 'Dutch',
          gender: 'Female',
          age: '10 Months',
          city: 'Pune',
          temperament: 'Playful, Curious, Active',
          needs: 'Looking for Male Dutch Rabbit',
          image: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&h=300&fit=crop&auto=format',
          vaccinated: true
        }
      ]
    }
  ];

  const matingBenefits = [
    {
      icon: '🧬',
      title: 'Purebred Lineage',
      description: 'Ensures purebred lineage and strong genetics'
    },
    {
      icon: '🏥',
      title: 'Health Protection',
      description: 'Reduces the risk of health complications in offspring'
    },
    {
      icon: '😊',
      title: 'Emotional Health',
      description: 'Supports natural behaviors and emotional health'
    },
    {
      icon: '🌟',
      title: 'Better Temperament',
      description: 'Encourages better temperament and social traits'
    }
  ];

  const processSteps = [
    {
      icon: '📝',
      title: 'Profile Creation',
      description: 'Register your pet with detailed health records, breed, age, and lineage information'
    },
    {
      icon: '🔍',
      title: 'Browse & Filter',
      description: 'Explore verified pet profiles and filter by breed, age, and preferences'
    },
    {
      icon: '💞',
      title: 'Matchmaking',
      description: 'Get personalized match suggestions for compatible and safe pairing'
    },
    {
      icon: '👥',
      title: 'Connect',
      description: 'Connect with other pet parents to coordinate the mating process'
    },
    {
      icon: '🏥',
      title: 'Expert Guidance',
      description: 'Get veterinary guidance and support throughout the process'
    },
    {
      icon: '🐾',
      title: 'Post-Mating Care',
      description: 'Access expert care tips for pregnancy and offspring care'
    }
  ];

  const breedOptions = {
    'Dogs': ['Pug', 'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle', 'Indian Spitz', 'Lhasa Apso', 'Shih Tzu', 'Boxer', 'Poodle', 'Other'],
    'Cats': ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Ragdoll', 'British Shorthair', 'Scottish Fold', 'Other'],
    'Birds': ['Parrot', 'Lovebirds', 'Cockatiel', 'Budgerigar', 'Canary', 'Other'],
    'Rabbits': ['Himalayan', 'Dutch', 'Mini Lop', 'Lionhead', 'Angora', 'Other']
  };

  const stats = [
    { number: '2039', label: 'Pets Available', icon: '🐕' },
    { number: '500+', label: 'Successful Matings', icon: '💖' },
    { number: '50+', label: 'Breeds Available', icon: '🏷️' },
    { number: '100%', label: 'Verified Pets', icon: '✅' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % matingImages.length);
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
      alert('Thank you for your interest! Our pet mating expert will contact you shortly.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        petType: 'Dogs',
        breed: '',
        gender: '',
        isPetParent: '',
        plan: '',
        location: 'Pune',
        remarks: ''
      });
    }, 2000);
  };

  const filteredPets = selectedPetType === 'all' 
    ? allPets.flatMap(category => category.pets)
    : allPets.find(category => category.type === selectedPetType)?.pets || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/services" className="hover:text-pink-500 transition-colors">Services</Link>
                <span className="text-gray-300">/</span>
                <span className="text-pink-500 font-semibold">Pet Mating</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold">
                💞 Professional Pet Mating
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Your pet deserves a legacy
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Find a healthy mate for your furry friend because love knows not bounds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('available-pets').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Find a Mate 🐾
                </button>
                <button 
                  onClick={() => document.getElementById('mating-form').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 font-bold text-lg text-center"
                >
                  List Your Pet
                </button>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {matingImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Pet Mating ${index + 1}`}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {matingImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-pink-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Pet Mating Services in Pune | Verified Partners
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Looking to breed your pet responsibly? Whether you're a breeder or a loving pet parent, 
              PetCare is your trusted platform to find pet mating services in Pune, offering access to 
              certified studs and female pets for mating across Pune.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">We Provide:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Healthy pets for mating of all breeds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Registered pets for breeding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Pets with vaccination & health records</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Mating partners in Pune</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Benefits of Planned Mating
            </h2>
            <p className="text-gray-600 text-lg">
              Mating helps preserve breed standards, reduce inherited diseases, and support the emotional well-being of pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {matingBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Pets Section */}
      <section id="available-pets" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Available Pets for Mating in Pune
            </h2>
            <p className="text-gray-600 text-lg">
              Discover verified pets looking for mating partners in Pune
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedPetType('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPetType === 'all'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Pets
            </button>
            {allPets.map(category => (
              <button
                key={category.type}
                onClick={() => setSelectedPetType(category.type)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedPetType === category.type
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {pet.kciRegistered && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        KCI
                      </span>
                    )}
                    {pet.vaccinated && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Vaccinated
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                    {pet.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-semibold">{pet.breed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-semibold">{pet.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-semibold">{pet.age}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{pet.city}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperament:</span>
                      <span className="font-semibold text-right">{pet.temperament}</span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-pink-700 text-sm font-semibold text-center">
                      {pet.needs}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all duration-300 font-semibold text-sm flex items-center gap-2">
                      <span>📞</span>
                      Contact Parent
                    </button>
                    <button className="border border-pink-500 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 font-semibold text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No pets found</h3>
              <p className="text-gray-600">Try selecting a different pet type or check back later for new listings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Mating Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Our Mating Service Works
            </h2>
            <p className="text-gray-600 text-lg">
              From finding the ideal mate to post-pregnancy support, we're with you at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-2xl font-bold text-pink-500 mb-2">{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mating Information */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Pet Mating Age & Breeding Readiness
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ideal Mating Age:</h3>
                    <p className="text-gray-600">
                      Pets can technically mate after hitting puberty (around 6-12 months of age). 
                      However, we advise mating only after 1.5 to 1.8 years of age to ensure full 
                      physical and reproductive maturity, healthier outcomes, and reduced risk of complications.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparation for Mating:</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Health and fertility checkups</li>
                      <li>• Vaccinations up-to-date</li>
                      <li>• Calm and secure mating environment</li>
                      <li>• Vet-approved breeding clearance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Responsible Pet Mating Services
                </h2>
                <p className="text-gray-600 mb-4">
                  We guide you through the entire process with complete support and expert advice.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Services Include:</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Understanding heat cycles and timing</li>
                    <li>• Introducing pets safely</li>
                    <li>• Monitoring mating sessions</li>
                    <li>• Post-mating health advice</li>
                    <li>• Pregnancy care guidance</li>
                    <li>• Offspring care support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find the Perfect Mate for Your Pet?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us for verified mating partners and expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+917597972222"
              className="bg-white text-pink-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📞 Call +91 75979 72222
            </a>
            <a
              href="https://wa.me/917597972222"
              className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              💬 WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* Mating Form */}
      <section id="mating-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Find Your Pet's Perfect Match
              </h2>
              <p className="text-gray-600 text-lg">
                Hey! Still not found what you are looking for? No worries!! Let our pet experts come to your rescue.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact No *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                        placeholder="Your email address"
                      />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      >
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                        <option value="Birds">Birds</option>
                        <option value="Rabbits">Rabbits</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                      <select
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      >
                        <option value="">Select Breed</option>
                        {breedOptions[formData.petType]?.map(breed => (
                          <option key={breed} value={breed}>{breed}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Are you a Pet Parent?</label>
                      <select
                        name="isPetParent"
                        value={formData.isPetParent}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No, I'm a breeder</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plan to</label>
                      <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      >
                        <option value="">Select Plan</option>
                        <option value="Find Mate">Find a Mate</option>
                        <option value="List Pet">List My Pet</option>
                        <option value="Consultation">Get Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                        placeholder="Your location"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-pink-500 text-white px-12 py-4 rounded-lg hover:bg-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Schedule a Call with Expert'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">PetCare Mating Services</h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for responsible pet mating in Pune
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}