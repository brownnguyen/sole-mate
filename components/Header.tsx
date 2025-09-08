"use client";
import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from '@/contexts/CartContext';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { addToCart, getTotalItems } = useCart();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">👟 SoleMate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/men" className="text-gray-900 hover:text-blue-600 font-medium">Men</Link>
            <Link href="/women" className="text-gray-900 hover:text-blue-600 font-medium">Women</Link>
            <Link href="/kids" className="text-gray-900 hover:text-blue-600 font-medium">Kids</Link>
            <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium">Sale</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search shoes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="h-6 w-6 text-gray-700" />
            </button>
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search shoes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link href="/men" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">Men</Link>
                <Link href="/women" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">Women</Link>
                <Link href="/kids" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">Kids</Link>
                <Link href="/sale" className="block py-2 text-red-600 hover:text-red-700 font-medium">Sale</Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
