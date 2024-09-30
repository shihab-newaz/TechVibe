import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Input } from "@/components/ui/input"

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0); // Example initial cart count
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-700 shadow-md w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-500">TechStore</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-blue-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/products" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
            <Link to="/deals" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">Deals</Link>
            <Link to="/support" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">Support</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl px-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 bg-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* User and Cart Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 cursor-pointer">
              <User className="h-6 w-6 text-white" />
            </Link>
            <Link to="/cart" className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 cursor-pointer relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/products" className="text-white hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
            <Link to="/deals" className="text-white hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium">Deals</Link>
            <Link to="/support" className="text-white hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium">Support</Link>
          </div>
          <div className="px-2 pt-2 pb-3">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 bg-white"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;