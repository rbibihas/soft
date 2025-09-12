import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Star, Eye, Calendar, User } from 'lucide-react';
import { software } from '../data/mockData';
import { DownloadButton } from '../components/DownloadButton';
import { Sidebar } from '../components/Sidebar';

export const SoftwarePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = software.find(s => s.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Software not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    console.log('Downloading:', item.title);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <div className="relative h-64 md:h-80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium text-white">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {item.title}
                  </h1>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-300">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {item.developer}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.releaseDate}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.downloads.toLocaleString()}
                      </div>
                    </div>
                    <DownloadButton onClick={handleDownload} size="lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">About {item.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {item.fullDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <Star className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Version Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Version:</span>
                      <span className="text-white">v{item.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">File Size:</span>
                      <span className="text-white">{item.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Developer:</span>
                      <span className="text-white">{item.developer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Release Date:</span>
                      <span className="text-white">{item.releaseDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            {item.screenshots.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar software={item} />
          </div>
        </div>
      </div>
    </div>
  );
};