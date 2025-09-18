import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Github, Twitter, Facebook, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Download className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SoftwareHub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted destination for downloading the latest games, software, and applications. 
              Safe, fast, and reliable downloads for all your digital needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/windows" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Windows Software
                </Link>
              </li>
              <li>
                <Link to="/category/macos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  macOS Software
                </Link>
              </li>
              <li>
                <Link to="/category/android-games" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Android Games
                </Link>
              </li>
              <li>
                <Link to="/category/ios-games" className="text-gray-400 hover:text-white transition-colors text-sm">
                  iOS Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Download Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  System Requirements
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  DMCA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2024 SoftwareHub. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for developers and gamers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};