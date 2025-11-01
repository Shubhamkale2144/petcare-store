'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import veterinariansData from '../data/veterinarians';

export default function VeterinariansPage() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: 'all',
    specialization: 'all',
    availability: 'all',
    emergency: false,
    minRating: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    petName: '',
    petType: '',
    petAge: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    urgency: 'routine'
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadVeterinarians();
  }, []);

  useEffect(() => {
    filterVeterinarians();
  }, [filters, searchQuery, veterinarians, sortBy]);

  const loadVeterinarians = async () => {
    try {
      // Simulate API loading delay
      setTimeout(() => {
        setVeterinarians(veterinariansData);
        setFilteredVets(veterinariansData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading veterinarians:', error);
      setLoading(false);
    }
  };

  const sortVeterinarians = (vets) => {
    const sortedVets = [...vets];

    switch (sortBy) {
      case 'rating':
        return sortedVets.sort((a, b) => b.rating - a.rating);
      case 'experience':
        return sortedVets.sort((a, b) => {
          const aYears = parseInt(a.experience);
          const bYears = parseInt(b.experience);
          return bYears - aYears;
        });
      case 'fee-low-high':
        return sortedVets.sort((a, b) => a.feeNumber - b.feeNumber);
      case 'fee-high-low':
        return sortedVets.sort((a, b) => b.feeNumber - a.feeNumber);
      case 'name':
        return sortedVets.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedVets;
    }
  };

  const filterVeterinarians = () => {
    let filtered = veterinarians;

    if (searchQuery) {
      filtered = filtered.filter(vet =>
        vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(vet => vet.area === filters.location);
    }

    if (filters.specialization !== 'all') {
      filtered = filtered.filter(vet => vet.specialization.includes(filters.specialization));
    }

    if (filters.emergency) {
      filtered = filtered.filter(vet => vet.emergency);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(vet => vet.rating >= filters.minRating);
    }

    const sortedAndFiltered = sortVeterinarians(filtered);
    setFilteredVets(sortedAndFiltered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const clearFilters = () => {
    setFilters({
      location: 'all',
      specialization: 'all',
      availability: 'all',
      emergency: false,
      minRating: 0
    });
    setSearchQuery('');
    setSortBy('rating');
  };

  const getUniqueSpecializations = () => {
    const specializations = veterinarians.map(vet => vet.specialization);
    return [...new Set(specializations)];
  };

  const getUniqueAreas = () => {
    const areas = veterinarians.map(vet => vet.area);
    return [...new Set(areas)];
  };

  const handleViewDetails = (vetId) => {
    router.push(`/veterinarians/${vetId}`);
  };

  const handleBookAppointment = (vet) => {
    setSelectedVet(vet);
    setBookingForm({
      petName: '',
      petType: '',
      petAge: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
      urgency: 'routine'
    });
    setBookingStep(1);
    setShowBookingModal(true);
  };

  const handleBookingInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setBookingStep(prev => prev + 1);
  };

  const prevStep = () => {
    setBookingStep(prev => prev - 1);
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingStep(4); // Success step
    }, 2000);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedVet(null);
    setBookingStep(1);
  };

  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  };

  // Booking Modal Component
  const BookingModal = () => {
    if (!showBookingModal || !selectedVet) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Book Appointment with {selectedVet.name}
            </h2>
            <button
              onClick={closeBookingModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === bookingStep ? 'bg-blue-600 text-white' :
                    step < bookingStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < bookingStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Pet Details</span>
              <span>Owner Info</span>
              <span>Appointment</span>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Step 1: Pet Details */}
          {bookingStep === 1 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    value={bookingForm.petName}
                    onChange={(e) => handleBookingInputChange('petName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your pet's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Type *
                  </label>
                  <select
                    value={bookingForm.petType}
                    onChange={(e) => handleBookingInputChange('petType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select pet type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Age *
                  </label>
                  <input
                    type="text"
                    value={bookingForm.petAge}
                    onChange={(e) => handleBookingInputChange('petAge', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2 years, 6 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    value={bookingForm.reason}
                    onChange={(e) => handleBookingInputChange('reason', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the reason for your visit..."
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={nextStep}
                  disabled={!bookingForm.petName || !bookingForm.petType || !bookingForm.petAge || !bookingForm.reason}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Owner Information */}
          {bookingStep === 2 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={bookingForm.ownerName}
                    onChange={(e) => handleBookingInputChange('ownerName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={bookingForm.ownerEmail}
                    onChange={(e) => handleBookingInputChange('ownerEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.ownerPhone}
                    onChange={(e) => handleBookingInputChange('ownerPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={bookingForm.urgency}
                    onChange={(e) => handleBookingInputChange('urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="routine">Routine Checkup</option>
                    <option value="urgent">Urgent Care</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!bookingForm.ownerName || !bookingForm.ownerEmail || !bookingForm.ownerPhone}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Appointment Details */}
          {bookingStep === 3 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={bookingForm.appointmentDate}
                    onChange={(e) => handleBookingInputChange('appointmentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={bookingForm.appointmentTime}
                    onChange={(e) => handleBookingInputChange('appointmentTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a time slot</option>
                    {getAvailableTimeSlots().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
                  <p className="text-blue-800 text-sm">
                    <strong>Veterinarian:</strong> {selectedVet.name}<br />
                    <strong>Fee:</strong> {selectedVet.fee}<br />
                    <strong>Location:</strong> {selectedVet.area}, {selectedVet.city}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={submitBooking}
                  disabled={!bookingForm.appointmentDate || !bookingForm.appointmentTime}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {bookingStep === 4 && (
            <div className="p-6 text-center">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Appointment Booked Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment with {selectedVet.name} has been confirmed. 
                You will receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                <h4 className="font-semibold mb-2">Appointment Details:</h4>
                <p><strong>Pet:</strong> {bookingForm.petName}</p>
                <p><strong>Date:</strong> {bookingForm.appointmentDate}</p>
                <p><strong>Time:</strong> {bookingForm.appointmentTime}</p>
                <p><strong>Veterinarian:</strong> {selectedVet.name}</p>
                <p><strong>Location:</strong> {selectedVet.address}</p>
              </div>
              <button
                onClick={closeBookingModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading veterinarians...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-blue-600 hidden sm:block">PetCare</span>
              </Link>
              
              {/* Desktop Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="text-blue-600 font-semibold">Veterinarians</span>
              </div>
            </div>

            {/* Page Title - Mobile */}
            <div className="md:hidden text-center flex-1">
              <h1 className="text-lg font-bold text-slate-800">Veterinarians</h1>
            </div>

            {/* Empty div for balance */}
            <div className="w-20"></div>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center justify-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Heading */}
      <div className="bg-blue-100 border-b border-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3">
              Expert Veterinarians & Pet Care
            </h1>
            <p className="text-base md:text-xl text-blue-700 font-medium">
              Professional medical care for your beloved pets 🩺
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            <span className="bg-white text-blue-600 text-xs rounded-full px-2 py-1 ml-1">
              {filteredVets.length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-6 border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Veterinarians
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, specialization..."
                    className="w-full px-4 py-2.5 pl-10 pr-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="all">All Areas in Pune</option>
                  {getUniqueAreas().map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specialization
                </label>
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="all">All Specializations</option>
                  {getUniqueSpecializations().map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Emergency Only */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.emergency}
                    onChange={(e) => handleFilterChange('emergency', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">24/7 Emergency Services</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800 font-medium text-center">
                  <span className="font-bold text-lg">{filteredVets.length}</span> veterinarians found
                </p>
                {filters.location !== 'all' && (
                  <p className="text-xs text-blue-600 mt-1">
                    Location: {filters.location}
                  </p>
                )}
                {filters.specialization !== 'all' && (
                  <p className="text-xs text-blue-600 mt-1">
                    Specialization: {filters.specialization}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header with Sort */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Available Veterinarians
                </h2>
                <p className="text-slate-600 mt-1 text-sm md:text-base">
                  Find the perfect care for your pet
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 font-medium hidden sm:block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
                >
                  <option value="rating">Rating (High to Low)</option>
                  <option value="experience">Experience (High to Low)</option>
                  <option value="fee-low-high">Fee (Low to High)</option>
                  <option value="fee-high-low">Fee (High to Low)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            {filteredVets.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="text-6xl mb-4">🩺</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No veterinarians found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:gap-6">
                {filteredVets.map(vet => (
                  <div key={vet.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-6">
                        {/* Vet Image and Basic Info */}
                        <div className="flex-shrink-0">
                          <div className="flex flex-col items-center lg:items-start gap-3">
                            <img
                              src={vet.image}
                              alt={vet.name}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-100"
                            />
                            <div className="text-center lg:text-left">
                              <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                                <span className="text-yellow-500 text-sm">⭐</span>
                                <span className="font-semibold text-slate-800 text-sm">{vet.rating}</span>
                                <span className="text-slate-500 text-xs">({vet.reviews})</span>
                              </div>
                              {vet.emergency && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  🚨 Emergency
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Vet Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">{vet.name}</h3>
                              <p className="text-blue-600 font-medium text-sm md:text-base">{vet.specialization}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl md:text-2xl font-bold text-emerald-600">{vet.fee}</p>
                              <p className="text-xs md:text-sm text-slate-500">Consultation Fee</p>
                            </div>
                          </div>

                          {/* Experience and Next Available */}
                          <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              📅 {vet.experience} experience
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              ✅ Next: {vet.nextAvailable}
                            </span>
                          </div>

                          {/* Expertise */}
                          <div className="mb-3">
                            <p className="text-sm text-slate-600 mb-2 font-medium">Areas of Expertise:</p>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {vet.expertise.slice(0, 3).map((exp, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {exp}
                                </span>
                              ))}
                              {vet.expertise.length > 3 && (
                                <span className="text-slate-500 text-xs font-medium">+{vet.expertise.length - 3} more</span>
                              )}
                            </div>
                          </div>

                          {/* Services */}
                          <div className="mb-3">
                            <p className="text-sm text-slate-600 mb-2 font-medium">Services Offered:</p>
                            <div className="flex flex-wrap gap-1">
                              {vet.services.slice(0, 3).map(service => (
                                <span
                                  key={service}
                                  className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium"
                                >
                                  {service}
                                </span>
                              ))}
                              {vet.services.length > 3 && (
                                <span className="text-slate-500 text-xs font-medium">+{vet.services.length - 3} more</span>
                              )}
                            </div>
                          </div>

                          {/* Location and Contact */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm text-slate-600">
                            <div className="flex items-center">
                              <span className="mr-2 text-slate-400">📍</span>
                              <span className="text-sm">{vet.area}, {vet.city}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2 text-slate-400">🕒</span>
                              <span className="text-sm">{vet.availability}</span>
                            </div>
                          </div>

                          {/* Languages */}
                          <div className="mb-4">
                            <p className="text-sm text-slate-600 mb-2 font-medium">Languages:</p>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {vet.languages.map(lang => (
                                <span
                                  key={lang}
                                  className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-200">
                            <button
                              onClick={() => handleViewDetails(vet.id)}
                              className="flex-1 bg-slate-800 text-white px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors font-medium text-sm text-center"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => handleBookAppointment(vet)}
                              className="flex-1 bg-blue-600 text-white px-3 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Info Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Why Choose Our Veterinarians?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🏥</div>
                  <h4 className="font-semibold text-slate-800 mb-2">Expert Care</h4>
                  <p className="text-slate-600 text-sm">Highly qualified veterinarians with specialized training</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⏰</div>
                  <h4 className="font-semibold text-slate-800 mb-2">24/7 Emergency</h4>
                  <p className="text-slate-600 text-sm">Round-the-clock emergency services for critical cases</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💝</div>
                  <h4 className="font-semibold text-slate-800 mb-2">Compassionate Service</h4>
                  <p className="text-slate-600 text-sm">Gentle and caring approach for your beloved pets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
}