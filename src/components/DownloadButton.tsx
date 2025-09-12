import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onClick, 
  size = 'md', 
  variant = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    secondary: 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        text-white font-semibold rounded-lg
        transform transition-all duration-200
        hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
        active:scale-95
        flex items-center space-x-2
        group
        relative overflow-hidden
        border border-white/20
      `}
      style={{
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        animation: 'glow 2s ease-in-out infinite alternate'
      }}
    >
      <span className="relative z-10">Download</span>
      <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};