import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Grid, List, Filter } from 'lucide-react';
import { software, categories } from '../data/mockData';
import { SoftwareCard } from '../components/SoftwareCard';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const categoryInfo = categories.find(c => c.id === category);
  const categorySoftware = software.filter(s => s.category === category);

  const sortedSoftware = [...categorySoftware].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'date':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return 0;
    }
  });

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Category Header */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{categoryInfo.name}</h1>
          <p className="text-gray-400 text-lg mb-4">{categoryInfo.description}</p>
          <div className="text-sm text-gray-500">
            {categorySoftware.length} items in this category
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="downloads">Downloads</option>
                <option value="date">Release Date</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded transition-colors ${
                layout === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded transition-colors ${
                layout === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Software Grid/List */}
        <div className={
          layout === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedSoftware.map((item) => (
            <SoftwareCard 
              key={item.id} 
              software={item} 
              layout={layout}
            />
          ))}
        </div>

        {sortedSoftware.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No software found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};