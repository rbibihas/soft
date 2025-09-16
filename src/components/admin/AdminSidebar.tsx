import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Settings, 
  BarChart3, 
  Users, 
  Download,
  ArrowLeft,
  LogOut,
  Search,
  Palette,
  Menu,
  User,
  Layout,
  FileText,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout, adminProfile } = useAdmin();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/software', icon: Package, label: 'Software Management' },
    { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/admin/seo', icon: Search, label: 'SEO Management' },
    { path: '/admin/appearance', icon: Palette, label: 'Appearance' },
    { path: '/admin/menu', icon: Menu, label: 'Menu Management' },
    { path: '/admin/sections', icon: Layout, label: 'Section Management' },
    { path: '/admin/footer', icon: FileText, label: 'Footer Management' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-gray-900 border-r border-gray-800 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>
        
        {/* Admin Profile Quick View */}
        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
          <img
            src={adminProfile.avatar}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{adminProfile.name}</p>
            <p className="text-gray-400 text-xs truncate">{adminProfile.role}</p>
          </div>
        </div>
        
        <Link 
          to="/" 
          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Website
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mb-4"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
        <div className="text-xs text-gray-500 text-center">
          Admin Dashboard v1.0
        </div>
      </div>
    </div>
  );
};