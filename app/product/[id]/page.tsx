"use client";
import { useState } from "react";
import { Heart, Share2, Star, Truck, RotateCcw, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    id: params.id,
    name: "Premium Athletic Running Shoes",
    brand: "Nike",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviews: 389,
    description: "Experience ultimate comfort and performance with these premium athletic running shoes. Engineered with advanced cushioning technology and breathable materials for all-day comfort.",
    features: [
      "Advanced cushioning technology",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Lightweight design",
      "Moisture-wicking lining"
    ],
    images: ['👟', '👟', '👟', '👟'],
    colors: [
      { name: 'black', color: '#000000' },
      { name: 'white', color: '#FFFFFF' },
      { name: 'navy', color: '#1F2937' },
      { name: 'red', color: '#EF4444' }
    ],
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    inStock: true,
    category: "Athletic"
  };

  const reviews = [
    { id: 1, name: "John D.", rating: 5, date: "2024-01-15", comment: "Excellent quality and very comfortable for daily runs." },
    { id: 2, name: "Sarah M.", rating: 4, date: "2024-01-10", comment: "Great shoes, but sizing runs a bit small." },
    { id: 3, name: "Mike R.", rating: 5, date: "2024-01-08", comment: "Best running shoes I've ever owned!" }
  ];

  const relatedProducts = [
    { id: 2, name: "Casual Sneakers", price: 89.99, image: "👟" },
    { id: 3, name: "Training Shoes", price: 119.99, image: "👟" },
    { id: 4, name: "Basketball Shoes", price: 169.99, image: "⛹️" },
    { id: 5, name: "Walking Shoes", price: 99.99, image: "🚶" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/men" className="text-gray-500 hover:text-gray-700">Men</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-8xl">
                {product.images[currentImageIndex]}
              </div>
              <button 
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setCurrentImageIndex(Math.min(product.images.length - 1, currentImageIndex + 1))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl ${
                    currentImageIndex === index ? 'border-2 border-blue-600' : ''
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-blue-600 font-medium">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-blue-600' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-medium ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <button 
                disabled={!selectedSize}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $100</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day guarantee</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Warranty</p>
                <p className="text-xs text-gray-600">1-year coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'reviews', 'shipping'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-gray-700 mb-6">{product.description}</p>
                <h4 className="font-semibold mb-4">Key Features:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Write Review
                  </button>
                </div>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl">
                <h4 className="font-semibold mb-4">Shipping Information</h4>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Standard Shipping:</strong> 5-7 business days - Free on orders over $100</p>
                  <p><strong>Express Shipping:</strong> 2-3 business days - $9.99</p>
                  <p><strong>Overnight Shipping:</strong> Next business day - $19.99</p>
                  <p><strong>International Shipping:</strong> 7-14 business days - Starting at $24.99</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="bg-gray-100 rounded-lg aspect-square mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-4xl">{product.image}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
