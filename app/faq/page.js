'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const [openSections, setOpenSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ data organized by categories
  const faqData = {
    general: {
      title: 'General Questions',
      icon: '❓',
      questions: [
        {
          question: 'What is PetCare and how does it work?',
          answer: 'PetCare is a comprehensive platform connecting pet owners with trusted veterinarians and pet care services. We help you find verified veterinarians, book appointments online, access emergency services, and get professional advice for your pets.'
        },
        {
          question: 'Is PetCare available in my city?',
          answer: 'Currently, PetCare is available in major cities across India including Pune, Mumbai, Delhi, Bangalore, Chennai, and Hyderabad. We are continuously expanding to new locations. You can check availability by entering your location on our homepage.'
        },
        {
          question: 'Do I need to create an account to book appointments?',
          answer: 'While you can browse veterinarians without an account, creating a free account is required to book appointments, save pet profiles, access medical history, and receive personalized recommendations.'
        },
        {
          question: 'Is PetCare free to use?',
          answer: 'Yes, PetCare is completely free for pet owners. You only pay consultation fees directly to the veterinarians for their services. We do not charge any booking or platform fees.'
        }
      ]
    },
    booking: {
      title: 'Appointment Booking',
      icon: '📅',
      questions: [
        {
          question: 'How do I book an appointment with a veterinarian?',
          answer: 'You can book appointments in three ways: 1) Search for veterinarians on our platform and use the "Book Appointment" button, 2) Call the clinic directly using the provided phone number, 3) Use our emergency booking feature for urgent cases.'
        },
        {
          question: 'Can I cancel or reschedule my appointment?',
          answer: 'Yes, you can cancel or reschedule appointments up to 2 hours before the scheduled time through your account dashboard. For cancellations within 2 hours, please call the clinic directly as cancellation policies may vary.'
        },
        {
          question: 'What information do I need to book an appointment?',
          answer: 'To book an appointment, you\'ll need: Pet\'s name and type, your contact information, reason for visit, preferred date and time. Having your pet\'s medical history ready can also be helpful.'
        },
        {
          question: 'Do you offer emergency appointment booking?',
          answer: 'Yes, we have a dedicated emergency booking system for urgent cases. Look for veterinarians marked with the "Emergency Services" badge who offer 24/7 emergency care.'
        },
        {
          question: 'How far in advance can I book appointments?',
          answer: 'You can book appointments up to 30 days in advance. For routine checkups, we recommend booking 1-2 weeks ahead. Emergency slots are available for immediate booking.'
        }
      ]
    },
    veterinarians: {
      title: 'Veterinarians & Services',
      icon: '👨‍⚕️',
      questions: [
        {
          question: 'How are veterinarians verified on PetCare?',
          answer: 'All veterinarians on our platform undergo a rigorous verification process including: License verification, Experience validation, Clinic inspection, Background checks, and Review authentication.'
        },
        {
          question: 'What types of veterinary services are available?',
          answer: 'We offer comprehensive services including: General consultations, Vaccinations, Surgery, Dental care, Emergency services, Specialist consultations (dermatology, cardiology, orthopedics), Grooming, and Preventive care.'
        },
        {
          question: 'Can I choose a specialist for my pet?',
          answer: 'Yes, you can filter veterinarians by specialization including: Small animals, Exotic pets, Surgery, Dermatology, Cardiology, Orthopedics, Neurology, and Emergency care.'
        },
        {
          question: 'Are home visit services available?',
          answer: 'Many veterinarians on our platform offer home visit services. Look for the "Home Visit Available" badge on veterinarian profiles or filter your search accordingly.'
        },
        {
          question: 'What if I need a second opinion?',
          answer: 'You can easily get second opinions by booking appointments with different specialists. Our platform makes it easy to compare veterinarians and their expertise areas.'
        }
      ]
    },
    payments: {
      title: 'Payments & Pricing',
      icon: '💰',
      questions: [
        {
          question: 'How much does a veterinary consultation cost?',
          answer: 'Consultation fees vary based on the veterinarian\'s experience, specialization, and location. General consultations typically range from ₹300 to ₹800, while specialist consultations may cost ₹800 to ₹2000.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'Payment methods vary by clinic but typically include: Cash, Credit/Debit cards, UPI payments, Net banking, and Digital wallets. Payment is made directly at the clinic after services are rendered.'
        },
        {
          question: 'Do you offer any payment plans or EMI options?',
          answer: 'Some clinics offer payment plans for major procedures. You\'ll need to discuss this directly with the veterinarian. We also partner with pet insurance providers for cashless treatments.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No, PetCare does not charge any hidden fees. The consultation fee displayed is what you pay at the clinic. Additional costs for medications, tests, or procedures will be clearly communicated by the veterinarian.'
        },
        {
          question: 'Can I get an estimate for procedures in advance?',
          answer: 'Yes, you can request cost estimates for specific procedures when booking appointments. Many veterinarians provide transparent pricing for common procedures on their profiles.'
        }
      ]
    },
    emergency: {
      title: 'Emergency Services',
      icon: '🚨',
      questions: [
        {
          question: 'What qualifies as a veterinary emergency?',
          answer: 'Emergency situations include: Difficulty breathing, Severe bleeding, Trauma or injury, Seizures, Poison ingestion, Difficulty urinating, Bloated abdomen, Sudden paralysis, and Unconsciousness.'
        },
        {
          question: 'How quickly can I get emergency care?',
          answer: 'For life-threatening emergencies, we recommend calling the nearest emergency clinic immediately. Our platform helps you find 24/7 emergency clinics with current wait times and availability.'
        },
        {
          question: 'Do all veterinarians handle emergencies?',
          answer: 'No, only veterinarians with the "Emergency Services" badge are equipped for emergency care. These clinics have extended hours, emergency equipment, and staff trained in critical care.'
        },
        {
          question: 'What should I do in case of after-hours emergencies?',
          answer: 'Use our emergency filter to find 24/7 clinics, call the emergency hotline provided on veterinarian profiles, or visit the nearest emergency animal hospital. Always call ahead if possible.'
        },
        {
          question: 'Are emergency services more expensive?',
          answer: 'Emergency services typically have higher fees due to the specialized equipment, staff, and immediate care required. Costs vary but are transparently displayed on our platform.'
        }
      ]
    },
    petCare: {
      title: 'Pet Care & Health',
      icon: '🐾',
      questions: [
        {
          question: 'How often should my pet visit the veterinarian?',
          answer: 'Puppies/kittens: Every 3-4 weeks until 16 weeks old. Adult pets: Annual checkups. Senior pets (7+ years): Every 6 months. Pets with chronic conditions: As recommended by your veterinarian.'
        },
        {
          question: 'What vaccinations does my pet need?',
          answer: 'Core vaccines for dogs: Rabies, Distemper, Parvovirus, Adenovirus. Core vaccines for cats: Rabies, Feline Distemper, Calicivirus, Herpesvirus. Additional vaccines depend on lifestyle and location.'
        },
        {
          question: 'How can I maintain my pet\'s health between visits?',
          answer: 'Regular exercise, balanced diet, dental care, grooming, parasite prevention, mental stimulation, and monitoring for any behavior changes. Use our pet health tracker for reminders.'
        },
        {
          question: 'What are common signs my pet needs veterinary attention?',
          answer: 'Loss of appetite, lethargy, vomiting/diarrhea, difficulty breathing, limping, excessive thirst, behavior changes, skin issues, or any sudden change in normal habits.'
        },
        {
          question: 'Can I get advice on pet nutrition and diet?',
          answer: 'Yes, many veterinarians on our platform offer nutritional counseling. You can also access our library of articles on pet nutrition and dietary requirements for different life stages.'
        }
      ]
    },
    technical: {
      title: 'Technical Support',
      icon: '💻',
      questions: [
        {
          question: 'The website/app is not working properly. What should I do?',
          answer: 'Try these steps: Refresh the page, Clear browser cache, Check your internet connection, Try a different browser. If issues persist, contact our support team with details of the problem.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your email. Password reset links expire after 24 hours for security.'
        },
        {
          question: 'Can I use PetCare on my mobile phone?',
          answer: 'Yes, PetCare is fully responsive and works on all mobile devices. We also have dedicated mobile apps available for iOS and Android with additional features like push notifications.'
        },
        {
          question: 'How do I update my pet\'s information?',
          answer: 'Log into your account, go to "My Pets" section, select the pet you want to update, and click "Edit Profile". You can update medical history, vaccination records, and personal details.'
        },
        {
          question: 'Is my personal and payment information secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your data. We comply with data protection regulations and never share your information with third parties without consent.'
        }
      ]
    }
  };

  const toggleQuestion = (category, index) => {
    setOpenSections(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }));
  };

  // Filter FAQs based on search query
  const filteredFAQs = Object.entries(faqData).reduce((acc, [key, category]) => {
    const filteredQuestions = category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredQuestions.length > 0) {
      acc[key] = {
        ...category,
        questions: filteredQuestions
      };
    }

    return acc;
  }, {});

  const allQuestions = Object.values(faqData).flatMap(category => category.questions);
  const filteredAllQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <span className="text-green-500 font-semibold">FAQs</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to common questions about PetCare services, appointments, 
            veterinarians, and pet health care.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for questions or answers..."
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {filteredAllQuestions.length} questions found
            </p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
            <p className="text-gray-600 text-sm mb-4">Contact our support team for urgent assistance</p>
            <a href="tel:+911234567890" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
              Call Support
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-semibold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-gray-600 text-sm mb-4">Find and book with verified veterinarians</p>
            <Link href="/veterinarians" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Find Vets
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🚨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Emergency Care</h3>
            <p className="text-gray-600 text-sm mb-4">24/7 emergency veterinary services</p>
            <Link href="/veterinarians?emergency=true" className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
              Emergency Help
            </Link>
          </div>
        </div>

        {/* Search Results View */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="space-y-4">
              {filteredAllQuestions.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleQuestion('search', index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openSections[`search-${index}`] ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSections[`search-${index}`] && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categorized FAQs */}
        {!searchQuery && Object.entries(filteredFAQs).map(([key, category]) => (
          <div key={key} className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-3">{category.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleQuestion(key, index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openSections[`${key}-${index}`] ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openSections[`${key}-${index}`] && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {searchQuery && filteredAllQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any questions matching "{searchQuery}". Try different keywords or browse the categories above.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6 opacity-90 text-lg max-w-2xl mx-auto">
            Our support team is here to help you with any questions about PetCare services, 
            appointments, or pet health concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@petcare.com"
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold shadow-sm text-lg"
            >
              📧 Email Support
            </a>
            <a
              href="tel:+911234567890"
              className="bg-blue-600 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-sm text-lg"
            >
              📞 Call Support
            </a>
            <Link
              href="/veterinarians"
              className="bg-purple-600 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold shadow-sm text-lg"
            >
              👨‍⚕️ Find Veterinarians
            </Link>
          </div>
          <div className="mt-6 text-green-100 text-sm">
            <p>Support Hours: Monday - Sunday, 7:00 AM - 11:00 PM IST</p>
            <p>Emergency Support: Available 24/7 for urgent cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}