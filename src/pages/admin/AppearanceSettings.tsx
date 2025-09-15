import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Save, 
  Palette, 
  Layout, 
  Type, 
  Sliders,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Move,
  Grid,
  Sidebar
} from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const { appearanceSettings, updateAppearanceSettings } = useAdmin();
  const [formData, setFormData] = useState(appearanceSettings);
  const [activeTab, setActiveTab] = useState('colors');

  const handleSave = () => {
    updateAppearanceSettings(formData);
    alert('Appearance settings saved successfully!');
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'components', label: 'Components', icon: Grid },
    { id: 'responsive', label: 'Responsive', icon: Monitor },
  ];

  const colorPresets = [
    { name: 'Blue Ocean', primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981' },
    { name: 'Purple Night', primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B' },
    { name: 'Green Forest', primary: '#10B981', secondary: '#059669', accent: '#3B82F6' },
    { name: 'Orange Sunset', primary: '#F59E0B', secondary: '#EF4444', accent: '#8B5CF6' },
  ];

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setFormData({
      ...formData,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Appearance Settings</h1>
            <p className="text-gray-400">Customize the look and feel of your website</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
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
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Color Scheme</h2>
                  
                  {/* Color Presets */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Presets</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => applyColorPreset(preset)}
                          className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <div className="flex space-x-2 mb-2">
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: preset.primary }}
                            />
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: preset.secondary }}
                            />
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: preset.accent }}
                            />
                          </div>
                          <p className="text-white text-sm font-medium">{preset.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.accentColor}
                          onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={formData.accentColor}
                          onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.backgroundColor}
                          onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={formData.backgroundColor}
                          onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'layout' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Layout Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Layout Type
                      </label>
                      <select
                        value={formData.layout}
                        onChange={(e) => setFormData({...formData, layout: e.target.value as 'boxed' | 'full-width'})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="full-width">Full Width</option>
                        <option value="boxed">Boxed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Header Style
                      </label>
                      <select
                        value={formData.headerStyle}
                        onChange={(e) => setFormData({...formData, headerStyle: e.target.value as any})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="sticky">Sticky</option>
                        <option value="fixed">Fixed</option>
                        <option value="static">Static</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Header Height (px)
                      </label>
                      <input
                        type="number"
                        min="40"
                        max="120"
                        value={formData.headerHeight}
                        onChange={(e) => setFormData({...formData, headerHeight: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Spacing (px)
                      </label>
                      <input
                        type="number"
                        min="8"
                        max="48"
                        value={formData.cardSpacing}
                        onChange={(e) => setFormData({...formData, cardSpacing: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Border Radius (px)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={formData.borderRadius}
                        onChange={(e) => setFormData({...formData, borderRadius: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Animation Speed
                      </label>
                      <select
                        value={formData.animationSpeed}
                        onChange={(e) => setFormData({...formData, animationSpeed: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="100ms">Fast (100ms)</option>
                        <option value="200ms">Normal (200ms)</option>
                        <option value="300ms">Slow (300ms)</option>
                        <option value="500ms">Very Slow (500ms)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Typography</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Font Family
                      </label>
                      <select
                        value={formData.fontFamily}
                        onChange={(e) => setFormData({...formData, fontFamily: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Inter, system-ui, sans-serif">Inter</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Open Sans, sans-serif">Open Sans</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                        <option value="Montserrat, sans-serif">Montserrat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Base Font Size (px)
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="24"
                        value={formData.fontSize}
                        onChange={(e) => setFormData({...formData, fontSize: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Typography Preview</h3>
                    <div className="space-y-4" style={{ fontFamily: formData.fontFamily, fontSize: `${formData.fontSize}px` }}>
                      <h1 className="text-3xl font-bold text-white">Heading 1</h1>
                      <h2 className="text-2xl font-semibold text-white">Heading 2</h2>
                      <h3 className="text-xl font-medium text-white">Heading 3</h3>
                      <p className="text-gray-300">This is a paragraph of body text to show how the typography looks with your current settings.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'components' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Component Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-white font-medium mb-4">Button Styles</h3>
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                          Primary Button
                        </button>
                        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                          Secondary Button
                        </button>
                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                          Success Button
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-white font-medium mb-4">Card Styles</h3>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                        <h4 className="text-white font-medium mb-2">Sample Card</h4>
                        <p className="text-gray-300 text-sm">This is how cards will appear with your current settings.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'responsive' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Responsive Design</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 rounded-lg p-6 text-center">
                      <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Desktop</h3>
                      <p className="text-gray-300 text-sm">1200px and above</p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6 text-center">
                      <Tablet className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Tablet</h3>
                      <p className="text-gray-300 text-sm">768px - 1199px</p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6 text-center">
                      <Smartphone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Mobile</h3>
                      <p className="text-gray-300 text-sm">Below 768px</p>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-blue-300">
                      Your website automatically adapts to different screen sizes. Use the preview feature to test responsiveness.
                    </p>
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