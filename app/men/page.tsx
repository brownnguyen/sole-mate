"use client";
import { useState } from "react";
import Link from "next/link";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import Header from "@/components/Header";

export default function MenPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    { id: 1, name: "Classic Leather Sneakers", price: 129.99, category: "Sneakers", brand: "Nike", image: "👟", rating: 4.5, reviews: 245 },
    { id: 2, name: "Professional Oxford Shoes", price: 189.99, category: "Formal", brand: "Clarks", image: "👞", rating: 4.8, reviews: 156 },
    { id: 3, name: "Athletic Running Shoes", price: 149.99, category: "Athletic", brand: "Adidas", image: "🏃", rating: 4.6, reviews: 389 },
    { id: 4, name: "Casual Loafers", price: 99.99, category: "Casual", brand: "Sperry", image: "👞", rating: 4.3, reviews: 98 },
    { id: 5, name: "High-Top Basketball Shoes", price: 169.99, category: "Athletic", brand: "Jordan", image: "⛹️", rating: 4.7, reviews: 567 },
    { id: 6, name: "Chelsea Boots", price: 199.99, category: "Boots", brand: "Dr. Martens", image: "🥾", rating: 4.4, reviews: 123 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Men's Shoes</h1>
          <p className="text-xl text-gray-300">Discover premium footwear for every occasion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {['Sneakers', 'Formal', 'Athletic', 'Casual', 'Boots'].map(category => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {['Nike', 'Adidas', 'Clarks', 'Jordan', 'Dr. Martens'].map(brand => (
                    <label key={brand} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Under $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">$100 - $150</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">$150 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Over $200</span>
                  </label>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-medium mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['7', '8', '9', '10', '11', '12'].map(size => (
                    <button key={size} className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products found</p>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2 pr-8 appearance-none bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="h-4 w-4 absolute right-2 top-3 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex border rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map(product => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-4 p-4 border rounded-lg' : ''}`}>
                    <div className={`bg-gray-100 rounded-lg overflow-hidden ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square mb-4'}`}>
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-4xl">{product.image}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded hover:bg-gray-100">Previous</button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-100">2</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-100">3</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-100">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
