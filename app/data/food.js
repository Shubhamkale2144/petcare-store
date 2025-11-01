// data/food.js

// Base foods data for listing pages
export const foodsData = [
  {
    id: 1,
    name: 'Premium Dry Dog Food',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&auto=format',
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'adult',
    rating: 4.8,
    reviews: 342,
    badge: 'Bestseller',
    description: 'Complete and balanced nutrition for adult dogs with real chicken as primary ingredient',
    inStock: true,
    stockCount: 45,
    features: ['Real Chicken', 'Grain-Free', 'Omega-3 & 6', 'No Artificial Colors'],
    flavor: 'Chicken',
    weight: '10kg',
    ingredients: ['Chicken', 'Brown Rice', 'Vegetables', 'Vitamins'],
    nutritionalInfo: {
      protein: '26%',
      fat: '15%',
      fiber: '4%',
      moisture: '10%'
    },
    link: '/food/1'
  },
  {
    id: 2,
    name: 'Grain-Free Cat Food',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: 'https://media.istockphoto.com/id/1453753583/photo/a-bowl-of-dog-food-on-a-wooden-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=-oVN8yI2GuHyiO0dyLWiHjufm2hnE-50uQFtFL7hKc0=',
    category: 'dry-food',
    petType: 'cat',
    lifeStage: 'adult',
    rating: 4.7,
    reviews: 278,
    badge: 'Grain-Free',
    description: 'High-protein grain-free formula for indoor cats with salmon and sweet potato',
    inStock: true,
    stockCount: 32,
    features: ['Grain-Free', 'High Protein', 'Salmon Recipe', 'Urinary Health'],
    flavor: 'Salmon',
    weight: '7kg',
    ingredients: ['Salmon', 'Sweet Potato', 'Peas', 'Chicken Fat'],
    nutritionalInfo: {
      protein: '32%',
      fat: '16%',
      fiber: '3%',
      moisture: '10%'
    },
    link: '/food/2'
  },
  {
    id: 3,
    name: 'Puppy Growth Formula',
    price: 1999,
    originalPrice: 2699,
    discount: 26,
    image: 'https://media.istockphoto.com/id/510267099/photo/puppy-eating-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=nkpGGrL95Sp8sOOkI9IDxFZv7QWqdQb6sNgn0o9vsWQ=',
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'puppy',
    rating: 4.9,
    reviews: 189,
    badge: 'Growth',
    description: 'Specially formulated for puppies with DHA for brain development',
    inStock: true,
    stockCount: 28,
    features: ['DHA for Brain', 'Immune Support', 'Bone Development', 'Easy Digestion'],
    flavor: 'Lamb & Rice',
    weight: '8kg',
    ingredients: ['Lamb', 'Rice', 'Fish Oil', 'Egg Product'],
    nutritionalInfo: {
      protein: '28%',
      fat: '18%',
      fiber: '3%',
      moisture: '10%'
    },
    link: '/food/3'
  },
  {
    id: 4,
    name: 'Wet Cat Food Pack',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    image: 'https://media.istockphoto.com/id/1280943005/photo/a-redhead-cat-eats-treat-from-a-package-in-the-hand-of-a-caucasian-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=nOtRotNZjkQp28rTZnP0lBhMXr-wWIZVFDs1Vq_BoXo=',
    category: 'wet-food',
    petType: 'cat',
    lifeStage: 'adult',
    rating: 4.6,
    reviews: 156,
    badge: 'Wet Food',
    description: 'Delicious wet food with tuna and chicken in gravy, 24-pack variety',
    inStock: true,
    stockCount: 60,
    features: ['High Moisture', 'Tuna & Chicken', 'Gravy Formula', 'Complete Meal'],
    flavor: 'Tuna & Chicken',
    weight: '85g x 24',
    ingredients: ['Tuna', 'Chicken', 'Water', 'Vitamins'],
    nutritionalInfo: {
      protein: '12%',
      fat: '5%',
      fiber: '1%',
      moisture: '78%'
    },
    link: '/food/4'
  },
  {
    id: 5,
    name: 'Senior Dog Food',
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&auto=format',
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'senior',
    rating: 4.5,
    reviews: 134,
    badge: 'Senior Care',
    description: 'Special formula for senior dogs with joint support and easy digestion',
    inStock: true,
    stockCount: 22,
    features: ['Joint Support', 'Easy Digestion', 'Weight Management', 'Dental Health'],
    flavor: 'Chicken & Brown Rice',
    weight: '12kg',
    ingredients: ['Chicken', 'Brown Rice', 'Glucosamine', 'Chondroitin'],
    nutritionalInfo: {
      protein: '24%',
      fat: '12%',
      fiber: '5%',
      moisture: '10%'
    },
    link: '/food/5'
  },
  {
    id: 6,
    name: 'Organic Dog Treats',
    price: 599,
    originalPrice: 899,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1709810024789-4519a14f05ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8T3JnYW5pYyUyMERvZyUyMFRyZWF0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    category: 'treats',
    petType: 'dog',
    lifeStage: 'all',
    rating: 4.8,
    reviews: 267,
    badge: 'Organic',
    description: '100% organic training treats with sweet potato and chicken',
    inStock: true,
    stockCount: 85,
    features: ['100% Organic', 'Grain-Free', 'Training Size', 'Natural Ingredients'],
    flavor: 'Sweet Potato & Chicken',
    weight: '500g',
    ingredients: ['Organic Sweet Potato', 'Organic Chicken', 'Organic Flaxseed'],
    nutritionalInfo: {
      protein: '18%',
      fat: '8%',
      fiber: '6%',
      moisture: '12%'
    },
    link: '/food/6'
  },
  {
    id: 7,
    name: 'Kitten Milk Replacer',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: 'https://plus.unsplash.com/premium_photo-1681882984485-97dba2458845?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8S2l0dGVuJTIwTWlsayUyMFJlcGxhY2VyJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    category: 'milk-replacer',
    petType: 'cat',
    lifeStage: 'kitten',
    rating: 4.7,
    reviews: 89,
    badge: 'Kitten Care',
    description: 'Complete milk replacer for orphaned kittens or supplemental feeding',
    inStock: true,
    stockCount: 35,
    features: ['Complete Nutrition', 'Easy to Mix', 'Vitamins Added', 'Digestive Health'],
    flavor: 'Milk',
    weight: '400g',
    ingredients: ['Milk Proteins', 'Vegetable Oils', 'Vitamins', 'Minerals'],
    nutritionalInfo: {
      protein: '36%',
      fat: '40%',
      fiber: '0%',
      moisture: '5%'
    },
    link: '/food/7'
  },
  {
    id: 8,
    name: 'Dental Care Dog Food',
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop&auto=format',
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'adult',
    rating: 4.4,
    reviews: 178,
    badge: 'Dental Care',
    description: 'Special kibble design to reduce tartar and maintain dental health',
    inStock: true,
    stockCount: 25,
    features: ['Tartar Control', 'Fresh Breath', 'Special Kibble', 'Complete Nutrition'],
    flavor: 'Beef & Vegetable',
    weight: '15kg',
    ingredients: ['Beef', 'Corn', 'Wheat', 'Minerals'],
    nutritionalInfo: {
      protein: '25%',
      fat: '14%',
      fiber: '4%',
      moisture: '10%'
    },
    link: '/food/8'
  },
  {
    id: 9,
    name: 'Weight Management Cat Food',
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    image: 'https://images.unsplash.com/photo-1558993457-4bc6ec2c3734?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdlaWdodCUyME1hbmFnZW1lbnQlMjBDYXQlMjBGb29kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
    category: 'dry-food',
    petType: 'cat',
    lifeStage: 'adult',
    rating: 4.6,
    reviews: 145,
    badge: 'Weight Care',
    description: 'Low-calorie formula for weight management in adult cats',
    inStock: true,
    stockCount: 30,
    features: ['Low Calorie', 'High Fiber', 'Weight Control', 'Satiety Support'],
    flavor: 'Chicken & Rice',
    weight: '5kg',
    ingredients: ['Chicken', 'Rice', 'Cellulose', 'L-Carnitine'],
    nutritionalInfo: {
      protein: '30%',
      fat: '10%',
      fiber: '8%',
      moisture: '10%'
    },
    link: '/food/9'
  },
  {
    id: 10,
    name: 'Hypoallergenic Dog Food',
    price: 3299,
    originalPrice: 4299,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1558993457-4bc6ec2c3734?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdlaWdodCUyME1hbmFnZW1lbnQlMjBDYXQlMjBGb29kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'all',
    rating: 4.8,
    reviews: 92,
    badge: 'Hypoallergenic',
    description: 'Limited ingredient diet for dogs with food sensitivities',
    inStock: true,
    stockCount: 18,
    features: ['Limited Ingredients', 'No Common Allergens', 'Sensitive Stomach', 'Skin Health'],
    flavor: 'Salmon & Potato',
    weight: '10kg',
    ingredients: ['Salmon', 'Potato', 'Sunflower Oil', 'Vitamins'],
    nutritionalInfo: {
      protein: '22%',
      fat: '12%',
      fiber: '3%',
      moisture: '10%'
    },
    link: '/food/10'
  }
];

// Extended detailed data for individual product pages
export const foodProducts = [
  {
    id: 1,
    name: 'Premium Dry Dog Food',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop&auto=format',
    additionalImages: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1576201839700-8ed16b5dcb49?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop&auto=format'
    ],
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'adult',
    sizes: ['5kg', '10kg', '15kg'],
    rating: 4.8,
    reviews: 342,
    badge: 'Bestseller',
    description: 'Complete and balanced nutrition for adult dogs with real chicken as primary ingredient',
    longDescription: 'This premium dry dog food is formulated with real chicken as the first ingredient, providing high-quality protein for strong muscles. It contains essential nutrients, vitamins, and minerals to support overall health, including omega-3 and omega-6 fatty acids for healthy skin and coat. The grain-free formula is easy to digest and perfect for dogs with sensitive stomachs.',
    inStock: true,
    stockCount: 45,
    features: ['Real Chicken', 'Grain-Free', 'Omega-3 & 6', 'No Artificial Colors', 'Complete Nutrition', 'Easy Digestion'],
    flavor: 'Chicken',
    weight: '10kg',
    brand: 'PremiumPet Nutrition',
    ingredients: ['Chicken', 'Brown Rice', 'Peas', 'Chicken Fat', 'Flaxseed', 'Vitamins', 'Minerals'],
    nutritionalInfo: {
      protein: '26%',
      fat: '15%',
      fiber: '4%',
      moisture: '10%',
      calcium: '1.2%',
      phosphorus: '1.0%',
      omega3: '0.5%',
      omega6: '2.5%'
    },
    feedingGuide: {
      '5-10kg': '1-1.5 cups per day',
      '10-25kg': '1.5-3 cups per day',
      '25-40kg': '3-4.5 cups per day',
      '40kg+': '4.5-6 cups per day'
    },
    storageInstructions: 'Store in a cool, dry place away from direct sunlight. Keep bag sealed after opening. Use within 6 weeks of opening.',
    shelfLife: '18 months from manufacturing date',
    suitableFor: 'All adult dog breeds',
    specialFeatures: 'Supports immune system, promotes healthy skin and coat, maintains muscle mass'
  },
  {
    id: 2,
    name: 'Grain-Free Cat Food',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: 'https://media.istockphoto.com/id/1453753583/photo/a-bowl-of-dog-food-on-a-wooden-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=-oVN8yI2GuHyiO0dyLWiHjufm2hnE-50uQFtFL7hKc0=',
    additionalImages: [
      'https://media.istockphoto.com/id/1453753583/photo/a-bowl-of-dog-food-on-a-wooden-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=-oVN8yI2GuHyiO0dyLWiHjufm2hnE-50uQFtFL7hKc0=',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&auto=format'
    ],
    category: 'dry-food',
    petType: 'cat',
    lifeStage: 'adult',
    sizes: ['3kg', '7kg', '12kg'],
    rating: 4.7,
    reviews: 278,
    badge: 'Grain-Free',
    description: 'High-protein grain-free formula for indoor cats with salmon and sweet potato',
    longDescription: 'Specially formulated for indoor cats, this grain-free recipe features real salmon as the primary ingredient. The high-protein formula helps maintain lean muscle mass while supporting urinary tract health. Enriched with taurine for heart and eye health, and contains natural fiber for hairball control.',
    inStock: true,
    stockCount: 32,
    features: ['Grain-Free', 'High Protein', 'Salmon Recipe', 'Urinary Health', 'Hairball Control', 'Taurine Enriched'],
    flavor: 'Salmon',
    weight: '7kg',
    brand: 'CatWell',
    ingredients: ['Salmon', 'Sweet Potato', 'Peas', 'Chicken Fat', 'Fish Oil', 'Vitamins', 'Minerals', 'Taurine'],
    nutritionalInfo: {
      protein: '32%',
      fat: '16%',
      fiber: '3%',
      moisture: '10%',
      taurine: '0.15%',
      magnesium: '0.09%'
    },
    feedingGuide: {
      '2-4kg': '1/4 - 1/2 cup per day',
      '4-6kg': '1/2 - 3/4 cup per day',
      '6kg+': '3/4 - 1 cup per day'
    },
    storageInstructions: 'Store in cool, dry place. Keep bag tightly closed. Use within 4 weeks of opening.',
    shelfLife: '15 months from manufacturing date',
    suitableFor: 'Adult indoor cats',
    specialFeatures: 'Promotes urinary health, controls hairballs, supports digestive health'
  },
  {
    id: 3,
    name: 'Puppy Growth Formula',
    price: 1999,
    originalPrice: 2699,
    discount: 26,
    image: 'https://media.istockphoto.com/id/510267099/photo/puppy-eating-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=nkpGGrL95Sp8sOOkI9IDxFZv7QWqdQb6sNgn0o9vsWQ=',
    additionalImages: [
      'https://media.istockphoto.com/id/510267099/photo/puppy-eating-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=nkpGGrL95Sp8sOOkI9IDxFZv7QWqdQb6sNgn0o9vsWQ=',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format'
    ],
    category: 'dry-food',
    petType: 'dog',
    lifeStage: 'puppy',
    sizes: ['4kg', '8kg', '12kg'],
    rating: 4.9,
    reviews: 189,
    badge: 'Growth',
    description: 'Specially formulated for puppies with DHA for brain development',
    longDescription: 'This complete and balanced puppy food is specifically designed to support healthy growth and development. Contains DHA from fish oil to support brain and vision development, plus antioxidants for a strong immune system. The small kibble size is perfect for puppies and easy to chew.',
    inStock: true,
    stockCount: 28,
    features: ['DHA for Brain', 'Immune Support', 'Bone Development', 'Easy Digestion', 'Small Kibble', 'Antioxidants'],
    flavor: 'Lamb & Rice',
    weight: '8kg',
    brand: 'PuppyGold',
    ingredients: ['Lamb', 'Rice', 'Fish Oil', 'Egg Product', 'Beet Pulp', 'Vitamins', 'Minerals'],
    nutritionalInfo: {
      protein: '28%',
      fat: '18%',
      fiber: '3%',
      moisture: '10%',
      calcium: '1.5%',
      phosphorus: '1.1%',
      DHA: '0.05%'
    },
    feedingGuide: {
      '2-4 months': '1/2 - 1 cup per day',
      '4-6 months': '1 - 2 cups per day',
      '6-12 months': '2 - 3 cups per day'
    },
    storageInstructions: 'Store in cool, dry place. Keep bag sealed. Use within 6 weeks of opening.',
    shelfLife: '16 months from manufacturing date',
    suitableFor: 'Puppies up to 12 months',
    specialFeatures: 'Supports brain development, strengthens immune system, promotes healthy growth'
  },
  {
    id: 4,
    name: 'Wet Cat Food Pack',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    image: 'https://media.istockphoto.com/id/1280943005/photo/a-redhead-cat-eats-treat-from-a-package-in-the-hand-of-a-caucasian-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=nOtRotNZjkQp28rTZnP0lBhMXr-wWIZVFDs1Vq_BoXo=',
    additionalImages: [
      'https://media.istockphoto.com/id/1280943005/photo/a-redhead-cat-eats-treat-from-a-package-in-the-hand-of-a-caucasian-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=nOtRotNZjkQp28rTZnP0lBhMXr-wWIZVFDs1Vq_BoXo=',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&auto=format'
    ],
    category: 'wet-food',
    petType: 'cat',
    lifeStage: 'adult',
    sizes: ['24 packs', '12 packs', '48 packs'],
    rating: 4.6,
    reviews: 156,
    badge: 'Wet Food',
    description: 'Delicious wet food with tuna and chicken in gravy, 24-pack variety',
    longDescription: 'This variety pack features four different recipes that cats love: Tuna & Chicken, Salmon & Shrimp, Beef & Liver, and Ocean Fish. Each recipe is packed with high-quality protein and essential nutrients, with a delicious gravy that enhances palatability. Perfect as a complete meal or as a topper for dry food.',
    inStock: true,
    stockCount: 60,
    features: ['High Moisture', 'Tuna & Chicken', 'Gravy Formula', 'Complete Meal', 'Variety Pack', 'No Artificial Flavors'],
    flavor: 'Tuna & Chicken',
    weight: '85g x 24',
    brand: 'FelineFeast',
    ingredients: ['Tuna', 'Chicken', 'Water', 'Liver', 'Vitamins', 'Minerals', 'Taurine'],
    nutritionalInfo: {
      protein: '12%',
      fat: '5%',
      fiber: '1%',
      moisture: '78%',
      taurine: '0.1%'
    },
    feedingGuide: {
      '3-5kg': '2-3 pouches per day',
      '5-7kg': '3-4 pouches per day'
    },
    storageInstructions: 'Store in cool, dry place. Refrigerate unused portion after opening. Use within 2 days of opening.',
    shelfLife: '24 months from manufacturing date',
    suitableFor: 'Adult cats of all breeds',
    specialFeatures: 'High moisture content, variety of flavors, promotes hydration'
  }
];

// Helper function to get product by ID
export const getFoodProductById = (id) => {
  return foodProducts.find(product => product.id === parseInt(id));
};

// Helper function to get foods by category
export const getFoodsByCategory = (category) => {
  return foodsData.filter(product => product.category === category);
};

// Helper function to get foods by pet type
export const getFoodsByPetType = (petType) => {
  return foodsData.filter(product => product.petType === petType);
};

// Helper function to get foods by life stage
export const getFoodsByLifeStage = (lifeStage) => {
  return foodsData.filter(product => product.lifeStage === lifeStage);
};