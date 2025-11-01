'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import veterinariansData from '../../data/veterinarians';

// Multi-step Appointment Popup Component
const AppointmentPopup = ({ isOpen, onClose, veterinarian }) => {
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (veterinarian) {
      setBookingForm(prev => ({
        ...prev,
        veterinarian: veterinarian.name
      }));
    }
  }, [veterinarian]);

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
    onClose();
  };

  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Book Appointment with {veterinarian.name}
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
                  step === bookingStep ? 'bg-green-600 text-white' :
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the reason for your visit..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={nextStep}
                disabled={!bookingForm.petName || !bookingForm.petType || !bookingForm.petAge || !bookingForm.reason}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  value={bookingForm.appointmentTime}
                  onChange={(e) => handleBookingInputChange('appointmentTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a time slot</option>
                  {getAvailableTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Appointment Summary</h4>
                <p className="text-green-800 text-sm">
                  <strong>Veterinarian:</strong> {veterinarian.name}<br />
                  <strong>Specialization:</strong> {veterinarian.specialization}<br />
                  <strong>Fee:</strong> {veterinarian.fee}<br />
                  <strong>Location:</strong> {veterinarian.area}, {veterinarian.city}
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
              Your appointment with {veterinarian.name} has been confirmed. 
              You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
              <h4 className="font-semibold mb-2">Appointment Details:</h4>
              <p><strong>Pet:</strong> {bookingForm.petName}</p>
              <p><strong>Date:</strong> {bookingForm.appointmentDate}</p>
              <p><strong>Time:</strong> {bookingForm.appointmentTime}</p>
              <p><strong>Veterinarian:</strong> Dr. {veterinarian.name}</p>
              <p><strong>Location:</strong> {veterinarian.address}</p>
              <p><strong>Contact:</strong> {veterinarian.phone}</p>
            </div>
            <button
              onClick={closeBookingModal}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function VeterinarianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const loadVeterinarian = async () => {
      try {
        const vetId = parseInt(params.id);
        const veterinarian = veterinariansData.find(v => v.id === vetId);
        
        if (veterinarian) {
          setVet(veterinarian);
        } else {
          router.push('/veterinarians');
        }
      } catch (error) {
        console.error('Error loading veterinarian:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVeterinarian();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!vet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Veterinarian Not Found</h1>
          <Link href="/veterinarians" className="text-green-600 hover:text-green-800">
            Back to Veterinarians
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Link href="/veterinarians" className="hover:text-green-500 transition-colors">veterinarians</Link>
                <span className="text-gray-300">/</span>
                <span className="text-green-500 font-semibold">{vet.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vet Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Vet Image */}
            <div className="flex-shrink-0">
              <img
                src={vet.image}
                alt={vet.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-green-100 mx-auto lg:mx-0"
              />
            </div>

            {/* Vet Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{vet.name}</h1>
                  <p className="text-green-600 font-medium text-lg mt-1">{vet.specialization}</p>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center justify-center lg:justify-start space-x-4">
                  {vet.emergency && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                      🚨 Emergency Services
                    </span>
                  )}
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    ⭐ {vet.rating} ({vet.reviews} reviews)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center lg:text-left">
                  <p className="text-gray-600 text-sm">Experience</p>
                  <p className="font-semibold text-gray-800">{vet.experience}</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-gray-600 text-sm">Consultation Fee</p>
                  <p className="text-2xl font-bold text-green-600">{vet.fee}</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-gray-600 text-sm">Availability</p>
                  <p className="font-semibold text-gray-800">{vet.availability}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={vet.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold text-center"
                >
                  📍 Get Directions
                </a>
                <button 
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-center"
                >
                  📅 Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {['overview', 'services', 'reviews', 'location'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">About Dr. {vet.name.split(' ')[2]}</h3>
                  <p className="text-gray-600 leading-relaxed">{vet.about}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Education & Qualifications</h4>
                    <p className="text-gray-600">{vet.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Languages Spoken</h4>
                    <div className="flex flex-wrap gap-2">
                      {vet.languages.map(language => (
                        <span
                          key={language}
                          className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {vet.awards && vet.awards.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Awards & Recognition</h4>
                    <ul className="space-y-2">
                      {vet.awards.map((award, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="text-yellow-500 mr-2">🏆</span>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vet.services.map(service => (
                    <div
                      key={service}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="font-medium text-gray-800">{service}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Reviews</h3>
                <div className="space-y-4">
                  {vet.patientReviews.map(review => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-green-600 text-sm font-bold">
                              {review.patient.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">{review.patient}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">⭐</span>
                          <span className="font-medium">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-gray-400 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Clinic Location</h3>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 font-medium mb-2">📍 {vet.address}</p>
                    <p className="text-gray-600">{vet.area}, {vet.city}</p>
                  </div>
                  <a
                    href={vet.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
                  >
                    📍 Open in Google Maps
                  </a>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2">🗺️</span>
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-sm">Showing location of {vet.address}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Clinic Timings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vet.timings).map(([day, timing]) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 capitalize">{day}</span>
                        <span className={`font-medium ${timing === 'Closed' ? 'text-red-500' : 'text-green-600'}`}>
                          {timing}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contact Card */}
        {vet.emergency && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🚨</span>
              <h3 className="text-xl font-bold text-red-800">24/7 Emergency Services</h3>
            </div>
            <p className="text-red-700 mb-4">
              Available for emergency cases at any time. Call directly for immediate assistance.
            </p>
            <a
              href={`tel:${vet.phone}`}
              className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors font-bold text-lg"
            >
              📞 Emergency Call: {vet.phone}
            </a>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Book an Appointment?</h3>
          <p className="mb-6 opacity-90 text-lg">
            Contact Dr. {vet.name.split(' ')[2]} today for professional veterinary care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${vet.phone}`}
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold shadow-sm text-lg"
            >
              📞 Call Now
            </a>
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="bg-blue-600 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-sm text-lg"
            >
              📅 Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Multi-step Appointment Popup */}
      <AppointmentPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        veterinarian={vet}
      />
    </div>
  );
}