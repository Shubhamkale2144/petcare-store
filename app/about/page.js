'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');
  const [counters, setCounters] = useState({
    pets: 0,
    families: 0,
    cities: 0,
    team: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const targetCounters = {
    pets: 50000,
    families: 25000,
    cities: 50,
    team: 200
  };

  useEffect(() => {
    // Animate counters
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targetCounters).forEach(key => {
      let currentStep = 0;
      const targetValue = targetCounters[key];
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounters(prev => ({
          ...prev,
          [key]: Math.min(Math.floor(stepValue * currentStep), targetValue)
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  const companyStory = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Founded with a vision to create a safe and reliable platform for pet lovers to connect and trade responsibly.',
      icon: '🚀'
    },
    {
      year: '2019',
      title: 'First Milestone',
      description: 'Successfully facilitated 1,000+ pet adoptions and expanded to 10 major cities across India.',
      icon: '🏆'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our mobile app and introduced verified seller programs with comprehensive background checks.',
      icon: '📱'
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Expanded services to include pet boarding, grooming, and veterinary care partnerships.',
      icon: '🌟'
    },
    {
      year: '2024',
      title: 'Leading Platform',
      description: 'Became India\'s most trusted pet care platform with 50,000+ happy pets and 25,000+ satisfied families.',
      icon: '👑'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Founder & CEO',
      bio: 'Veterinarian with 15+ years of experience. Passionate about animal welfare and ethical pet trading.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      expertise: ['Animal Welfare', 'Business Strategy', 'Veterinary Care']
    },
    {
      name: 'Rahul Verma',
      role: 'CTO',
      bio: 'Tech enthusiast with expertise in building scalable platforms. Leads our technology and innovation initiatives.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      expertise: ['Technology', 'Platform Development', 'AI & ML']
    },
    {
      name: 'Anita Patel',
      role: 'Head of Operations',
      bio: 'Operations expert ensuring seamless experiences for both pet owners and buyers across all our services.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
      expertise: ['Operations', 'Customer Experience', 'Logistics']
    },
    {
      name: 'Dr. Sameer Kumar',
      role: 'Chief Veterinary Officer',
      bio: 'Leading our veterinary partnerships and ensuring all health protocols are maintained across the platform.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      expertise: ['Veterinary Medicine', 'Health Protocols', 'Animal Care']
    }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Compassion First',
      description: 'Every decision we make is guided by our love and compassion for animals.'
    },
    {
      icon: '🛡️',
      title: 'Trust & Safety',
      description: 'We maintain the highest standards of safety and verification for all transactions.'
    },
    {
      icon: '🌟',
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide and every interaction we have.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building a strong, supportive community of pet lovers is at our core.'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'Complete transparency in all our processes and communications.'
    },
    {
      icon: '🌱',
      title: 'Innovation',
      description: 'Continuously innovating to improve the pet care ecosystem.'
    }
  ];

  const achievements = [
    {
      number: '4.9/5',
      title: 'Customer Rating',
      description: 'Based on 10,000+ reviews'
    },
    {
      number: '99%',
      title: 'Success Rate',
      description: 'Successful pet adoptions'
    },
    {
      number: '24/7',
      title: 'Support',
      description: 'Customer care availability'
    },
    {
      number: '50+',
      title: 'Cities',
      description: 'Across India'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Mehta',
      role: 'Pet Parent',
      content: 'PetCare helped me find the perfect Labrador for my family. The verification process gave us complete peace of mind.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sunita Reddy',
      role: 'Breeder',
      content: 'As a responsible breeder, I appreciate the platform\'s commitment to ethical practices and animal welfare.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Amit Kumar',
      role: 'Veterinary Partner',
      content: 'Partnering with PetCare has allowed us to reach more pet owners and provide quality care to their beloved pets.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-gray-800">PetCare</span>
              </Link>
              
              {/* Desktop Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-purple-600 font-semibold">About Us</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/food" className="text-gray-600 hover:text-purple-600 transition-colors">Pet Food</Link>
              <Link href="/veterinarians" className="text-gray-600 hover:text-purple-600 transition-colors">Veterinarians</Link>
              <Link href="/products" className="text-gray-600 hover:text-purple-600 transition-colors">Products</Link>
              <Link href="/sell-your-pet" className="text-gray-600 hover:text-purple-600 transition-colors">Sell Your Pet</Link>
              <Link href="/about" className="text-purple-600 font-semibold border-b-2 border-purple-600">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                  className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 text-purple-700 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">ℹ️</span>
                  <span>About Us</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700"
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

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
              About PetCare
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              We're on a mission to create India's most trusted and compassionate 
              pet care ecosystem. Connecting loving homes with deserving pets since 2018.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <button 
                onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm md:text-base"
              >
                Our Story
              </button>
              <button 
                onClick={() => document.getElementById('team').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-colors font-medium text-sm md:text-base"
              >
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{counters.pets.toLocaleString()}+</div>
              <div className="text-purple-200 text-sm md:text-base">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{counters.families.toLocaleString()}+</div>
              <div className="text-purple-200 text-sm md:text-base">Loving Families</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{counters.cities}+</div>
              <div className="text-purple-200 text-sm md:text-base">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{counters.team}+</div>
              <div className="text-purple-200 text-sm md:text-base">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              From a simple idea to India's leading pet care platform, our journey has been guided by 
              our love for animals and commitment to ethical practices.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-purple-200 transform -translate-x-1/2"></div>
              
              {companyStory.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-8 md:mb-12">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold z-10">
                    {milestone.icon}
                  </div>
                  <div className="ml-4 md:ml-8 flex-1">
                    <div className="bg-gray-50 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2 md:mb-3">
                        <span className="text-purple-600 font-bold text-base md:text-lg">{milestone.year}</span>
                        <div className="ml-3 w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              These core values guide everything we do and shape the culture of our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-4 md:p-6 text-center hover:shadow-lg transition-shadow border border-gray-200">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{value.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Passionate professionals dedicated to making a difference in the lives of pets and their families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-2 md:mb-3 text-sm md:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs md:text-sm font-semibold text-gray-700">Expertise:</h4>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 md:py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Achievements</h2>
            <p className="text-purple-200 max-w-2xl mx-auto text-sm md:text-base">
              Milestones that reflect our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{achievement.number}</div>
                <div className="text-base md:text-lg font-semibold mb-1">{achievement.title}</div>
                <div className="text-purple-200 text-xs md:text-sm">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Hear from our community of pet parents, breeders, and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-sm md:text-base">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
              Whether you're looking to adopt, sell, or simply be part of our pet-loving community, 
              we love to have you with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-green-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm md:text-base text-center"
              >
                All Products
              </Link>
              <Link 
                href="/sell-your-pet"
                className="bg-purple-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm md:text-base text-center"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">PetCare</h3>
              <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                India's most trusted pet care platform. Connecting loving homes with deserving pets since 2018.
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <span className="text-xl md:text-2xl cursor-pointer hover:text-purple-400 transition-colors">📘</span>
                <span className="text-xl md:text-2xl cursor-pointer hover:text-purple-400 transition-colors">📷</span>
                <span className="text-xl md:text-2xl cursor-pointer hover:text-purple-400 transition-colors">🐦</span>
              </div>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/food" className="hover:text-white transition-colors">Pet Food</Link></li>
                <li><Link href="/veterinarians" className="hover:text-white transition-colors">Veterinarians</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Support</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Info</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
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
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 PetCare. All rights reserved. | Made with ❤️ for pets</p>
          </div>
        </div>
      </footer>
    </div>
  );
}