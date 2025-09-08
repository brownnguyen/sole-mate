"use client";
import Link from "next/link";
import { useState, use } from "react";
import { ShoppingCart, Search, User, Heart, Star, Plus, Minus, Truck, RotateCcw, Shield, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const { addToCart, getTotalItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const product = {
    id: resolvedParams.id,
    name: "Air Max 270 React",
    brand: "Nike",
    price: 120,
    originalPrice: 150,
    rating: 4.5,
    reviewCount: 128,
    description: "The Nike Air Max 270 React combines two iconic Air Max technologies for an unprecedented level of comfort and style. Features React foam for responsive cushioning and a 270-degree Air unit for maximum impact protection.",
    images: ["👟", "👟", "👟", "👟"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    features: [
      "React foam midsole for responsive cushioning",
      "270-degree Air unit in heel for impact protection",
      "Breathable mesh and synthetic upper",
      "Rubber outsole with waffle pattern for traction"
    ]
  };

  const reviews = [
    { id: 1, user: "John D.", rating: 5, comment: "Amazing comfort and style! Perfect for daily wear.", date: "2 weeks ago" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Great shoes, but runs a bit small. Order half size up.", date: "1 month ago" },
    { id: 3, user: "Mike R.", rating: 5, comment: "Best sneakers I've ever owned. Highly recommend!", date: "1 month ago" }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
    });

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          ✓ Added to cart successfully!
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SoleMate
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600" />
              <User className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600" />

              {/* Cart Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className="relative p-2 text-gray-600 hover:text-blue-600"
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                </button>

                {/* Cart Dropdown */}
                {showCartDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
                        <button
                          onClick={() => setShowCartDropdown(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {getTotalItems() === 0 ? (
                        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                      ) : (
                        <>
                          <div className="text-center py-4">
                            <p className="text-gray-600">You have {getTotalItems()} item(s) in your cart</p>
                          </div>

                          <div className="border-t pt-3 mt-3">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-gray-900">Total: ${getTotalPrice()}</span>
                            </div>
                            <Link
                              href="/cart"
                              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                              onClick={() => setShowCartDropdown(false)}
                            >
                              View Cart
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gray-700">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg aspect-square mb-4 flex items-center justify-center">
              <span className="text-8xl">{product.images[selectedImage]}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-100 rounded-lg aspect-square flex items-center justify-center ${selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                >
                  <span className="text-2xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-lg py-2 text-center ${selectedSize === size
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${selectedSize
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>
              <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">Easy returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">2-year warranty</span>
              </div>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
