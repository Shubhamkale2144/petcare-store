// data/medicines.js

// Base medicines data for listing pages
export const medicinesData = [
  {
    id: 1,
    name: 'Frontline Plus',
    brand: 'Merial',
    category: 'flea-tick',
    petType: 'dog',
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1596484552997-95c6a90e42b1?w=400&h=400&fit=crop&auto=format',
    description: 'Advanced flea and tick treatment for dogs',
    dosage: 'Monthly application',
    weight: '10-20 kg',
    quantity: '3 pipettes',
    inStock: true,
    rating: 4.5,
    reviews: 128,
    badge: 'Bestseller',
    link: '/medicines/1'
  },
  {
    id: 2,
    name: 'Revolution',
    brand: 'Zoetis',
    category: 'heartworm',
    petType: 'cat',
    price: 1200,
    originalPrice: 1400,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop&auto=format',
    description: 'Heartworm prevention and flea control for cats',
    dosage: 'Monthly application',
    weight: '2.5-5 kg',
    quantity: '6 pipettes',
    inStock: true,
    rating: 4.7,
    reviews: 95,
    badge: 'Top Rated',
    link: '/medicines/2'
  },
  {
    id: 3,
    name: 'Bravecto',
    brand: 'MSD',
    category: 'flea-tick',
    petType: 'dog',
    price: 1500,
    originalPrice: 1700,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&auto=format',
    description: '3-month flea and tick protection chewable',
    dosage: 'Every 3 months',
    weight: '10-20 kg',
    quantity: '1 chewable tablet',
    inStock: true,
    rating: 4.6,
    reviews: 204,
    badge: 'Long Lasting',
    link: '/medicines/3'
  },
  {
    id: 4,
    name: 'Drontal Plus',
    brand: 'Bayer',
    category: 'dewormer',
    petType: 'dog',
    price: 450,
    originalPrice: 550,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1576201839700-8ed16b5dcb49?w=400&h=400&fit=crop&auto=format',
    description: 'Broad-spectrum dewormer for dogs',
    dosage: 'As directed by vet',
    weight: '10-35 kg',
    quantity: '2 tablets',
    inStock: true,
    rating: 4.4,
    reviews: 87,
    badge: 'Effective',
    link: '/medicines/4'
  },
  {
    id: 5,
    name: 'Milpro',
    brand: 'Elanco',
    category: 'dewormer',
    petType: 'cat',
    price: 600,
    originalPrice: 750,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop&auto=format',
    description: 'All-in-one worm protection for cats',
    dosage: 'Monthly',
    weight: '2-8 kg',
    quantity: '2 tablets',
    inStock: true,
    rating: 4.3,
    reviews: 64,
    badge: 'Complete Care',
    link: '/medicines/5'
  },
  {
    id: 6,
    name: 'Apoquel',
    brand: 'Zoetis',
    category: 'skin-allergy',
    petType: 'dog',
    price: 1800,
    originalPrice: 2000,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1558788353-f76ad9cf42fc?w=400&h=400&fit=crop&auto=format',
    description: 'Fast-acting itch relief for dogs',
    dosage: 'Twice daily',
    weight: 'All weights',
    quantity: '30 tablets',
    inStock: false,
    rating: 4.8,
    reviews: 156,
    badge: 'Fast Relief',
    link: '/medicines/6'
  },
  {
    id: 7,
    name: 'Simparica',
    brand: 'Zoetis',
    category: 'flea-tick',
    petType: 'dog',
    price: 1100,
    originalPrice: 1300,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&auto=format',
    description: 'Monthly chewable for flea and tick control',
    dosage: 'Monthly',
    weight: '5-10 kg',
    quantity: '3 chewables',
    inStock: true,
    rating: 4.5,
    reviews: 189,
    badge: 'Chewable',
    link: '/medicines/7'
  },
  {
    id: 8,
    name: 'Heartgard Plus',
    brand: 'Boehringer',
    category: 'heartworm',
    petType: 'dog',
    price: 950,
    originalPrice: 1100,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&auto=format',
    description: 'Heartworm prevention chewable for dogs',
    dosage: 'Monthly',
    weight: '11-22 kg',
    quantity: '6 chewables',
    inStock: true,
    rating: 4.7,
    reviews: 223,
    badge: 'Heart Care',
    link: '/medicines/8'
  },
  {
    id: 9,
    name: 'Advantage Multi',
    brand: 'Bayer',
    category: 'multi-purpose',
    petType: 'cat',
    price: 1400,
    originalPrice: 1600,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&auto=format',
    description: 'Multi-purpose protection for cats',
    dosage: 'Monthly',
    weight: '2-5 kg',
    quantity: '6 pipettes',
    inStock: true,
    rating: 4.4,
    reviews: 78,
    badge: 'Multi-Protection',
    link: '/medicines/9'
  },
  {
    id: 10,
    name: 'Cosequin',
    brand: 'Nutramax',
    category: 'joint-health',
    petType: 'dog',
    price: 2200,
    originalPrice: 2500,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&auto=format',
    description: 'Joint health supplement for dogs',
    dosage: 'Daily',
    weight: 'All weights',
    quantity: '132 tablets',
    inStock: true,
    rating: 4.6,
    reviews: 312,
    badge: 'Joint Care',
    link: '/medicines/10'
  }
];

// Extended detailed data for individual product pages
export const medicineProducts = [
  {
    id: 1,
    name: 'Frontline Plus',
    brand: 'Merial',
    category: 'flea-tick',
    petType: 'dog',
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1596484552997-95c6a90e42b1?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1596484552997-95c6a90e42b1?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558788353-f76ad9cf42fc?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=400&fit=crop&auto=format'
    ],
    description: 'Advanced flea and tick treatment for dogs that kills fleas, flea eggs, lice, and ticks',
    detailedDescription: 'Frontline Plus is a veterinarian-recommended flea and tick treatment for dogs. It kills fleas, flea eggs, lice, and ticks, including those that may transmit Lyme disease. This waterproof, fast-acting formula starts working within 24 hours and provides full-month protection.',
    dosage: 'Apply one pipette monthly to the skin between the shoulder blades',
    weight: '10-20 kg',
    quantity: '3 pipettes',
    inStock: true,
    stockCount: 45,
    rating: 4.5,
    reviews: 128,
    badge: 'Bestseller',
    benefits: [
      'Kills fleas within 12 hours',
      'Eliminates flea eggs and larvae',
      'Waterproof formula remains effective after bathing',
      'Veterinarian recommended and trusted',
      'Provides 30-day protection'
    ],
    ingredients: [
      'Fipronil 9.8%',
      '(S)-Methoprene 8.8%',
      'Inert Ingredients: 81.4%'
    ],
    warnings: [
      'For external use only on dogs',
      'Do not use on sick or recovering animals',
      'Keep out of reach of children',
      'Avoid contact with eyes',
      'Consult your veterinarian before use'
    ],
    usageInstructions: [
      'Part the fur between shoulder blades until skin is visible',
      'Place tip of applicator on skin and squeeze to apply entire contents',
      'Apply directly to skin, not to fur',
      'Do not bathe your dog for 48 hours after application'
    ],
    storage: 'Store at room temperature away from direct sunlight',
    shelfLife: '24 months from manufacturing date',
    suitableFor: 'Dogs and puppies 8 weeks and older'
  },
  {
    id: 2,
    name: 'Revolution',
    brand: 'Zoetis',
    category: 'heartworm',
    petType: 'cat',
    price: 1200,
    originalPrice: 1400,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=400&fit=crop&auto=format'
    ],
    description: 'Heartworm prevention and flea control for cats',
    detailedDescription: 'Revolution is a comprehensive monthly topical solution that protects cats from heartworms, fleas, ear mites, roundworms, and hookworms. This all-in-one solution is easy to apply and provides broad-spectrum protection.',
    dosage: 'Apply one pipette monthly to the skin at the base of the neck',
    weight: '2.5-5 kg',
    quantity: '6 pipettes',
    inStock: true,
    stockCount: 32,
    rating: 4.7,
    reviews: 95,
    badge: 'Top Rated',
    benefits: [
      'Prevents heartworm disease',
      'Kills adult fleas and prevents flea eggs',
      'Treats and controls ear mites',
      'Controls roundworm and hookworm',
      'Waterproof after 2 hours'
    ],
    ingredients: [
      'Selamectin: 6.0% w/w',
      'Inert Ingredients: 94.0% w/w'
    ],
    warnings: [
      'For cats 8 weeks and older',
      'Do not use on sick, underweight cats',
      'Keep away from eyes and mouth',
      'Consult veterinarian for pregnant or lactating cats'
    ],
    usageInstructions: [
      'Apply to skin at the base of the neck in front of shoulder blades',
      'Part the hair until skin is visible',
      'Place tip on skin and squeeze tube to empty contents',
      'Do not massage into skin'
    ],
    storage: 'Store below 30°C in original packaging',
    shelfLife: '36 months',
    suitableFor: 'Cats and kittens 8 weeks and older'
  },
  {
    id: 3,
    name: 'Bravecto',
    brand: 'MSD',
    category: 'flea-tick',
    petType: 'dog',
    price: 1500,
    originalPrice: 1700,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop&auto=format'
    ],
    description: '3-month flea and tick protection chewable',
    detailedDescription: 'Bravecto is a tasty chewable tablet that provides up to 12 weeks of protection against fleas and ticks. It starts killing fleas within 2 hours and ticks within 12 hours. The long-lasting formula reduces the frequency of treatment.',
    dosage: 'One chewable every 12 weeks',
    weight: '10-20 kg',
    quantity: '1 chewable tablet',
    inStock: true,
    stockCount: 28,
    rating: 4.6,
    reviews: 204,
    badge: 'Long Lasting',
    benefits: [
      '12 weeks of flea and tick protection',
      'Fast-acting - starts working in 2 hours',
      'Tasty chewable tablet',
      'Kills multiple tick species',
      'Reduces treatment frequency'
    ],
    ingredients: [
      'Fluralaner: 250 mg',
      'Excipients: Corn starch, cellulose, artificial chicken flavor'
    ],
    warnings: [
      'For dogs 6 months and older',
      'Do not use in dogs with history of seizures',
      'Consult veterinarian before use',
      'Ensure dog consumes complete dose'
    ],
    usageInstructions: [
      'Administer orally with or without food',
      'Ensure the dog consumes the entire chewable',
      'Dose according to body weight',
      'Repeat every 12 weeks for continuous protection'
    ],
    storage: 'Store below 30°C in dry place',
    shelfLife: '24 months',
    suitableFor: 'Dogs 6 months and older, weighing 10-20 kg'
  },
  {
    id: 4,
    name: 'Drontal Plus',
    brand: 'Bayer',
    category: 'dewormer',
    petType: 'dog',
    price: 450,
    originalPrice: 550,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1576201839700-8ed16b5dcb49?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1576201839700-8ed16b5dcb49?w=600&h=400&fit=crop&auto=format'
    ],
    description: 'Broad-spectrum dewormer for dogs',
    detailedDescription: 'Drontal Plus is a broad-spectrum dewormer that effectively treats and controls the most common intestinal worms in dogs including roundworms, hookworms, whipworms, and tapeworms.',
    dosage: 'As directed by veterinarian based on weight',
    weight: '10-35 kg',
    quantity: '2 tablets',
    inStock: true,
    stockCount: 60,
    rating: 4.4,
    reviews: 87,
    badge: 'Effective',
    benefits: [
      'Broad-spectrum worm protection',
      'Treats multiple worm types',
      'Easy to administer tablets',
      'Veterinarian recommended',
      'Single dose treatment'
    ],
    ingredients: [
      'Praziquantel: 50 mg',
      'Pyrantel Embonate: 144 mg',
      'Febantel: 150 mg'
    ],
    warnings: [
      'For dogs only',
      'Do not use in puppies under 2 weeks',
      'Consult veterinarian for pregnant dogs',
      'Weigh dog before dosing'
    ],
    usageInstructions: [
      'Administer appropriate number of tablets based on weight',
      'Can be given with or without food',
      'Tablets can be hidden in food if needed',
      'Repeat treatment as recommended by veterinarian'
    ],
    storage: 'Store in cool, dry place',
    shelfLife: '36 months',
    suitableFor: 'Dogs and puppies from 2 weeks of age'
  },
  {
    id: 5,
    name: 'Milpro',
    brand: 'Elanco',
    category: 'dewormer',
    petType: 'cat',
    price: 600,
    originalPrice: 750,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=400&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&auto=format'
    ],
    description: 'All-in-one worm protection for cats',
    detailedDescription: 'Milpro is a comprehensive dewormer that protects cats from multiple intestinal parasites including roundworms, hookworms, and tapeworms. The small tablets are easy to administer and provide reliable protection.',
    dosage: 'Monthly administration',
    weight: '2-8 kg',
    quantity: '2 tablets',
    inStock: true,
    stockCount: 45,
    rating: 4.3,
    reviews: 64,
    badge: 'Complete Care',
    benefits: [
      'Protects against multiple worm types',
      'Small, easy-to-swallow tablets',
      'Monthly protection',
      'Suitable for kittens',
      'Veterinarian formulated'
    ],
    ingredients: [
      'Milbemycin Oxime: 4 mg',
      'Praziquantel: 10 mg'
    ],
    warnings: [
      'For cats and kittens from 6 weeks',
      'Do not use in heartworm positive cats',
      'Consult veterinarian before use',
      'Keep away from children'
    ],
    usageInstructions: [
      'Administer one tablet monthly',
      'Can be given with or without food',
      'Tablets can be crushed and mixed with food',
      'Dose according to body weight'
    ],
    storage: 'Store below 25°C in dry place',
    shelfLife: '24 months',
    suitableFor: 'Cats and kittens from 6 weeks of age'
  }
];

// Helper function to get product by ID
export const getMedicineProductById = (id) => {
  return medicineProducts.find(product => product.id === parseInt(id));
};

// Helper function to get medicines by category
export const getMedicinesByCategory = (category) => {
  return medicinesData.filter(product => product.category === category);
};

// Helper function to get medicines by pet type
export const getMedicinesByPetType = (petType) => {
  return medicinesData.filter(product => product.petType === petType);
};

// Helper function to get medicines by brand
export const getMedicinesByBrand = (brand) => {
  return medicinesData.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
};