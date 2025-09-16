import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Save, 
  Search, 
  Globe, 
  Code, 
  BarChart3,
  Facebook,
  Twitter,
  Eye,
  Settings
} from 'lucide-react';

export const SEOManagement: React.FC = () => {
  const { seoSettings, updateSEOSettings } = useAdmin();
  const [formData, setFormData] = useState(seoSettings);
  const [activeTab, setActiveTab] = useState('meta');

  const handleSave = () => {
    updateSEOSettings(formData);
    alert('SEO settings saved successfully!');
  };

  const tabs = [
    { id: 'meta', label: 'Meta Tags', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Facebook },
    { id: 'custom', label: 'Custom Code', icon: Code },
    { id: 'advanced', label: 'Advanced', icon: Settings },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">SEO Management</h1>
            <p className="text-gray-400">Optimize your website for search engines and social media</p>
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
              {activeTab === 'meta' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Meta Tags & SEO</h2>
                  
                  <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-6">
                    <h3 className="text-blue-400 font-medium mb-2">SEO Score: 85/100</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-blue-300 text-sm mt-2">Good! Your SEO is well optimized.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="Your website title"
                    />
                    <p className="text-gray-400 text-xs mt-1">Recommended: 50-60 characters</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Preview in Search Results</h4>
                    <div className="bg-white rounded p-3">
                      <div className="text-blue-600 text-lg font-medium">{formData.metaTitle || 'Your Page Title'}</div>
                      <div className="text-green-600 text-sm">https://yoursite.com</div>
                      <div className="text-gray-600 text-sm mt-1">{formData.metaDescription || 'Your meta description will appear here...'}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="Brief description of your website"
                    />
                    <p className="text-gray-400 text-xs mt-1">Recommended: 150-160 characters</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Focus Keyword
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="software download"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Canonical URL
                      </label>
                      <input
                        type="url"
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="https://yoursite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.metaKeywords}
                      onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Schema Markup Type
                    </label>
                    <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                      <option value="website">Website</option>
                      <option value="organization">Organization</option>
                      <option value="softwareApplication">Software Application</option>
                      <option value="product">Product</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Robots.txt Content
                    </label>
                    <textarea
                      value={formData.robotsTxt}
                      onChange={(e) => setFormData({...formData, robotsTxt: e.target.value})}
                      rows={5}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none font-mono text-sm"
                    />
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium mb-2">SEO Tips</h4>
                    <ul className="text-green-300 text-sm space-y-1">
                      <li>• Keep your title under 60 characters</li>
                      <li>• Include your focus keyword in the title and description</li>
                      <li>• Write compelling meta descriptions to improve click-through rates</li>
                      <li>• Use robots.txt to control search engine crawling</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Analytics & Tracking</h2>
                  
                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                    <h3 className="text-yellow-400 font-medium mb-2">Privacy Compliance</h3>
                    <p className="text-yellow-300 text-sm">Ensure you have proper cookie consent and privacy policies when using tracking codes.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={formData.googleAnalyticsId}
                      onChange={(e) => setFormData({...formData, googleAnalyticsId: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Google Tag Manager ID
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Google Ads ID
                    </label>
                    <input
                      type="text"
                      value={formData.googleAdsId}
                      onChange={(e) => setFormData({...formData, googleAdsId: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="AW-XXXXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Microsoft Clarity ID
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hotjar Site ID
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={formData.facebookPixelId}
                      onChange={(e) => setFormData({...formData, facebookPixelId: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      placeholder="XXXXXXXXXXXXXXX"
                    />
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">Analytics Setup Guide</h4>
                    <div className="text-blue-300 text-sm space-y-2">
                      <p><strong>Google Analytics:</strong> Create a GA4 property and copy the Measurement ID</p>
                      <p><strong>Google Ads:</strong> Find your conversion ID in Google Ads dashboard</p>
                      <p><strong>Facebook Pixel:</strong> Create a pixel in Facebook Business Manager</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Social Media Integration</h2>
                  
                  <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-4 mb-6">
                    <h3 className="text-purple-400 font-medium mb-2">Social Media Preview</h3>
                    <p className="text-purple-300 text-sm">Configure how your content appears when shared on social platforms.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Open Graph Tags</h3>
                        <p className="text-gray-400 text-sm">Enable Facebook sharing optimization</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.openGraphEnabled}
                          onChange={(e) => setFormData({...formData, openGraphEnabled: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Twitter Cards</h3>
                        <p className="text-gray-400 text-sm">Enable Twitter sharing optimization</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.twitterCardEnabled}
                          onChange={(e) => setFormData({...formData, twitterCardEnabled: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Open Graph Image
                      </label>
                      <input
                        type="url"
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="https://yoursite.com/og-image.jpg"
                      />
                      <p className="text-gray-400 text-xs mt-1">Recommended: 1200x630px</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Twitter Card Type
                      </label>
                      <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                        <option value="summary">Summary</option>
                        <option value="summary_large_image">Summary Large Image</option>
                        <option value="app">App</option>
                        <option value="player">Player</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Social Media Preview</h4>
                    <div className="bg-white rounded p-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-gray-300 rounded"></div>
                        <div className="flex-1">
                          <div className="text-gray-900 font-medium">Your Page Title</div>
                          <div className="text-gray-600 text-sm">Your meta description appears here...</div>
                          <div className="text-gray-500 text-xs mt-1">yoursite.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'custom' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Custom Code</h2>
                  
                  <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 mb-6">
                    <h3 className="text-red-400 font-medium mb-2">⚠️ Advanced Users Only</h3>
                    <p className="text-red-300 text-sm">Only add code if you know what you're doing. Invalid code can break your website.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom Header Code
                    </label>
                    <textarea
                      value={formData.customHeaderCode}
                      onChange={(e) => setFormData({...formData, customHeaderCode: e.target.value})}
                      rows={8}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none font-mono text-sm"
                      placeholder="<!-- Custom header code goes here -->"
                    />
                    <p className="text-gray-400 text-xs mt-1">This code will be inserted in the &lt;head&gt; section</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom Footer Code
                    </label>
                    <textarea
                      value={formData.customFooterCode}
                      onChange={(e) => setFormData({...formData, customFooterCode: e.target.value})}
                      rows={8}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none font-mono text-sm"
                      placeholder="<!-- Custom footer code goes here -->"
                    />
                    <p className="text-gray-400 text-xs mt-1">This code will be inserted before the closing &lt;/body&gt; tag</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Common Use Cases</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Google Analytics or other tracking codes</li>
                      <li>• Custom CSS for styling overrides</li>
                      <li>• Third-party widget scripts</li>
                      <li>• Custom JavaScript functionality</li>
                      <li>• Verification codes for search engines</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Advanced SEO Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Breadcrumb Schema
                      </label>
                      <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image Alt Text Auto-Generation
                      </label>
                      <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">XML Sitemap</h3>
                        <p className="text-gray-400 text-sm">Automatically generate XML sitemap</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sitemapEnabled}
                          onChange={(e) => setFormData({...formData, sitemapEnabled: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Structured Data</h3>
                        <p className="text-gray-400 text-sm">Enable JSON-LD structured data markup</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.structuredDataEnabled}
                          onChange={(e) => setFormData({...formData, structuredDataEnabled: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Robots Meta Tags
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex', 'notranslate'].map(tag => (
                        <label key={tag} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-300 text-sm">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hreflang Tags (Multi-language)
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none font-mono text-sm"
                      placeholder={`<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="x-default" href="https://example.com" />`}
                    />
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