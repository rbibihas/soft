import React from 'react';
import { FeaturedSection } from '../components/FeaturedSection';
import { CategoryCard } from '../components/CategoryCard';
import { SoftwareCard } from '../components/SoftwareCard';
import { software, categories } from '../data/mockData';

export const HomePage: React.FC = () => {
  const featuredSoftware = software.slice(0, 3);
  const recentSoftware = software.slice(3, 9);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Download Hub
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and download the latest games, software, and applications. 
            Your one-stop destination for digital downloads.
          </p>
          <div className="flex justify-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search for games, software..."
                className="bg-transparent text-white px-4 py-3 w-96 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Downloads */}
      <FeaturedSection featured={featuredSoftware} />

      {/* Categories Section */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Browse Categories</h2>
            <p className="text-gray-400">Explore software by category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recent Uploads</h2>
            <p className="text-gray-400">Latest software and games added to our collection</p>
          </div>
          
          <div className="space-y-4">
            {recentSoftware.map((item) => (
              <SoftwareCard key={item.id} software={item} layout="list" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};