'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import data from the provided files
import allProducts, { 
  getFeaturedProducts, 
  getDiscountedProducts,
  getAllCategories,
  searchProducts 
} from '../app/data/allproducts';
import { clothesData, getClothesByCategory } from '../app/data/clothesData';
import { foodsData, getFoodsByCategory } from '../app/data/food';
import { medicinesData, getMedicinesByCategory } from '../app/data/medicines';
import { petsData, getPetsByType } from '../app/data/pets';
import veterinariansData from '../app/data/veterinarians';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredPets, setFeaturedPets] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [petClothes, setPetClothes] = useState([]);
  const [showAllClothes, setShowAllClothes] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accessories, setAccessories] = useState([]);
  const [showAllAccessories, setShowAllAccessories] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const router = useRouter();

  // Hero slider images and data
  const heroSlides = [
    {
      id: 1,
      title: "Find Your Perfect Companion",
      description: "Discover loving pets waiting for their forever home",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=600&fit=crop&auto=format",
      buttonText: "Browse Pets",
      buttonLink: "/pets",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      id: 2,
      title: "Premium Pet Products",
      description: "Everything your pet needs for a happy, healthy life",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=600&fit=crop&auto=format",
      buttonText: "Shop Now",
      buttonLink: "/products",
      bgGradient: "from-blue-500/10 to-green-500/10"
    },
    {
      id: 3,
      title: "Expert Veterinary Care",
      description: "Trusted veterinarians for your pet's health and wellbeing",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&h=600&fit=crop&auto=format",
      buttonText: "Find Vets",
      buttonLink: "/veterinarians",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      id: 4,
      title: "Stylish Pet Fashion",
      description: "Make your pet look fabulous with our trendy collection",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=600&fit=crop&auto=format",
      buttonText: "Explore Fashion",
      buttonLink: "/clothes",
      bgGradient: "from-pink-500/10 to-purple-500/10"
    }
  ];

  useEffect(() => {
    loadHomeData();
    loadCartCount();

    // Auto slide for hero section
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchProducts(searchQuery);
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const loadCartCount = () => {
    try {
      const savedCart = localStorage.getItem('petcare-cart');
      const cartItems = savedCart ? JSON.parse(savedCart) : [];
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      // Load all products data
      setAllProductsData(allProducts);

      // Load categories
      const allCategories = getAllCategories();
      const categoriesData = allCategories.map((category, index) => {
        const categoryProducts = allProducts.filter(product => product.category === category);
        const categoryImage = categoryProducts[0]?.image || 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop&auto=format';
        
        return {
          id: index + 1,
          name: category,
          productCount: categoryProducts.length,
          image: categoryImage,
          link: `/${category.toLowerCase()}`
        };
      });

      // Add Services category
      categoriesData.push({
        id: categoriesData.length + 1,
        name: 'Services',
        image: 'https://images.unsplash.com/photo-1710322928695-c7fb49886cb1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
        link: '/services'
      });
      categoriesData.unshift({
        id: categoriesData.length + 1,
        name: 'Pets',
        image: 'https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBldHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=80&w=1170',
        link: '/pets'
      });

      setCategories(categoriesData);

      // Load featured products
      const featured = getFeaturedProducts();
      setFeaturedProducts(featured.slice(0, 3));

      // Load best selling products (discounted products)
      const bestSelling = getDiscountedProducts();
      const bestSellingFormatted = bestSelling.slice(0, 8).map(product => ({
        id: product.id,
        name: product.name,
        price: `₹${product.price}`,
        image: product.image,
        category: product.category,
        link: product.link
      }));
      setBestSellingProducts(bestSellingFormatted);

      // Load pet clothes
      const clothes = clothesData.slice(0, 3).map(cloth => ({
        ...cloth,
        price: `₹${cloth.price}`,
        originalPrice: `₹${cloth.originalPrice}`,
        discount: `${cloth.discount}% off`,
        colors: cloth.colors || ['Pink', 'Blue', 'Gray'] // Default colors if not available
      }));
      setPetClothes(clothes);

      // Load accessories
      const accessoriesData = allProducts
        .filter(product => product.category === 'Accessories')
        .slice(0, 3)
        .map(accessory => ({
          id: accessory.id,
          name: accessory.name,
          price: `₹${accessory.price}`,
          originalPrice: `₹${accessory.originalPrice}`,
          discount: `${accessory.discount}% off`,
          image: accessory.image,
          category: accessory.subcategory,
          rating: accessory.rating,
          reviews: accessory.reviews,
          badge: accessory.rating >= 4.5 ? 'Bestseller' : 'Popular',
          description: accessory.description,
          link: accessory.link
        }));
      setAccessories(accessoriesData);

      // Load veterinarians with link property
      const vetsWithLinks = veterinariansData.slice(0, 3).map(vet => ({
        ...vet,
        link: `/veterinarians/${vet.id}` // Add missing link property
      }));
      setVeterinarians(vetsWithLinks);

      // Load featured pets
      const pets = petsData.slice(0, 3);
      setFeaturedPets(pets);

      // Load reviews (mock data for now)
      const mockReviews = [
        {
          id: 1,
          name: 'Priya Sharma',
          rating: 5,
          comment: 'Amazing service! My Labrador Max found his perfect home through PetCare. The process was smooth and the team was very supportive throughout the adoption.',
          pet: 'Labrador',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
          date: '2 weeks ago',
          verified: true
        },
        {
          id: 2,
          name: 'Rahul Verma',
          rating: 5,
          comment: 'Best pet products in town! The quality is exceptional and delivery is always on time. My cat Luna loves her new toys and the grooming kit is fantastic!',
          pet: 'Persian Cat',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
          date: '1 month ago',
          verified: true
        },
        {
          id: 3,
          name: 'Anita Patel',
          rating: 5,
          comment: 'The veterinary services are outstanding. Dr. Rajesh treated my parrot with great care and the follow-up was excellent. Highly recommended!',
          pet: 'Parrot',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
          date: '3 weeks ago',
          verified: true
        }
      ];
      setReviews(mockReviews);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    router.push(product.link);
    setSearchQuery('');
    setSearchSuggestions([]);
  };

  const addToCart = (product) => {
    try {
      const savedCart = localStorage.getItem('petcare-cart');
      const cartItems = savedCart ? JSON.parse(savedCart) : [];

      const existingItem = cartItems.find(item => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem('petcare-cart', JSON.stringify(updatedCart));
      setCartCount(prev => prev + 1);

      showNotification(`🎉 ${product.name} added to cart!`, 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('❌ Error adding product to cart. Please try again.', 'error');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="w-full bg-white font-['Inter',sans-serif]">
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 max-w-sm ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{notification.type === 'error' ? '❌' : '✅'}</span>
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        handleSearch={handleSearch}
        searchSuggestions={searchSuggestions}
        handleSuggestionClick={handleSuggestionClick}
        cartCount={cartCount}
        addToCart={addToCart}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <main>
        <HeroSection
          slides={heroSlides}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          setCurrentSlide={setCurrentSlide}
        />
        <CategorySection categories={categories} loading={loading} />
        <FeaturedPetsSection featuredPets={featuredPets} />
        <VeterinariansSection
          veterinarians={veterinarians}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <PetClothesSection
          petClothes={petClothes}
          addToCart={addToCart}
        />
        <AccessoriesSection
          accessories={accessories}
          addToCart={addToCart}
        />
        <FeaturedProducts
          products={featuredProducts}
          loading={loading}
          addToCart={addToCart}
        />
        <BestSellers
          products={bestSellingProducts}
          loading={loading}
          addToCart={addToCart}
        />
        <ReviewsSection
          reviews={reviews}
          currentReviewIndex={currentReviewIndex}
          setCurrentReviewIndex={setCurrentReviewIndex}
        />
      </main>

      <Footer />
    </div>
  );
}

function Header({ searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused, handleSearch, searchSuggestions, handleSuggestionClick, cartCount, addToCart, isMobileMenuOpen, toggleMobileMenu }) {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const services = [
    { name: 'All Services', link: '/services', icon: '🏠' },
    { name: 'Pet Hostel', link: '/services/pet-hostel', icon: '🏨' },
    { name: 'Pet Grooming & Spa', link: '/services/grooming-spa', icon: '✂️' },
    { name: 'Pet Transport', link: '/services/pet-transport', icon: '🚗' },
    { name: 'Pet Insurance', link: '/services/insurance', icon: '🛡️' },
    { name: 'Pet Training', link: '/services/training', icon: '🎓' },
    { name: 'Pet Mating', link: '/services/pet-mating', icon: '💕' },
    { name: 'Pet Walking', link: '/services/pet-walking', icon: '🐾' },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-gray-800">PetCare</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { name: 'All Products', link: '/products' },
                { name: 'Pets', link: '/pets' },
                { name: 'Accessories', link: '/accessories' },
                { name: 'Clothes', link: '/clothes' },
                { name: 'Food', link: '/food' },
                { name: 'Medicines', link: '/medicines' },
                { name: 'Veterinarians', link: '/veterinarians' },
                { name: 'Sell Your Pet', link: '/sell-your-pet' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}>
                <button className="flex items-center text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100">
                  Services
                  <span className="ml-1 text-xs">▼</span>
                </button>

                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.link}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                      >
                        <span className="text-lg mr-2">{service.icon}</span>
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder="Search for pets, products..."
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm placeholder:text-gray-400 bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>

                  {isSearchFocused && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-100 last:border-b-0"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                            <p className="text-gray-500 text-xs">{product.category}</p>
                          </div>
                          <span className="text-orange-600 font-bold text-sm">
                            ₹{product.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors hover:bg-gray-100 rounded-lg">
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/auth/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all font-medium text-sm"
              >
                Login
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors hover:bg-gray-100 rounded-lg"
              >
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>

          <div className="md:hidden mt-3 relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search for pets, products..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 text-sm bg-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </form>

            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                      <p className="text-gray-500 text-xs">{product.category}</p>
                    </div>
                    <span className="text-orange-600 font-bold text-sm">
                      ₹{product.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 bg-gray-50 border rounded-lg p-3">
              <nav className="flex flex-col space-y-1">
                {[
                  'Products', 'Pets', 'Accessories', 'Clothes', 'Food',
                  'Medicines', 'Veterinarians', 'Sell Your Pet'
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-3 rounded hover:bg-white text-sm"
                  >
                    {item}
                  </Link>
                ))}

                <div className="border-t pt-2 mt-2">
                  <div className="text-gray-700 font-bold py-2 px-3 text-sm mb-1">Services</div>
                  <div className="grid grid-cols-2 gap-1 pl-3">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.link}
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-1 text-sm flex items-center hover:bg-white rounded px-2"
                      >
                        <span className="mr-1">{service.icon}</span>
                        <span className="text-xs">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

function HeroSection({ slides, currentSlide, nextSlide, prevSlide, setCurrentSlide }) {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90`} />
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-2xl text-white">
                  <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <span className="text-white font-bold text-sm">🌟 #1 PET CARE PLATFORM</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                    {slide.title}
                  </h1>

                  <p className="text-xl md:text-2xl mb-8 text-white/90 font-light leading-relaxed">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all text-lg font-bold shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                  >
                    <span className="flex items-center gap-3">
                      {slide.buttonText}
                      <span className="text-xl">→</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <span className="text-white text-2xl">←</span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <span className="text-white text-2xl">→</span>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-orange-500 w-8'
                : 'bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animated paw prints decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce">🐾</div>
        <div className="absolute top-20 right-20 animate-bounce delay-100">🐾</div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-200">🐾</div>
        <div className="absolute bottom-10 right-10 animate-bounce delay-300">🐾</div>
      </div>
    </section>
  );
}

function CategorySection({ categories, loading }) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="text-center">
            <div className="inline-block mb-3 px-4 py-1 bg-orange-100 rounded-full border border-orange-200">
              <span className="text-orange-600 font-bold text-xs">✨ EXPLORE CATEGORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Browse Categories
            </h2>
            <p className="text-gray-600 text-base">Discover products for every pet need</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
            {loading ? (
              [...Array(7)].map((_, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="w-full h-32 sm:h-40 bg-gray-200 animate-pulse rounded-lg mb-2" />
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              categories?.map((category) => (
                <Link
                  key={category?.id}
                  href={category?.link}
                  className="group flex flex-col w-full cursor-pointer"
                >
                  <div className="relative w-full h-32 sm:h-40 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                    <img
                      src={category?.image}
                      alt={category?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex justify-between items-start w-full bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-800">
                        {category?.name}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {category?.productCount} products
                      </p>
                    </div>
                    <span className="text-orange-500 text-lg">→</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPetsSection({ featuredPets }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-3 px-4 py-1 bg-white rounded-full border border-orange-200">
            <span className="text-orange-600 font-bold text-xs">🐾 FEATURED PETS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Popular Pets Searches We Serve
          </h2>
          <p className="text-gray-600 text-base">Meet our adorable pets looking for loving homes 💖</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredPets.map(pet => (
            <div key={pet.id} className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {pet.badge}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                <p className="text-gray-600 mb-2 font-medium">{pet.breed} • {pet.age} years</p>
                <p className="text-gray-500 mb-4 text-sm">{pet.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{pet.price.toLocaleString()}
                  </span>
                  <Link
                    href={pet.link}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pets"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all text-base font-bold"
          >
            View All Pets →
          </Link>
        </div>
      </div>
    </section>
  );
}

function VeterinariansSection({ veterinarians, selectedLocation, setSelectedLocation }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-3 px-4 py-1 bg-white rounded-full border border-blue-200">
            <span className="text-blue-600 font-bold text-xs">🩺 EXPERT CARE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Find Expert Veterinarians in Pune
          </h2>
          <p className="text-gray-600 text-base">Professional care for your beloved pets from trusted Pune veterinarians</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex flex-wrap gap-1 border border-blue-200">
            {['All', 'Shivajinagar', 'Viman Nagar', 'Ravet'].map(location => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${selectedLocation === location
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                  }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {veterinarians
            .filter(vet => selectedLocation === 'All' || vet.area === selectedLocation)
            .map(vet => (
              <div key={vet.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative">
                  <div className="h-48 bg-blue-400 relative overflow-hidden">
                    <img
                      src={vet.image}
                      alt={vet.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{vet.name}</h3>
                      <p className="text-sm opacity-90">{vet.specialization}</p>
                    </div>
                    {vet.emergency && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                        <span>🚨</span> 24/7
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-bold text-gray-800">{vet.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({vet.reviews} reviews)</span>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-bold">
                      {vet.experience}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 mt-1">📍</span>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">{vet.address}</p>
                        <p className="text-gray-600 text-xs">{vet.area}, {vet.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">📞</span>
                      <a href={`tel:${vet.phone}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        {vet.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🕒</span>
                      <span className="text-gray-700 text-sm">{vet.availability}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Consultation Fee</p>
                      <p className="text-xl font-bold text-green-600">{vet.fee}</p>
                    </div>
                    <Link
                      href={vet.link}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all font-medium"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/veterinarians"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all text-base font-bold"
          >
            View All Doctors →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PetClothesSection({ petClothes, addToCart }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Fashion for Your Furry Friends 👗
          </h2>
          <p className="text-gray-600 text-base">Stylish clothes that make your pets look adorable 💖</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {petClothes.map(cloth => (
            <div key={cloth.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={cloth.image}
                  alt={cloth.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold text-white ${cloth.badge === 'Bestseller' ? 'bg-orange-500' :
                      cloth.badge === 'New' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                    {cloth.badge}
                  </span>
                </div>

                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {cloth.discount}
                </div>
              </div>

              <div className="p-4">
                <p className="text-purple-600 text-xs font-medium mb-1">{cloth.category}</p>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex-1 pr-2">{cloth.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-bold text-gray-800 text-sm">{cloth.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cloth.description}</p>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Sizes:</p>
                    <div className="flex gap-1">
                      {cloth.sizes.map(size => (
                        <span key={size} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Colors:</p>
                    <div className="flex gap-1">
                      {cloth.colors.slice(0, 3).map(color => (
                        <span key={color} className="w-4 h-4 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: color.toLowerCase() === 'pink' ? '#ec4899' :
                              color.toLowerCase() === 'blue' ? '#3b82f6' :
                                color.toLowerCase() === 'gray' ? '#6b7280' :
                                  color.toLowerCase() === 'red' ? '#ef4444' :
                                    color.toLowerCase() === 'white' ? '#ffffff' :
                                      color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                        color.toLowerCase() === 'green' ? '#10b981' : '#6b7280'
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-800">{cloth.price}</span>
                      <span className="text-gray-500 line-through text-sm">{cloth.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={cloth.link}
                      className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-all font-medium text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(cloth)}
                      className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-all font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/clothes"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all text-base font-bold"
          >
            View All Clothes →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AccessoriesSection({ accessories, addToCart }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Premium Pet Accessories 🎀
          </h2>
          <p className="text-gray-600 text-base">Essential accessories for your pets comfort and style</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {accessories.map(accessory => (
            <div key={accessory.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold text-white ${accessory.badge === 'Bestseller' ? 'bg-orange-500' :
                      accessory.badge === 'Popular' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                    {accessory.badge}
                  </span>
                </div>

                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {accessory.discount}
                </div>
              </div>

              <div className="p-4">
                <p className="text-green-600 text-xs font-medium mb-1">{accessory.category}</p>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex-1 pr-2">{accessory.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-bold text-gray-800 text-sm">{accessory.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{accessory.description}</p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-800">{accessory.price}</span>
                      <span className="text-gray-500 line-through text-sm">{accessory.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={accessory.link}
                      className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-all font-medium text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(accessory)}
                      className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-all font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/accessories"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all text-base font-bold"
          >
            View All Accessories →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ products, loading, addToCart }) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              All Best Products
            </h2>
            <p className="text-gray-600 text-base">Handpicked items for your beloved pets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col w-full h-auto border border-gray-200 rounded-lg">
                  <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-lg" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              products?.map((product) => (
                <div
                  key={product?.id}
                  className="flex flex-col w-full h-auto border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <Link href={product?.link} className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex justify-between items-start w-full p-4">
                    <div className="flex flex-col gap-1 flex-1">
                      <Link href={product?.link}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-500">
                          {product?.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {product?.category}
                      </p>
                      <p className="text-lg font-bold text-orange-600">
                        ₹{product?.price}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Link
                          href={product?.link}
                          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all font-medium text-center"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all text-base font-bold"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellers({ products, loading, addToCart }) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-yellow-50">
      <div className="max-w-6xl mx-auto px-3">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Best Sellers
            </h2>
            <p className="text-gray-600 text-base">Most popular products loved by pet owners</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading ? (
              [...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col w-full h-auto border border-gray-200 rounded-lg bg-white">
                  <div className="w-full h-32 bg-gray-200 animate-pulse rounded-t-lg" />
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-1" />
                    <div className="h-5 bg-gray-200 animate-pulse rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              products?.map((product) => (
                <div
                  key={product?.id}
                  className="flex flex-col w-full h-auto border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all bg-white"
                >
                  <Link href={product?.link} className="w-full h-32 bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex justify-between items-start w-full p-3">
                    <div className="flex flex-col gap-1 flex-1">
                      <Link href={product?.link}>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-orange-500">
                          {product?.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-xs">
                        {product?.category}
                      </p>
                      <p className="text-base font-bold text-orange-600">
                        {product?.price}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <Link
                          href={product?.link}
                          className="flex-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-300 transition-all font-medium text-sm text-center"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-orange-500 text-white px-2 py-1 rounded-lg hover:bg-orange-600 transition-all font-medium text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all text-base font-bold"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ reviews, currentReviewIndex, setCurrentReviewIndex }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            What Our Pet Parents Say 🐾
          </h2>
          <p className="text-gray-600 text-base max-w-3xl mx-auto">
            Don't just take our word for it! Here's what our happy customers have to say about their experience with PetCare.
          </p>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <span className="text-gray-800 font-bold">4.9/5</span>
              <span className="text-gray-500 text-sm">from 500+ reviews</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 relative">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-all duration-300 ${index === currentReviewIndex
                    ? 'opacity-100 block'
                    : 'opacity-0 hidden'
                  }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-800 font-medium leading-relaxed mb-6">
                    "{review.comment}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">{review.name}</h4>
                        {review.verified && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">Pet: {review.pet}</p>
                      <p className="text-gray-500 text-xs">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReviewIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentReviewIndex
                      ? 'bg-blue-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{review.comment}</p>

              <div className="flex items-center space-x-2">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <h5 className="font-semibold text-gray-800 text-sm">{review.name}</h5>
                    {review.verified && (
                      <span className="text-green-500 text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs">{review.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">🐾 PetCare</h3>
            <p className="text-gray-400 text-sm">Your one-stop shop for all your pet needs. Quality products and loving pets.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/product" className="hover:text-white">All products</Link></li>
              <li><Link href="/pets" className="hover:text-white">Pet Adoption</Link></li>
              <li><Link href="/food" className="hover:text-white">Pet Food</Link></li>
              <li><Link href="/clothes" className="hover:text-white">Pet clothes</Link></li>
              <li><Link href="/accessories" className="hover:text-white">Accessories</Link></li>
              <li><Link href="/medicines" className="hover:text-white">Medicines</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/orders" className="hover:text-white">Orders</Link></li>
              <li><Link href="/sell-your-pet" className="hover:text-white">Sell your pet</Link></li>
              <li><Link href="/join-us" className="hover:text-white">Join us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PetCare. All rights reserved. Made with ❤️ for pets</p>
        </div>
      </div>
    </footer>
  );
}