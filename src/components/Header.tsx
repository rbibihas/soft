import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Search, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SoftwareHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/category/windows" 
              className={`text-sm font-medium transition-colors ${
                isActive('/category/windows') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Windows
            </Link>
            <Link 
              to="/category/macos" 
              className={`text-sm font-medium transition-colors ${
                isActive('/category/macos') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              macOS
            </Link>
            <Link 
              to="/category/android-games" 
              className={`text-sm font-medium transition-colors ${
                isActive('/category/android-games') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Android Games
            </Link>
            <Link 
              to="/category/ios-games" 
              className={`text-sm font-medium transition-colors ${
                isActive('/category/ios-games') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              iOS Games
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search software..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};