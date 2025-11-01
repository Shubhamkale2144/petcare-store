'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getAccessoryProductById } from '../../data/accessoriesData';

export default function AccessoryDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  useEffect(() => {
    loadCartFromStorage();
    const foundProduct = getAccessoryProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
    setLoading(false);
  }, [productId]);

  const loadCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('petcare-cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
        setCartCount(cartData.reduce((total, item) => total + item.quantity, 0));
      }
    }
  };

  const saveCartToStorage = (cartData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('petcare-cart', JSON.stringify(cartData));
    }
  };

  const addToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;

    if (!product.inStock) {
      showNotification('This product is currently out of stock', 'error');
      return;
    }

    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.size === selectedSize &&
      item.color === selectedColor
    );

    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id && item.size === selectedSize && item.color === selectedColor
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        cartId: Date.now()
      }];
    }

    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    
    showNotification(`"${product.name}" has been added to your cart!`, 'success');
  };

  const buyNow = () => {
    if (!product || !selectedSize || !selectedColor) return;

    if (!product.inStock) {
      showNotification('This product is currently out of stock', 'error');
      return;
    }

    // Add to cart first
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.size === selectedSize &&
      item.color === selectedColor
    );

    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id && item.size === selectedSize && item.color === selectedColor
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        cartId: Date.now()
      }];
    }

    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    saveCartToStorage(newCart);
    
    showNotification(`Proceeding to checkout with "${product.name}"`, 'info');
    
    // Redirect to checkout after a short delay
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const checkout = () => {
    if (cart.length === 0) {
      showNotification('Your cart is empty. Please add items to cart first.', 'error');
      return;
    }
    
    showNotification('Proceeding to checkout', 'info');
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading accessory...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Accessory Not Found</h1>
            <Link href="/accessories" className="text-amber-600 hover:text-amber-700 font-medium">
              ← Back to Accessories Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'error' ? 'bg-rose-500' : 
          notification.type === 'info' ? 'bg-blue-500' : 'bg-emerald-500'
        } text-white max-w-sm`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-4 text-white hover:text-slate-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold text-amber-600 hidden sm:block">PetCare</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/accessories" className="hover:text-amber-600 transition-colors">Accessories</Link>
                <span className="text-slate-300">/</span>
                <span className="text-amber-600 font-semibold truncate max-w-xs">{product.name}</span>
              </div>
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Breadcrumb */}
          <div className="md:hidden flex items-center space-x-2 text-sm text-slate-600 mt-3">
            <Link href="/accessories" className="hover:text-amber-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Accessories
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              <img
                src={product.additionalImages ? product.additionalImages[activeImage] : product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.additionalImages && product.additionalImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-amber-500' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-2 ${
                  product.badge === 'Bestseller' ? 'bg-amber-500' :
                  product.badge === 'Comfort' ? 'bg-emerald-500' :
                  product.badge === 'Safe' ? 'bg-blue-500' :
                  product.badge === 'Travel' ? 'bg-purple-500' :
                  product.badge === 'Smart' ? 'bg-cyan-500' :
                  product.badge === 'Waterproof' ? 'bg-indigo-500' :
                  product.badge === 'Popular' ? 'bg-rose-500' :
                  'bg-slate-500'
                }`}>
                  {product.badge}
                </span>
                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${
                  product.petType === 'dog' ? 'bg-amber-600' : 
                  product.petType === 'cat' ? 'bg-indigo-500' : 'bg-emerald-500'
                }`}>
                  {product.petType === 'dog' ? '🐶 Dog' : 
                   product.petType === 'cat' ? '🐱 Cat' : '🐾 Both'}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                <span className="text-amber-500 text-sm">⭐</span>
                <span className="font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-500 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.name}</h1>
            <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-slate-800">₹{product.price}</span>
                <span className="text-xl text-slate-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-rose-500 text-white px-2 py-1 rounded text-sm font-bold">
                  {product.discount}% OFF
                </span>
              </div>
              <p className="text-emerald-600 font-medium">You save ₹{product.originalPrice - product.price}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-slate-300 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Color:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                      selectedColor === color
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-slate-300 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-semibold text-slate-800 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  product.inStock
                    ? 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-base transition-all ${
                  product.inStock
                    ? 'bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Stock Info */}
            {product.inStock ? (
              <p className="text-emerald-600 text-sm mt-3 text-center">
                {product.stockCount < 10 
                  ? `Only ${product.stockCount} left in stock!` 
                  : 'In Stock - Ready to Ship'
                }
              </p>
            ) : (
              <p className="text-rose-600 text-sm mt-3 text-center">
                Out of Stock
              </p>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              <button className="flex-shrink-0 px-6 py-4 font-medium text-slate-800 border-b-2 border-amber-500">
                Product Details
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Specifications</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Material</dt>
                    <dd className="text-slate-800">{product.material}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Category</dt>
                    <dd className="text-slate-800 capitalize">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Brand</dt>
                    <dd className="text-slate-800">{product.brand || 'PetCare'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Care Instructions</dt>
                    <dd className="text-slate-800">{product.careInstructions}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Suitable For</dt>
                    <dd className="text-slate-800 capitalize">{product.petType === 'both' ? 'Dogs & Cats' : product.petType + 's'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Available Sizes</dt>
                    <dd className="text-slate-800">{product.sizes.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Available Colors</dt>
                    <dd className="text-slate-800">{product.colors.join(', ')}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Long Description */}
            {product.longDescription && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Description</h3>
                <p className="text-slate-600 leading-relaxed">{product.longDescription}</p>
              </div>
            )}

            {/* Size Guide */}
            {product.sizeGuide && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Size Guide</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(product.sizeGuide).map(([size, measurement]) => (
                      <div key={size} className="flex justify-between border-b border-slate-200 pb-2">
                        <dt className="font-medium text-slate-700">{size}:</dt>
                        <dd className="text-slate-600">{measurement}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Products */}
        <div className="text-center mt-8">
          <Link
            href="/accessories"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            ← Back to All Accessories
          </Link>
        </div>
      </div>

      {/* Cart Floating Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href="/cart"
            className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold flex items-center gap-2 hover:bg-amber-600"
          >
            <span>🛒</span>
            <span>Cart ({cartCount})</span>
            <span className="bg-white text-amber-600 px-2 py-1 rounded-full text-sm">
              ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}