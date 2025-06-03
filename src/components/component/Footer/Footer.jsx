import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagramSquare,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-white text-green-800 py-8  w-full border-t border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Route Academy</h2>
            <p className="text-green-600">&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-700">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-green-600 hover:text-green-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-green-600 hover:text-green-400 transition-colors">About</Link></li>
                <li><Link to="/category" className="text-green-600 hover:text-green-400 transition-colors">Category</Link></li>
                <li><Link to="/cart" className="text-green-600 hover:text-green-400 transition-colors">Cart</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-700">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-green-600 hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link to="/register" className="text-green-600 hover:text-green-400 transition-colors">Register</Link></li>
                <li><Link to="/privacy-policy" className="text-green-600 hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-700">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-600 hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-green-600 hover:text-green-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-green-600 hover:text-green-400 transition-colors">Feedback</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-700">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-blue-600 text-2xl transition-colors">
                  <FaFacebook />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-blue-400 text-2xl transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-pink-600 text-2xl transition-colors">
                  <FaInstagramSquare />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-black text-2xl transition-colors">
                  <FaTiktok />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-red-600 text-2xl transition-colors">
                  <FaYoutube />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-600">Subscribe to our newsletter</p>
                <div className="flex mt-2">
                  <input type="email" placeholder="Your email" className="px-3 py-2 border border-green-300 rounded-l focus:outline-none focus:ring-1 focus:ring-green-500 w-full" />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 mt-8 pt-6 text-center text-sm text-green-500">
          <p>Route Academy - Empowering your learning journey</p>
          <p className="mt-1">Made with ❤️ by Route Academy Team</p>
        </div>
      </div>
    </footer>
  );
}

