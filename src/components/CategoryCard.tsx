import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, count }) => {
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;

  return (
    <Link to={`/category/${category.id}`}>
      <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 p-6 group hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            <span className="text-sm text-gray-400">{count} items</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {category.description}
        </p>
      </div>
    </Link>
  );
};