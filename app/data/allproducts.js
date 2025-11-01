// data/allproducts.js

const allProducts = [
  // Food Category (12 products)
  {
    id: 1,
    name: 'Premium Dog Food - Chicken & Rice',
    category: 'Food',
    subcategory: 'Dog Food',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.8,
    reviews: 142,
    image: 'https://plus.unsplash.com/premium_photo-1663045476550-6ecee3c164da?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 25,
    brand: 'PetCare Premium',
    description: 'Premium quality dog food made with real chicken and brown rice. Perfect for adult dogs of all breeds.',
    longDescription: 'Our Premium Dog Food is specially formulated with real chicken as the first ingredient, combined with wholesome brown rice and vegetables. This balanced recipe supports healthy digestion, promotes shiny coat, and provides sustained energy for your active dog. Free from artificial preservatives and colors. Formulated by veterinarians to meet all nutritional requirements.',
    tags: ['dog', 'premium', 'chicken', 'nutrition', 'adult', 'dry food'],
    features: ['Real Chicken First Ingredient', 'No Artificial Preservatives', 'Supports Healthy Digestion', 'Promotes Shiny Coat', 'Complete & Balanced'],
    ingredients: ['Chicken', 'Brown Rice', 'Oatmeal', 'Peas', 'Chicken Fat', 'Flaxseed', 'Vitamins & Minerals', 'Omega-3 Fatty Acids'],
    additionalImages: [
      'https://plus.unsplash.com/premium_photo-1663045476550-6ecee3c164da?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1589923188703-ab0e77dfd0d9?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1589923188651-268a75c0bf5d?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      weight: '5kg',
      lifeStage: 'Adult',
      breedSize: 'All Sizes',
      flavor: 'Chicken',
      packageType: 'Bag'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-3 days',
      returnPolicy: '30 days'
    },
    link: '/products/1'
  },
  {
    id: 2,
    name: 'Grain-Free Salmon Cat Food',
    category: 'Food',
    subcategory: 'Cat Food',
    price: 1799,
    originalPrice: 2299,
    discount: 22,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1590769383363-5681e57ff10f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JhaW4tRnJlZSUyMFNhbG1vbiUyMENhdCUyMEZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
    inStock: true,
    stockCount: 18,
    brand: 'Natural Choice',
    description: 'Grain-free cat food with real salmon for optimal health and vitality.',
    longDescription: 'Grain-free recipe with real salmon as the primary protein source, specially formulated for cats with sensitive stomachs or grain allergies. Rich in Omega-3 fatty acids for healthy skin and coat, and contains prebiotic fibers for digestive health. Perfect for indoor and outdoor cats of all life stages.',
    tags: ['cat', 'grain-free', 'salmon', 'sensitive', 'omega-3', 'wet food'],
    features: ['Grain-Free Formula', 'Real Salmon First Ingredient', 'Omega-3 Fatty Acids', 'Easy Digestion', 'Healthy Skin & Coat'],
    ingredients: ['Salmon', 'Sweet Potato', 'Peas', 'Canola Oil', 'Flaxseed', 'Vitamins', 'Minerals', 'Taurine'],
    additionalImages: [
      'https://images.unsplash.com/photo-1597848212624-e6d4bd66e5ae?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1589923188743-2ac9bcd6c21f?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      weight: '3kg',
      lifeStage: 'Adult',
      breedSize: 'All Sizes',
      flavor: 'Salmon',
      packageType: 'Bag'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-3 days',
      returnPolicy: '30 days'
    },
    link: '/products/2'
  },
  {
    id: 3,
    name: 'Organic Puppy Food',
    category: 'Food',
    subcategory: 'Puppy Food',
    price: 2299,
    originalPrice: 2899,
    discount: 21,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1747577672511-9fcea88b65c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE9yZ2FuaWMlMjBQdXBweSUyMEZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500t',
    inStock: true,
    stockCount: 12,
    brand: 'Organic Pets',
    description: 'Specially formulated organic food for growing puppies.',
    longDescription: 'Certified organic puppy food specifically designed to support the rapid growth and development of puppies. Contains DHA from organic sources for optimal brain development and calcium for strong bones and teeth. Small kibble size is perfect for puppy mouths and easy to digest.',
    tags: ['puppy', 'organic', 'growth', 'development', 'DHA'],
    features: ['USDA Certified Organic', 'DHA for Brain Development', 'Calcium for Bones', 'Small Kibble Size', 'No Artificial Ingredients'],
    ingredients: ['Organic Chicken', 'Organic Brown Rice', 'Organic Oats', 'Organic Peas', 'Organic Flaxseed', 'DHA Supplement', 'Calcium Carbonate'],
    additionalImages: [
      'https://images.unsplash.com/photo-1589923188743-2ac9bcd6c21f?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      weight: '4kg',
      lifeStage: 'Puppy',
      breedSize: 'All Sizes',
      flavor: 'Chicken',
      packageType: 'Bag'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-3 days',
      returnPolicy: '30 days'
    },
    link: '/products/3'
  },

  // Furniture Category (2 products)
  {
    id: 4,
    name: 'Luxury Orthopedic Pet Bed',
    category: 'Furniture',
    subcategory: 'Beds',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 15,
    brand: 'Comfort Zone',
    description: 'Orthopedic luxury bed for ultimate pet comfort and joint support.',
    longDescription: 'Our Luxury Orthopedic Pet Bed features premium medical-grade memory foam that contours to your pet body, providing optimal support for joints and muscles. The waterproof liner protects the mattress from accidents, while the removable zippered cover is machine washable for easy cleaning. Perfect for senior pets, large breeds, or those with arthritis or hip dysplasia.',
    tags: ['bed', 'luxury', 'comfort', 'orthopedic', 'memory-foam'],
    features: ['Medical-Grade Memory Foam', 'Waterproof Liner', 'Removable Washable Cover', 'Non-Slip Bottom', 'Various Sizes Available'],
    ingredients: [],
    additionalImages: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Memory Foam + Polyester',
      dimensions: '90x70x20 cm',
      weightCapacity: '50 kg',
      colors: ['Beige', 'Gray', 'Navy'],
      washable: 'Yes'
    },
    shipping: {
      freeShipping: false,
      deliveryTime: '3-5 days',
      returnPolicy: '30 days'
    },
    link: '/products/4'
  },
  {
    id: 5,
    name: 'Modern Pet Sofa',
    category: 'Furniture',
    subcategory: 'Sofas',
    price: 6999,
    originalPrice: 8999,
    discount: 22,
    rating: 4.4,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 8,
    brand: 'PetComfort',
    description: 'Modern design pet sofa that matches your home decor.',
    longDescription: 'Elevate your pet comfort with our Modern Pet Sofa, designed to complement your home interior while providing the ultimate lounging experience. Features a solid wood frame, high-density foam cushioning, and premium upholstery that resists scratching and stains. Available in multiple fabric options to match your decor.',
    tags: ['sofa', 'modern', 'comfort', 'furniture', 'luxury'],
    features: ['Solid Wood Frame', 'High-Density Foam', 'Scratch-Resistant Fabric', 'Easy Assembly', 'Multiple Color Options'],
    ingredients: [],
    additionalImages: [
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Solid Wood + Fabric',
      dimensions: '120x60x50 cm',
      weightCapacity: '80 kg',
      colors: ['Gray', 'Beige', 'Charcoal'],
      assembly: 'Required'
    },
    shipping: {
      freeShipping: false,
      deliveryTime: '5-7 days',
      returnPolicy: '30 days'
    },
    link: '/products/5'
  },

  // Accessories Category (3 products)
  {
    id: 6,
    name: 'Designer Leather Dog Collar',
    category: 'Accessories',
    subcategory: 'Collars',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.5,
    reviews: 203,
    image: 'https://media.istockphoto.com/id/521386205/photo/metal-tags-with-the-word-motivation.webp?a=1&b=1&s=612x612&w=0&k=20&c=ubMBv6nmktGczCNJ6r5N7yhEPWFvtu3oKNlRUWihzqI=',
    inStock: true,
    stockCount: 34,
    brand: 'StylePets',
    description: 'Premium designer collar with custom name tag.',
    longDescription: 'Handcrafted genuine leather collar with brass fittings and customizable name tag. Made from full-grain leather that softens with wear, becoming more comfortable over time while maintaining its durability and style. Each collar includes a free engraved name tag and is available in multiple sizes and colors. Features a quick-release buckle for safety and convenience.',
    tags: ['dog', 'collar', 'designer', 'leather', 'premium'],
    features: ['Full-Grain Leather', 'Brass Fittings', 'Custom Engraved Name Tag', 'Quick-Release Buckle', 'Multiple Sizes & Colors'],
    ingredients: [],
    additionalImages: [
      'https://media.istockphoto.com/id/521386205/photo/metal-tags-with-the-word-motivation.webp?a=1&b=1&s=612x612&w=0&k=20&c=ubMBv6nmktGczCNJ6r5N7yhEPWFvtu3oKNlRUWihzqI=',
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Genuine Leather',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Brown', 'Black', 'Tan'],
      closure: 'Quick-Release Buckle'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-4 days',
      returnPolicy: '30 days'
    },
    link: '/products/6'
  },
  {
    id: 7,
    name: 'Pet Travel Carrier',
    category: 'Accessories',
    subcategory: 'Travel',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.2,
    reviews: 67,
    image: 'https://plus.unsplash.com/premium_photo-1663133698547-660d78434cdd?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 18,
    brand: 'TravelSafe',
    description: 'Comfortable and secure travel carrier for pets.',
    longDescription: 'Airline-approved pet travel carrier designed for safety and comfort during travel. Features mesh windows for ventilation and visibility, secure locking mechanisms, and a comfortable padded base. Lightweight yet durable construction with multiple entry points and included safety straps for car travel. Meets most airline carry-on requirements.',
    tags: ['travel', 'carrier', 'safe', 'airline-approved', 'portable'],
    features: ['Airline Approved', '360° Ventilation', 'Secure Locking System', 'Padded Base', 'Multiple Entry Points'],
    ingredients: [],
    additionalImages: [
      'https://plus.unsplash.com/premium_photo-1663133698547-660d78434cdd?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Plastic + Mesh',
      dimensions: '45x30x25 cm',
      weightCapacity: '8 kg',
      colors: ['Black', 'Gray', 'Blue'],
      airlineApproved: 'Yes'
    },
    shipping: {
      freeShipping: false,
      deliveryTime: '3-5 days',
      returnPolicy: '30 days'
    },
    link: '/products/7'
  },
  {
    id: 8,
    name: 'Automatic Pet Feeder',
    category: 'Accessories',
    subcategory: 'Feeders',
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    rating: 4.3,
    reviews: 134,
    image: 'https://media.istockphoto.com/id/1496899978/photo/the-cat-eats-from-an-automatic-feeder-automatic-pet-food-dispenser-on-the-floor-of-the-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=M63mIZLkCgWg4JlvQzCWWE8b2PFuj1MP75XFsisULhU=',
    inStock: true,
    stockCount: 9,
    brand: 'SmartFeed',
    description: 'Smart automatic feeder with portion control.',
    longDescription: 'Smart automatic feeder with precise portion control and programmable settings. Features a large capacity food container, digital display, and customizable meal schedules. Includes battery backup for power outages and voice recording function to call your pet to meals. Perfect for maintaining feeding schedules when you are away from home.',
    tags: ['feeder', 'automatic', 'smart', 'feeding', 'programmable'],
    features: ['Precise Portion Control', 'Programmable Schedule', 'Digital Display', 'Battery Backup', 'Voice Recording'],
    ingredients: [],
    additionalImages: [
      'https://media.istockphoto.com/id/1496899978/photo/the-cat-eats-from-an-automatic-feeder-automatic-pet-food-dispenser-on-the-floor-of-the-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=M63mIZLkCgWg4JlvQzCWWE8b2PFuj1MP75XFsisULhU=',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Plastic + Electronics',
      capacity: '4L',
      power: 'AC Adapter + Battery Backup',
      programmableMeals: 'Up to 4 per day'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '3-5 days',
      returnPolicy: '30 days'
    },
    link: '/products/8'
  },

  // Clothes Category (2 products)
  {
    id: 9,
    name: 'Winter Hoodie Jacket',
    category: 'Clothes',
    subcategory: 'Jackets',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.2,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 32,
    brand: 'PetFashion',
    description: 'Warm and comfortable winter jacket for your pet',
    longDescription: 'Keep your pet warm and stylish during winter months with this comfortable hoodie jacket. Made from soft, breathable fabric with a warm fleece lining that provides excellent insulation. Features include an adjustable hood, easy velcro closures for quick dressing, and a practical opening for leash attachment. Available in multiple sizes and colors.',
    tags: ['dog', 'clothing', 'winter', 'jacket', 'hoodie', 'warm'],
    features: ['Warm Fleece Lining', 'Adjustable Hood', 'Easy Velcro Closures', 'Leash Opening', 'Multiple Sizes & Colors'],
    ingredients: [],
    additionalImages: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Polyester Blend',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Navy', 'Red', 'Gray'],
      care: 'Machine Washable'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-4 days',
      returnPolicy: '30 days'
    },
    link: '/products/9'
  },
  {
    id: 10,
    name: 'Party Dress with Bow',
    category: 'Clothes',
    subcategory: 'Dresses',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.6,
    reviews: 91,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 23,
    brand: 'PetFashion',
    description: 'Elegant party dress perfect for special occasions',
    longDescription: 'Beautiful party dress with adjustable bow, perfect for special occasions, photo sessions, and celebrations. Made from high-quality, comfortable fabric that allows freedom of movement while looking elegant. Features easy velcro back closure, adjustable straps, and a removable bow for versatile styling. Your pet will look adorable in this charming dress.',
    tags: ['dog', 'clothing', 'dress', 'party', 'elegant', 'celebration'],
    features: ['Elegant Design', 'Comfortable Fit', 'Adjustable Bow', 'Easy Closure', 'High-Quality Fabric'],
    ingredients: [],
    additionalImages: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      material: 'Satin Blend',
      sizes: ['XS', 'S', 'M'],
      colors: ['Pink', 'White', 'Red'],
      care: 'Hand Wash Recommended'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-4 days',
      returnPolicy: '30 days'
    },
    link: '/products/10'
  },

  // Medicines Category (2 products)
  {
    id: 11,
    name: 'Flea & Tick Treatment',
    category: 'Medicines',
    subcategory: 'Parasite Control',
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 42,
    brand: 'PetHealth',
    description: 'Effective flea and tick treatment for dogs and cats.',
    longDescription: 'Professional-grade flea and tick treatment that provides month-long protection. This fast-acting formula kills fleas, ticks, and chewing lice on contact, before they can lay eggs. Water-resistant formula remains effective after bathing or swimming. Vet recommended for complete pet protection. Easy-to-apply topical solution.',
    tags: ['medicine', 'flea', 'tick', 'health', 'protection', 'vet-recommended'],
    features: ['Month-Long Protection', 'Kills on Contact', 'Water Resistant', 'Vet Recommended', 'Easy Application'],
    ingredients: ['Fipronil', 'S-Methoprene', 'Inert Ingredients'],
    additionalImages: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1597848212624-e6d4bd66e5ae?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      type: 'Topical Solution',
      duration: '1 Month',
      forPets: 'Dogs & Cats',
      age: '8+ Weeks'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-3 days',
      returnPolicy: '30 days'
    },
    link: '/products/11'
  },
  {
    id: 12,
    name: 'Joint Health Supplements',
    category: 'Medicines',
    subcategory: 'Supplements',
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=400&fit=crop&auto=format',
    inStock: true,
    stockCount: 27,
    brand: 'VetCare',
    description: 'Advanced joint health supplements for senior pets.',
    longDescription: 'Advanced joint health formula specifically designed for senior pets or those with mobility issues. Contains glucosamine, chondroitin, and MSM to support cartilage health and joint flexibility. Enhanced with Omega-3 fatty acids to reduce inflammation. Vet formulated and made in the USA. Easy-to-administer soft chews that pets love.',
    tags: ['medicine', 'joint', 'health', 'senior', 'supplements', 'mobility'],
    features: ['Glucosamine & Chondroitin', 'MSM for Joint Support', 'Omega-3 Fatty Acids', 'Vet Formulated', 'Tasty Soft Chews'],
    ingredients: ['Glucosamine HCl', 'Chondroitin Sulfate', 'Methylsulfonylmethane (MSM)', 'Omega-3 Fatty Acids', 'Vitamin C', 'Manganese'],
    additionalImages: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1597848212624-e6d4bd66e5ae?w=600&h=600&fit=crop&auto=format'
    ],
    specifications: {
      type: 'Soft Chews',
      count: '90 chews',
      forPets: 'Dogs',
      age: '1+ Years'
    },
    shipping: {
      freeShipping: true,
      deliveryTime: '2-3 days',
      returnPolicy: '30 days'
    },
    link: '/products/12'
  }
];

export default allProducts;
// Utility functions for products
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySubcategory = (category, subcategory) => {
  return allProducts.filter(product => 
    product.category === category && product.subcategory === subcategory
  );
};

export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.rating >= 4.5).slice(0, 8);
};

export const getDiscountedProducts = () => {
  return allProducts.filter(product => product.discount >= 20).slice(0, 6);
};

export const getRelatedProducts = (currentProduct, limit = 4) => {
  return allProducts
    .filter(product => 
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    )
    .slice(0, limit);
};

// Get all unique categories
export const getAllCategories = () => {
  const categories = allProducts.map(product => product.category);
  return [...new Set(categories)];
};

// Get subcategories for a specific category
export const getSubcategoriesByCategory = (category) => {
  const subcategories = allProducts
    .filter(product => product.category === category)
    .map(product => product.subcategory);
  return [...new Set(subcategories)];
};

// Search products by query
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter products by multiple criteria
export const filterProducts = (filters = {}) => {
  let filtered = [...allProducts];

  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.subcategory) {
    filtered = filtered.filter(product => product.subcategory === filters.subcategory);
  }

  if (filters.minPrice) {
    filtered = filtered.filter(product => product.price >= filters.minPrice);
  }

  if (filters.maxPrice) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice);
  }

  if (filters.minRating) {
    filtered = filtered.filter(product => product.rating >= filters.minRating);
  }

  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  if (filters.brand) {
    filtered = filtered.filter(product => product.brand === filters.brand);
  }

  return filtered;
};