import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  TrendingUp, 
  Download, 
  Star, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { software, categories } = useAdmin();

  // Calculate analytics data
  const totalDownloads = software.reduce((sum, item) => sum + item.downloads, 0);
  const averageRating = software.reduce((sum, item) => sum + item.rating, 0) / software.length;
  const topSoftware = [...software].sort((a, b) => b.downloads - a.downloads).slice(0, 5);
  const categoryStats = categories.map(cat => ({
    ...cat,
    count: software.filter(s => s.category === cat.id).length,
    totalDownloads: software.filter(s => s.category === cat.id).reduce((sum, item) => sum + item.downloads, 0)
  })).sort((a, b) => b.totalDownloads - a.totalDownloads);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track performance and user engagement metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <Download className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{totalDownloads.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Total Downloads</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+0.2</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{averageRating.toFixed(1)}</h3>
            <p className="text-gray-400 text-sm">Average Rating</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">12.5K</h3>
            <p className="text-gray-400 text-sm">Active Users</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+23%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2.8K</h3>
            <p className="text-gray-400 text-sm">Monthly Growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Downloads */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Downloads</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topSoftware.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover"
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

          {/* Category Performance */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Category Performance</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categoryStats.map((category, index) => {
                const percentage = (category.totalDownloads / totalDownloads) * 100;
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-gray-400">{category.totalDownloads.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400">{percentage.toFixed(1)}% of total downloads</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">New software "Discord" was added to Productivity category</span>
              <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Category "Games" updated with new description</span>
              <span className="text-gray-500 text-sm ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">System settings updated by admin</span>
              <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};