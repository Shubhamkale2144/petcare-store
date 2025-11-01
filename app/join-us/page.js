'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JoinUsPage() {
  const [activeTab, setActiveTab] = useState('openings');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Chief Veterinary Officer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format',
      bio: '15+ years of veterinary experience with specialization in emergency care and surgery.',
      department: 'Medical',
      joinDate: '2018'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Head of Pet Services',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
      bio: 'Passionate about creating exceptional pet care experiences and training programs.',
      department: 'Pet Services',
      joinDate: '2019'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format',
      bio: 'Ensuring seamless operations and exceptional customer experience across all touchpoints.',
      department: 'Operations',
      joinDate: '2020'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Head Groomer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
      bio: 'Certified master groomer with 8 years of experience in breed-specific grooming techniques.',
      department: 'Grooming',
      joinDate: '2021'
    },
    {
      id: 5,
      name: 'Emily Watson',
      role: 'Senior Dog Walker',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format',
      bio: 'Professional dog walker and trainer specializing in behavioral management and exercise routines.',
      department: 'Dog Walking',
      joinDate: '2019'
    },
    {
      id: 6,
      name: 'Raj Patel',
      role: 'Pet Care Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format',
      bio: 'Managing day-to-day pet care operations and ensuring highest standards of service delivery.',
      department: 'Pet Services',
      joinDate: '2020'
    }
  ];

  // Job Openings Data - Pet Care Focused
  const jobOpenings = [
    {
      id: 1,
      title: 'Professional Dog Walker',
      department: 'Dog Walking',
      type: 'Full-time/Part-time',
      location: 'Multiple Locations - Pune',
      experience: '1+ years',
      salary: '₹15,000 - ₹30,000',
      posted: '2 days ago',
      description: 'Join our team of professional dog walkers who provide safe, fun, and reliable walking services for pets across the city.',
      responsibilities: [
        'Provide daily walks for dogs of various breeds and sizes',
        'Follow specific care instructions from pet owners',
        'Maintain walking schedules and routes',
        'Monitor pet behavior and health during walks',
        'Provide basic training reinforcement during walks'
      ],
      requirements: [
        'Experience with dog handling and behavior',
        'Physical fitness for walking multiple dogs',
        'Reliable and punctual with strong time management',
        'Love for animals and patience',
        'Valid driver\'s license preferred'
      ],
      color: 'blue'
    },
    {
      id: 2,
      title: 'Pet Groomer',
      department: 'Grooming',
      type: 'Full-time',
      location: 'Pune Centers',
      experience: '2+ years',
      salary: '₹20,000 - ₹40,000',
      posted: '1 week ago',
      description: 'We\'re looking for skilled groomers to provide professional grooming services including bathing, haircuts, and styling.',
      responsibilities: [
        'Perform breed-specific grooming and styling',
        'Bathing, brushing, and coat maintenance',
        'Nail trimming and ear cleaning',
        'Sanitize and maintain grooming equipment',
        'Consult with pet owners on grooming needs'
      ],
      requirements: [
        'Certification in professional pet grooming',
        'Experience with various dog breeds and coat types',
        'Knowledge of grooming tools and techniques',
        'Gentle handling skills and patience',
        'Good communication with pet owners'
      ],
      color: 'purple'
    },
    {
      id: 3,
      title: 'Veterinary Assistant',
      department: 'Medical',
      type: 'Full-time',
      location: 'Pune Clinic',
      experience: '1+ years',
      salary: '₹18,000 - ₹25,000',
      posted: '3 days ago',
      description: 'Support our veterinary team in providing excellent medical care to pets in our modern clinic facility.',
      responsibilities: [
        'Assist veterinarians during examinations and procedures',
        'Manage patient records and appointments',
        'Maintain clinic cleanliness and organization',
        'Provide basic animal care and monitoring',
        'Handle laboratory samples and tests'
      ],
      requirements: [
        'Veterinary assistant certification or equivalent',
        '1+ years experience in veterinary practice',
        'Compassionate attitude towards animals',
        'Good communication skills',
        'Ability to handle emergency situations'
      ],
      color: 'green'
    },
    {
      id: 4,
      title: 'Pet Boarding Attendant',
      department: 'Pet Services',
      type: 'Full-time',
      location: 'Pune Boarding Facility',
      experience: '1+ years',
      salary: '₹15,000 - ₹22,000',
      posted: '5 days ago',
      description: 'Care for pets in our boarding facility, ensuring their comfort, safety, and well-being during their stay.',
      responsibilities: [
        'Monitor and care for boarded pets',
        'Administer medications as directed',
        'Maintain clean and sanitized facilities',
        'Exercise and play with pets',
        'Update owners on their pet\'s well-being'
      ],
      requirements: [
        'Experience in animal care or pet boarding',
        'Understanding of animal behavior',
        'Ability to work flexible hours including weekends',
        'Strong observation skills',
        'Physical ability to handle animals'
      ],
      color: 'orange'
    },
    {
      id: 5,
      title: 'Pet Trainer',
      department: 'Training',
      type: 'Full-time/Part-time',
      location: 'Pune Training Center',
      experience: '2+ years',
      salary: '₹25,000 - ₹45,000',
      posted: '1 week ago',
      description: 'Train pets and educate owners using positive reinforcement techniques and modern training methods.',
      responsibilities: [
        'Conduct individual and group training sessions',
        'Develop customized training plans',
        'Address behavioral issues',
        'Educate pet owners on training techniques',
        'Maintain training equipment and facilities'
      ],
      requirements: [
        'Certified professional dog trainer (CPDT) preferred',
        'Experience with various training methods',
        'Excellent communication and teaching skills',
        'Patience and understanding of animal behavior',
        'Ability to work with pets of all sizes and breeds'
      ],
      color: 'indigo'
    },
    {
      id: 6,
      title: 'Mobile Pet Care Specialist',
      department: 'Pet Services',
      type: 'Part-time',
      location: 'Pune - Various Areas',
      experience: '1+ years',
      salary: '₹200 - ₹400 per visit',
      posted: '2 days ago',
      description: 'Provide in-home pet care services including feeding, playtime, and basic care for pets while owners are away.',
      responsibilities: [
        'Visit client homes for pet care services',
        'Follow specific care instructions',
        'Provide companionship and exercise',
        'Administer medications if needed',
        'Update owners with photos and reports'
      ],
      requirements: [
        'Reliable transportation',
        'Smartphone for updates and scheduling',
        'Experience with pet care',
        'Excellent reliability and trustworthiness',
        'Flexible schedule availability'
      ],
      color: 'pink'
    }
  ];

  // Departments for filtering
  const departments = ['All', 'Dog Walking', 'Grooming', 'Medical', 'Pet Services', 'Training'];

  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredJobs = selectedDepartment === 'All' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  // Color mapping for consistent styling
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      hover: 'hover:bg-green-600'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-600'
    },
    orange: {
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      hover: 'hover:bg-orange-600'
    },
    indigo: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-600',
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      hover: 'hover:bg-indigo-600'
    },
    pink: {
      bg: 'bg-pink-500',
      text: 'text-pink-600',
      light: 'bg-pink-50',
      border: 'border-pink-200',
      hover: 'hover:bg-pink-600'
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setApplicationForm(prev => ({
      ...prev,
      position: job.title
    }));
    setShowApplicationForm(true);
  };

  const handleInputChange = (field, value) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setApplicationForm(prev => ({
        ...prev,
        resume: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Here you would typically send the application to your backend
    console.log('Application submitted:', applicationForm);
    alert(`Thank you for applying to ${applicationForm.position}! We will review your application and get back to you soon.`);
    setShowApplicationForm(false);
    setApplicationForm({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
      resume: null
    });
  };

  const getColorClass = (job) => colorClasses[job.color] || colorClasses.green;

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
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-500 transition-colors hidden sm:inline">Home</Link>
                <span className="text-gray-300 hidden sm:inline">/</span>
                <span className="text-green-500 font-semibold">Join Us</span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Join the PetCare Family</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90">
              Build Your Career in Pet Care
            </p>
            <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-80">
              We're looking for passionate animal lovers to join our team of professional 
              pet caregivers, groomers, walkers, and veterinary staff.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 sm:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Pets Served Daily</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">15+</div>
              <div className="text-xs sm:text-sm text-gray-600">Service Areas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">98%</div>
              <div className="text-xs sm:text-sm text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Work With PetCare?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just a company - we're a family of passionate animal lovers dedicated to providing the best care for pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Work with Animals</h3>
              <p className="text-gray-600">
                Spend your days doing what you love - caring for and interacting with amazing pets of all shapes and sizes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Growth</h3>
              <p className="text-gray-600">
                We invest in our team with continuous training, certifications, and opportunities for advancement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Make a Difference</h3>
              <p className="text-gray-600">
                Help pets live happier, healthier lives while providing peace of mind to their loving owners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs Navigation - Mobile Friendly */}
        <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <div className="flex space-x-1 min-w-max">
            <button
              onClick={() => setActiveTab('openings')}
              className={`px-4 py-3 font-medium text-sm sm:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'openings'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🐕 Job Openings
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-3 font-medium text-sm sm:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'team'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              👥 Our Team
            </button>
            <button
              onClick={() => setActiveTab('culture')}
              className={`px-4 py-3 font-medium text-sm sm:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'culture'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              💝 Our Culture
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-3 font-medium text-sm sm:text-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'process'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 Hiring Process
            </button>
          </div>
        </div>

        {/* Job Openings Tab */}
        {activeTab === 'openings' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Current Pet Care Openings</h2>
              <div className="flex space-x-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {filteredJobs.map(job => {
                const colorClass = getColorClass(job);
                return (
                  <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{job.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass.light} ${colorClass.text} border ${colorClass.border} w-fit`}>
                            {job.department}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-3 text-sm">
                          <span className="flex items-center text-gray-600">
                            📍 {job.location}
                          </span>
                          <span className="flex items-center text-gray-600">
                            ⏱️ {job.type}
                          </span>
                          <span className="flex items-center text-gray-600">
                            💰 {job.salary}
                          </span>
                          <span className="flex items-center text-gray-600">
                            📅 {job.posted}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">{job.description}</p>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                        <button
                          onClick={() => handleApplyClick(job)}
                          className={`${colorClass.bg} text-white px-4 sm:px-6 py-2 rounded-lg ${colorClass.hover} transition-colors font-medium text-sm sm:text-base`}
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                          className={`${colorClass.text} hover:${colorClass.text} font-medium text-sm`}
                        >
                          {selectedJob?.id === job.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>

                    {selectedJob?.id === job.id && (
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-start text-gray-600 text-sm sm:text-base">
                                  <span className={`${colorClass.text} mr-2 mt-1`}>•</span>
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start text-gray-600 text-sm sm:text-base">
                                  <span className={`${colorClass.text} mr-2 mt-1`}>•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex justify-end">
                          <button
                            onClick={() => handleApplyClick(job)}
                            className={`${colorClass.bg} text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg ${colorClass.hover} transition-colors font-bold text-sm sm:text-base`}
                          >
                            Apply for this Position
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No openings found</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                  There are no current openings in the {selectedDepartment} department.
                </p>
                <button
                  onClick={() => setSelectedDepartment('All')}
                  className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm sm:text-base"
                >
                  View All Openings
                </button>
              </div>
            )}
          </div>
        )}

        {/* Our Team Tab */}
        {activeTab === 'team' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Meet Our Pet Care Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-4 border-green-100"
                  />
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium text-sm sm:text-base mb-2">{member.role}</p>
                  <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{member.department}</span>
                    <span className="mx-2">•</span>
                    <span>Since {member.joinDate}</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Our Culture Tab */}
        {activeTab === 'culture' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Pet Care Culture & Values</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-green-500">❤️</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Animal Welfare First</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        The health, safety, and happiness of every pet in our care is our top priority.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-blue-500">🐕</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Professional Pet Care</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We maintain the highest standards of pet care through continuous training and best practices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-purple-500">🤝</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Trust & Reliability</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Pet owners trust us with their family members, and we honor that trust every day.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-orange-500">🌱</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Continuous Learning</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We invest in our team's growth with regular training in pet behavior, care, and safety.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-indigo-500">🏆</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Excellence in Service</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We strive to exceed expectations in every interaction with pets and their owners.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 text-pink-500">🎯</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Community Impact</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We're committed to improving pet welfare and education in our local communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-green-50 rounded-xl p-6 sm:p-8 border border-green-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">What We Offer Our Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-green-500">💰</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Competitive Pay</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Fair compensation with performance bonuses</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-blue-500">🏥</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Health Insurance</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Comprehensive health coverage for you</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-purple-500">🎓</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Pet Care Training</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Certification and skill development programs</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-orange-500">🐾</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Pet Benefits</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Free services for your own pets</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-indigo-500">📅</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Flexible Scheduling</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Work-life balance with flexible hours</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-3 text-pink-500">🌴</div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Paid Time Off</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Generous vacation and sick leave</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hiring Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Hiring Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Application Review</h3>
                    <p className="text-gray-600">
                      We carefully review every application to understand your experience and passion for pet care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Phone Screening</h3>
                    <p className="text-gray-600">
                      A quick call to discuss your background, experience with animals, and interest in the role.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">In-Person Interview</h3>
                    <p className="text-gray-600">
                      Meet with our team leads to discuss the role in detail and assess your pet care knowledge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Practical Assessment</h3>
                    <p className="text-gray-600">
                      For hands-on roles, we conduct practical assessments to evaluate your skills with animals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Offer & Onboarding</h3>
                    <p className="text-gray-600">
                      Successful candidates receive an offer and begin our comprehensive onboarding program.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Do I need formal qualifications to work as a dog walker?</h3>
                  <p className="text-gray-600 text-sm">
                    While formal qualifications aren't always required, experience with dogs and understanding of animal behavior is essential. We provide comprehensive training for all new team members.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">What are the working hours like?</h3>
                  <p className="text-gray-600 text-sm">
                    Hours vary by role. Dog walkers typically work during daytime hours, while boarding facility staff may work evenings and weekends. We offer flexible scheduling options for many positions.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Do you provide training?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes! We provide extensive training in pet first aid, animal behavior, and service standards. We also support ongoing professional development and certifications.
                  </p>
                </div>

                <div className="pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Are there opportunities for career advancement?</h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely. We promote from within and offer clear career paths from entry-level positions to team leadership and management roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Apply for {selectedJob?.title}
              </h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={applicationForm.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={applicationForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    value={applicationForm.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="e.g., 3 years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume (PDF) *
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please upload your resume in PDF format (max 5MB)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to work in pet care? *
                </label>
                <textarea
                  value={applicationForm.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="Tell us about your passion for animals and why you're interested in this position..."
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-green-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Work with Animals?</h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our team of dedicated pet care professionals and make a difference 
            in the lives of pets and their families every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setActiveTab('openings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-bold text-sm sm:text-base"
            >
              View Current Openings
            </button>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-bold text-sm sm:text-base"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}