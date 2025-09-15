import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Package, 
  FolderOpen, 
  Download, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { software, categories } = useAdmin();

  const totalDownloads = software.reduce((sum, item) => sum + item.downloads, 0);
  const averageRating = software.reduce((sum, item) => sum + item.rating, 0) / software.length;
  const recentSoftware = software.slice(-5).reverse();

  const stats = [
    {
      title: 'Total Software',
      value: software.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'from-green-500 to-green-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Total Downloads',
      value: totalDownloads.toLocaleString(),
      icon: Download,
      color: 'from-purple-500 to-purple-600',
      change: '+23%',
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      change: '+0.2',
      trend: 'up'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your software hub.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
            const trendColor = stat.trend === 'up' ? 'text-green-400' : 'text-red-400';
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 ${trendColor} text-sm font-medium`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Software */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Software</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentSoftware.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{item.downloads.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">downloads</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Category Distribution</h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryCount = software.filter(s => s.category === category.id).length;
                const percentage = (categoryCount / software.length) * 100;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-gray-400">{categoryCount} items</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
              <Package className="w-5 h-5" />
              <span>Add New Software</span>
            </button>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
              <FolderOpen className="w-5 h-5" />
              <span>Create Category</span>
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};