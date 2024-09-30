import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">TechStore is your one-stop shop for all things tech. We offer the latest gadgets and accessories at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Products</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Deals</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Tech Street, Silicon Valley, CA 94000</p>
            <p className="text-sm mb-2">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: support@techstore.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-blue-300"><Twitter size={20} /></a>
              <a href="#" className="text-white hover:text-blue-300"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-blue-300"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2024 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;