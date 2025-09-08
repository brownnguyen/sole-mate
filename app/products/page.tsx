"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, User, Heart, Filter, Star } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrand, setSelectedBrand] = useState("all");

  const products = [
    { id: 1, name: "Air Max 270", brand: "Nike", price: 120, category: "sneakers", rating: 4.5, image: "👟" },
    { id: 2, name: "Chuck Taylor", brand: "Converse", price: 65, category: "casual", rating: 4.3, image: "👟" },
    { id: 3, name: "Ultraboost 22", brand: "Adidas", price: 180, category: "running", rating: 4.7, image: "👟" },
    { id: 4, name: "Classic Leather", brand: "Reebok", price: 75, category: "casual", rating: 4.2, image: "👟" },
    { id: 5, name: "Air Jordan 1", brand: "Nike", price: 170, category: "sneakers", rating: 4.8, image: "👟" },
    { id: 6, name: "Stan Smith", brand: "Adidas", price: 85, category: "casual", rating: 4.4, image: "👟" },
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const brandMatch = selectedBrand === "all" || product.brand === selectedBrand;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && brandMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">SoleMate</Link>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/men" className="text-gray-700 hover:text-gray-900">Men</Link>
              <Link href="/women" className="text-gray-700 hover:text-gray-900">Women</Link>
              <Link href="/kids" className="text-gray-700 hover:text-gray-900">Kids</Link>
              <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium">Sale</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search shoes..." 
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
              <Heart className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer" />
              <User className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {["all", "sneakers", "casual", "running", "formal"].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize text-gray-700">{category === "all" ? "All Categories" : category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {["all", "Nike", "Adidas", "Converse", "Reebok"].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{brand === "all" ? "All Brands" : brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
              <select className="border border-gray-300 rounded-lg px-4 py-2">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 aspect-square flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-6xl">{product.image}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setPriceRange([0, 500]);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
