// data/pets.js

// Base pets data for listing pages
export const petsData = [
  {
    id: 1,
    name: 'Max',
    breed: 'Golden Retriever',
    type: 'dog',
    age: 2,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&auto=format',
    badge: 'Friendly',
    description: 'Loves playing fetch and cuddles',
    gender: 'male',
    location: 'Pune',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/1'
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Persian Cat',
    type: 'cat',
    age: 1,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&auto=format',
    badge: 'Calm',
    description: 'Gentle and loves quiet spaces',
    gender: 'female',
    location: 'Mumbai',
    vaccination: 'Fully Vaccinated',
    health: 'Good',
    link: '/pets/2'
  },
  {
    id: 3,
    name: 'Buddy',
    breed: 'Labrador',
    type: 'dog',
    age: 3,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop&auto=format',
    badge: 'Active',
    description: 'Perfect for outdoor activities',
    gender: 'male',
    location: 'Pune',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/3'
  },
  {
    id: 4,
    name: 'Bella',
    breed: 'Siamese Cat',
    type: 'cat',
    age: 2,
    price: 7500,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop&auto=format',
    badge: 'Playful',
    description: 'Vocal and loves attention',
    gender: 'female',
    location: 'Delhi',
    vaccination: 'Partially Vaccinated',
    health: 'Good',
    link: '/pets/4'
  },
  {
    id: 5,
    name: 'Charlie',
    breed: 'Parrot',
    type: 'bird',
    age: 1,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&h=300&fit=crop&auto=format',
    badge: 'Talkative',
    description: 'Colorful and can mimic speech',
    gender: 'male',
    location: 'Bangalore',
    vaccination: 'Not Required',
    health: 'Excellent',
    link: '/pets/5'
  },
  {
    id: 6,
    name: 'Snowball',
    breed: 'Rabbit',
    type: 'rabbit',
    age: 1,
    price: 3000,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop&auto=format',
    badge: 'Gentle',
    description: 'Soft and quiet companion',
    gender: 'female',
    location: 'Pune',
    vaccination: 'Not Required',
    health: 'Good',
    link: '/pets/6'
  },
  {
    id: 7,
    name: 'Rocky',
    breed: 'German Shepherd',
    type: 'dog',
    age: 2,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=400&h=300&fit=crop&auto=format',
    badge: 'Loyal',
    description: 'Protective and intelligent',
    gender: 'male',
    location: 'Mumbai',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/7'
  },
  {
    id: 8,
    name: 'Milo',
    breed: 'Beagle',
    type: 'dog',
    age: 1,
    price: 10000,
    image: 'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=400&h=300&fit=crop&auto=format',
    badge: 'Curious',
    description: 'Friendly and great with kids',
    gender: 'male',
    location: 'Delhi',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/8'
  },
  {
    id: 9,
    name: 'Whiskers',
    breed: 'Maine Coon',
    type: 'cat',
    age: 2,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop&auto=format',
    badge: 'Majestic',
    description: 'Large and fluffy companion',
    gender: 'male',
    location: 'Bangalore',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/9'
  },
  {
    id: 10,
    name: 'Simba',
    breed: 'Bengal Cat',
    type: 'cat',
    age: 1,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop&auto=format',
    badge: 'Energetic',
    description: 'Playful with beautiful patterns',
    gender: 'male',
    location: 'Mumbai',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    link: '/pets/10'
  }
];

// Extended detailed data for individual pet pages
export const petProducts = [
  {
    id: 1,
    name: 'Max',
    breed: 'Golden Retriever',
    type: 'dog',
    age: 2,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=600&h=400&fit=crop&auto=format'
    ],
    badge: 'Friendly',
    description: 'Loves playing fetch and cuddles',
    detailedDescription: 'Max is a beautiful Golden Retriever with a heart full of love. He enjoys playing fetch in the park, going for long walks, and cuddling on the couch. Max is house-trained, knows basic commands, and gets along well with children and other pets.',
    gender: 'male',
    location: 'Pune',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    temperament: ['Friendly', 'Playful', 'Intelligent', 'Loyal', 'Gentle'],
    features: ['Good with kids', 'House trained', 'Loves outdoor activities', 'Knows basic commands', 'Good with other pets'],
    careInstructions: 'Requires regular exercise, grooming twice a week, and a balanced diet. Loves interactive toys and mental stimulation.',
    adoptionProcess: 'Home visit required, meet-and-greet session, and adoption agreement.',
    available: true
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Persian Cat',
    type: 'cat',
    age: 1,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop&auto=format'
    ],
    badge: 'Calm',
    description: 'Gentle and loves quiet spaces',
    detailedDescription: 'Luna is a graceful Persian cat with stunning blue eyes and a calm demeanor. She prefers quiet environments and enjoys lounging in sunny spots. Luna is litter-trained and has a gentle nature that makes her perfect for apartment living.',
    gender: 'female',
    location: 'Mumbai',
    vaccination: 'Fully Vaccinated',
    health: 'Good',
    temperament: ['Calm', 'Gentle', 'Quiet', 'Affectionate', 'Independent'],
    features: ['Good with other pets', 'Litter trained', 'Low maintenance', 'Indoor cat', 'Regular grooming needed'],
    careInstructions: 'Daily grooming required for her long fur, regular vet checkups, and a quiet home environment preferred.',
    adoptionProcess: 'Virtual home tour, reference check, and adoption fee.',
    available: true
  },
  {
    id: 3,
    name: 'Buddy',
    breed: 'Labrador',
    type: 'dog',
    age: 3,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=600&h=400&fit=crop&auto=format'
    ],
    badge: 'Active',
    description: 'Perfect for outdoor activities',
    detailedDescription: 'Buddy is an energetic Labrador who loves adventure and outdoor activities. He is excellent at swimming, fetching, and going on hikes. Buddy is very social and would thrive in an active family that enjoys spending time outdoors.',
    gender: 'male',
    location: 'Pune',
    vaccination: 'Fully Vaccinated',
    health: 'Excellent',
    temperament: ['Active', 'Energetic', 'Friendly', 'Social', 'Intelligent'],
    features: ['Good with kids', 'House trained', 'Loves swimming', 'Knows advanced commands', 'Great hiking companion'],
    careInstructions: 'Needs daily exercise, regular brushing, and mental stimulation. Perfect for active families.',
    adoptionProcess: 'Family meet-up, activity compatibility assessment, and adoption agreement.',
    available: true
  },
  {
    id: 4,
    name: 'Bella',
    breed: 'Siamese Cat',
    type: 'cat',
    age: 2,
    price: 7500,
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&auto=format'
    ],
    badge: 'Playful',
    description: 'Vocal and loves attention',
    detailedDescription: 'Bella is a beautiful Siamese cat known for her striking blue eyes and vocal personality. She loves interactive play and will happily engage in conversation with her human companions. Bella is very affectionate and forms strong bonds with her family.',
    gender: 'female',
    location: 'Delhi',
    vaccination: 'Partially Vaccinated',
    health: 'Good',
    temperament: ['Playful', 'Vocal', 'Affectionate', 'Intelligent', 'Social'],
    features: ['Good with families', 'Litter trained', 'Loves toys', 'Vocal companion', 'Indoor cat'],
    careInstructions: 'Regular playtime needed, enjoys puzzle toys, and prefers consistent routines.',
    adoptionProcess: 'Home environment assessment, family interview, and vaccination completion required.',
    available: true
  },
  {
    id: 5,
    name: 'Charlie',
    breed: 'Parrot',
    type: 'bird',
    age: 1,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1518933165971-611dbc9c412d?w=600&h=400&fit=crop&auto=format'
    ],
    badge: 'Talkative',
    description: 'Colorful and can mimic speech',
    detailedDescription: 'Charlie is a vibrant and intelligent parrot with amazing mimicking abilities. He can learn words and phrases quickly and enjoys interactive play. Charlie is hand-tamed and loves being part of family activities.',
    gender: 'male',
    location: 'Bangalore',
    vaccination: 'Not Required',
    health: 'Excellent',
    temperament: ['Talkative', 'Intelligent', 'Social', 'Playful', 'Curious'],
    features: ['Can mimic speech', 'Colorful plumage', 'Cage trained', 'Hand-tamed', 'Loves fruits'],
    careInstructions: 'Large cage required, daily interaction needed, varied diet with fruits and vegetables.',
    adoptionProcess: 'Cage setup verification, experience with birds preferred, adoption counseling.',
    available: true
  }
];

// Helper function to get pet by ID
export const getPetProductById = (id) => {
  return petProducts.find(pet => pet.id === parseInt(id));
};

// Helper function to get pets by type
export const getPetsByType = (type) => {
  return petsData.filter(pet => pet.type === type);
};

// Helper function to get pets by location
export const getPetsByLocation = (location) => {
  return petsData.filter(pet => pet.location.toLowerCase() === location.toLowerCase());
};

// Helper function to get unique breeds
export const getUniqueBreeds = (type = 'all') => {
  if (type === 'all') {
    return [...new Set(petsData.map(pet => pet.breed))];
  }
  return [...new Set(petsData.filter(pet => pet.type === type).map(pet => pet.breed))];
};

// Helper function to get unique locations
export const getUniqueLocations = () => {
  return [...new Set(petsData.map(pet => pet.location))];
};