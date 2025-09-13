import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Save, 
  Globe, 
  Palette, 
  Shield, 
  Bell, 
  Database,
  Settings as SettingsIcon
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const [formData, setFormData] = useState(settings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Database },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Configure your application settings</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={formData.siteName}
                        onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={formData.heroTitle}
                        onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={formData.siteDescription}
                      onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hero Subtitle
                    </label>
                    <textarea
                      value={formData.heroSubtitle}
                      onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
                      rows={2}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Appearance Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Featured Items Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.featuredCount}
                        onChange={(e) => setFormData({...formData, featuredCount: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Recent Items Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.recentCount}
                        onChange={(e) => setFormData({...formData, recentCount: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Enable Search</h3>
                        <p className="text-gray-400 text-sm">Allow users to search for software</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.enableSearch}
                          onChange={(e) => setFormData({...formData, enableSearch: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Enable Ratings</h3>
                        <p className="text-gray-400 text-sm">Show rating stars on software items</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.enableRatings}
                          onChange={(e) => setFormData({...formData, enableRatings: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Maintenance Mode</h3>
                        <p className="text-gray-400 text-sm">Temporarily disable the website for maintenance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.maintenanceMode}
                          onChange={(e) => setFormData({...formData, maintenanceMode: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Security Notice</span>
                    </div>
                    <p className="text-yellow-300 text-sm">
                      When maintenance mode is enabled, only administrators can access the website.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Notification Settings</h2>
                  <div className="text-center py-8">
                    <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Notification settings will be available in future updates.</p>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Advanced Settings</h2>
                  <div className="text-center py-8">
                    <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Advanced settings will be available in future updates.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};