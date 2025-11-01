'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { clothingProducts, getClothingProductById } from '../../data/clothesData';

export default function ClothesDetailPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
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
        const foundProduct = getClothingProductById(productId);
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(foundProduct.sizes[0]);
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
        if (!product || !selectedSize) return;

        if (!product.inStock) {
            showNotification('This product is currently out of stock', 'error');
            return;
        }

        const existingItem = cart.find(item =>
            item.id === product.id &&
            item.size === selectedSize
        );

        let newCart;
        if (existingItem) {
            newCart = cart.map(item =>
                item.id === product.id && item.size === selectedSize
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            newCart = [...cart, {
                ...product,
                size: selectedSize,
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
        if (!product || !selectedSize) return;

        if (!product.inStock) {
            showNotification('This product is currently out of stock', 'error');
            return;
        }

        // Add to cart first
        const existingItem = cart.find(item =>
            item.id === product.id &&
            item.size === selectedSize
        );

        let newCart;
        if (existingItem) {
            newCart = cart.map(item =>
                item.id === product.id && item.size === selectedSize
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            newCart = [...cart, {
                ...product,
                size: selectedSize,
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
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600 text-lg">Loading product...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
                        <Link href="/clothes" className="text-pink-600 hover:text-pink-700 font-medium">
                            ← Back to Clothes Collection
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {/* Notification */}
            {notification.show && (
                <div
                    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-in slide-in-from-right ${notification.type === 'error'
                        ? 'bg-red-500 text-white'
                        : notification.type === 'info'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        } max-w-sm mx-auto`}
                    style={{
                        zIndex: 9999,
                        animation: 'slideInRight 0.3s ease-out'
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {notification.type === 'success' && (
                                <span className="text-lg">✅</span>
                            )}
                            {notification.type === 'error' && (
                                <span className="text-lg">❌</span>
                            )}
                            {notification.type === 'info' && (
                                <span className="text-lg">ℹ️</span>
                            )}
                            <span className="font-medium">{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification({ show: false, message: '', type: '' })}
                            className="ml-4 hover:opacity-70 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Add CSS for animation */}
            <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-right {
          animation-name: slideInRight;
        }
      `}</style>

            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <nav className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="text-pink-600">🏠</span>
                            <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
                            <span>›</span>
                            <Link href="/clothes" className="hover:text-pink-600 transition-colors">Clothes</Link>
                            <span>›</span>
                            <span className="text-gray-800 font-medium">{product.name}</span>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
                                <span className="text-xl">🛒</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
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
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImage === index ? 'border-pink-500' : 'border-gray-200'
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
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-2 ${product.badge === 'Bestseller' ? 'bg-orange-500' :
                                    product.badge === 'New' ? 'bg-green-500' :
                                        product.badge === 'Popular' ? 'bg-blue-500' :
                                            product.badge === 'Waterproof' ? 'bg-cyan-500' :
                                                product.badge === 'Luxury' ? 'bg-purple-500' :
                                                    product.badge === 'Sports' ? 'bg-red-500' :
                                                        product.badge === 'Festive' ? 'bg-red-600' :
                                                            'bg-pink-500'
                                    }`}>
                                    {product.badge}
                                </span>
                                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${product.petType === 'dog' ? 'bg-yellow-500' : 'bg-indigo-500'
                                    }`}>
                                    {product.petType === 'dog' ? '🐶 Dog' : '🐱 Cat'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                <span className="text-yellow-500 text-sm">⭐</span>
                                <span className="font-bold text-gray-800">{product.rating}</span>
                                <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                    {product.discount}% OFF
                                </span>
                            </div>
                            <p className="text-green-600 font-medium">You save ₹{product.originalPrice - product.price}</p>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Size:
                            </label>
                            <div className="flex gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${selectedSize === size
                                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                                            : 'border-gray-300 text-gray-700 hover:border-pink-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Quantity:
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                    −
                                </button>
                                <span className="text-lg font-semibold text-gray-800 min-w-8 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {/* Add to Cart Button */}
                            <button
                                onClick={addToCart}
                                disabled={!product?.inStock}
                                className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${product?.inStock
                                    ? 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg transform hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                title="Add to Cart"
                            >
                                ADD to CART
                            </button>

                            {/* Buy Now Button */}
                            <button
                                onClick={buyNow}
                                disabled={!product?.inStock}
                                className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${product?.inStock
                                    ? 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg transform hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                title="Buy Now"
                            >
                                buy now
                            </button>

                            {/* Checkout Button */}
                            <button
                                onClick={checkout}
                                className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg transform hover:scale-105"
                                title="Proceed to Checkout"
                            >
                                Checkout
                            </button>
                        </div>

                        {/* Stock Info */}
                        {product.inStock && (
                            <p className="text-green-600 text-sm mt-2 text-center">
                                {product.stockCount < 10
                                    ? `Only ${product.stockCount} left in stock!`
                                    : 'In Stock'
                                }
                            </p>
                        )}
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto">
                            <button className="flex-shrink-0 px-6 py-4 font-medium text-gray-800 border-b-2 border-pink-500">
                                Product Details
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-pink-500 mr-2">✓</span>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Material</dt>
                                        <dd className="text-gray-800">{product.material}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Care Instructions</dt>
                                        <dd className="text-gray-800">{product.careInstructions}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Suitable For</dt>
                                        <dd className="text-gray-800 capitalize">{product.petType}s</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Available Sizes</dt>
                                        <dd className="text-gray-800">{product.sizes.join(', ')}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Products */}
                <div className="text-center mt-8">
                    <Link
                        href="/clothes"
                        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                    >
                        ← Back to All Clothes
                    </Link>
                </div>
            </div>

            {/* Cart Floating Button */}
            {cartCount > 0 && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Link
                        href="/cart"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold flex items-center gap-2 hover:scale-105"
                    >
                        <span>🛒</span>
                        <span>Cart ({cartCount})</span>
                        <span className="bg-white text-pink-600 px-2 py-1 rounded-full text-sm">
                            ₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
}