import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download as DownloadIcon } from 'lucide-react';
import { Software } from '../types';
import { DownloadButton } from './DownloadButton';

interface FeaturedSectionProps {
  featured: Software[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ featured }) => {
  const handleDownload = (software: Software) => {
    console.log('Downloading:', software.title);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Downloads</h2>
          <p className="text-gray-400 text-lg">Hand-picked software and games for you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((software) => (
            <div key={software.id} className="relative overflow-hidden rounded-2xl group hover:scale-105 transition-transform duration-300">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={software.image}
                  alt={software.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {software.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{software.rating}</span>
                    </div>
                  </div>
                  
                  <Link to={`/software/${software.id}`}>
                    <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors mb-2">
                      {software.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-200 mb-4 text-sm line-clamp-2">
                    {software.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span>{software.version}</span>
                      <span>{software.size}</span>
                      <div className="flex items-center">
                        <DownloadIcon className="w-4 h-4 mr-1" />
                        {software.downloads.toLocaleString()}
                      </div>
                    </div>
                    <DownloadButton 
                      onClick={() => handleDownload(software)} 
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};