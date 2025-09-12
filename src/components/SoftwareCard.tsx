import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download as DownloadIcon, Calendar, User } from 'lucide-react';
import { Software } from '../types';
import { DownloadButton } from './DownloadButton';

interface SoftwareCardProps {
  software: Software;
  layout?: 'grid' | 'list';
}

export const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, layout = 'grid' }) => {
  const handleDownload = () => {
    console.log('Downloading:', software.title);
  };

  if (layout === 'list') {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden">
        <div className="flex p-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={software.image}
              alt={software.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 ml-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link to={`/software/${software.id}`}>
                  <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                    {software.title}
                  </h3>
                </Link>
                <p className="text-gray-400 mt-1 line-clamp-2">
                  {software.description}
                </p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="w-4 h-4 mr-1" />
                    {software.developer}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    v{software.version}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <DownloadIcon className="w-4 h-4 mr-1" />
                    {software.downloads.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-3 ml-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">{software.rating}</span>
                </div>
                <DownloadButton onClick={handleDownload} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10">
      <div className="relative h-48 overflow-hidden">
        <img
          src={software.image}
          alt={software.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-white">{software.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <Link to={`/software/${software.id}`}>
          <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors mb-2">
            {software.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {software.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {software.developer}
          </div>
          <div className="flex items-center">
            <DownloadIcon className="w-4 h-4 mr-1" />
            {software.downloads.toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">v{software.version} • {software.size}</span>
          <DownloadButton onClick={handleDownload} size="sm" />
        </div>
      </div>
    </div>
  );
};