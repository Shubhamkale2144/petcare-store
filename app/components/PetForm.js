'use client';

import { useState } from 'react';

export default function PetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    // Basic Information
    petType: '',
    breed: '',
    name: '',
    age: '',
    gender: '',
    color: '',
    
    // Health Information
    vaccinationStatus: '',
    lastVetVisit: '',
    medicalConditions: '',
    specialNeeds: '',
    
    // Behavior & Training
    temperament: '',
    trainingLevel: '',
    goodWith: [],
    
    // Sale Information
    price: '',
    reasonForSelling: '',
    ownershipDuration: '',
    
    // Documentation
    vaccinationRecords: [],
    medicalRecords: [],
    photos: []
  });

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];
  const dogBreeds = ['Labrador', 'German Shepherd', 'Golden Retriever', 'Pug', 'Beagle', 'Other'];
  const catBreeds = ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Street Cat', 'Other'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentValues = formData[name] || [];
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...currentValues, value]
        });
      } else {
        setFormData({
          ...formData,
          [name]: currentValues.filter(item => item !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">Pet Information Form</h2>
        <p className="opacity-90">Please provide accurate information about your pet</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type *</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Pet Type</option>
                {petTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed *</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Breed</option>
                {formData.petType === 'Dog' && dogBreeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
                {formData.petType === 'Cat' && catBreeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pet's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 2 years, 6 months"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color/Markings</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe color and markings"
              />
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Health Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vaccination Status *</label>
              <select
                name="vaccinationStatus"
                value={formData.vaccinationStatus}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Up to date">Up to date</option>
                <option value="Partially vaccinated">Partially vaccinated</option>
                <option value="Not vaccinated">Not vaccinated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Vet Visit</label>
              <input
                type="date"
                name="lastVetVisit"
                value={formData.lastVetVisit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe any medical conditions or allergies"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs</label>
              <textarea
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special care requirements"
              />
            </div>
          </div>
        </div>

        {/* Sale Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Sale Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asking Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter asking price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership Duration</label>
              <input
                type="text"
                name="ownershipDuration"
                value={formData.ownershipDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="How long have you owned this pet?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Selling *</label>
              <textarea
                name="reasonForSelling"
                value={formData.reasonForSelling}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please explain why you're selling your pet"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">Ready to List Your Pet?</h4>
              <p className="text-sm text-gray-600">By submitting, you agree to our terms and conditions</p>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              Submit Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}