import React from 'react';
import { Download, Star, Calendar, User, HardDrive, Shield, Cpu } from 'lucide-react';
import { Software } from '../types';

interface SidebarProps {
  software: Software;
}

export const Sidebar: React.FC<SidebarProps> = ({ software }) => {
  return (
    <div className="space-y-6">
      {/* Download Stats */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Download Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <Download className="w-4 h-4 mr-2" />
              <span>Total Downloads</span>
            </div>
            <span className="text-white font-medium">{software.downloads.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <Star className="w-4 h-4 mr-2" />
              <span>Rating</span>
            </div>
            <span className="text-white font-medium">{software.rating}/5.0</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Release Date</span>
            </div>
            <span className="text-white font-medium">{software.releaseDate}</span>
          </div>
        </div>
      </div>

      {/* Software Info */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Software Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <User className="w-4 h-4 mr-2" />
              <span>Developer</span>
            </div>
            <span className="text-white font-medium">{software.developer}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <Cpu className="w-4 h-4 mr-2" />
              <span>Version</span>
            </div>
            <span className="text-white font-medium">v{software.version}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400">
              <HardDrive className="w-4 h-4 mr-2" />
              <span>File Size</span>
            </div>
            <span className="text-white font-medium">{software.size}</span>
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">System Requirements</h3>
        <ul className="space-y-2">
          {software.requirements.map((req, index) => (
            <li key={index} className="flex items-start text-sm">
              <Shield className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {software.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};