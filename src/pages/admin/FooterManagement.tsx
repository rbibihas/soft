import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Link, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Eye,
  Settings
} from 'lucide-react';

interface FooterLink {
  id: string;
  label: string;
  url: string;
  openInNewTab: boolean;
}

interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
  visible: boolean;
  order: number;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  visible: boolean;
}

interface FooterSettings {
  companyName: string;
  description: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  copyright: string;
  showSocialLinks: boolean;
  showNewsletter: boolean;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  borderColor: string;
}

export const FooterManagement: React.FC = () => {
  const [footerColumns, setFooterColumns] = useState<FooterColumn[]>([
    {
      id: '1',
      title: 'Categories',
      visible: true,
      order: 1,
      links: [
        { id: '1', label: 'Games', url: '/category/games', openInNewTab: false },
        { id: '2', label: 'Productivity', url: '/category/productivity', openInNewTab: false },
        { id: '3', label: 'Multimedia', url: '/category/multimedia', openInNewTab: false },
        { id: '4', label: 'Development', url: '/category/development', openInNewTab: false }
      ]
    },
    {
      id: '2',
      title: 'Support',
      visible: true,
      order: 2,
      links: [
        { id: '5', label: 'Help Center', url: '/help', openInNewTab: false },
        { id: '6', label: 'Download Guide', url: '/guide', openInNewTab: false },
        { id: '7', label: 'Contact Us', url: '/contact', openInNewTab: false },
        { id: '8', label: 'Report Issue', url: '/report', openInNewTab: false }
      ]
    },
    {
      id: '3',
      title: 'Legal',
      visible: true,
      order: 3,
      links: [
        { id: '9', label: 'Privacy Policy', url: '/privacy', openInNewTab: false },
        { id: '10', label: 'Terms of Service', url: '/terms', openInNewTab: false },
        { id: '11', label: 'Cookie Policy', url: '/cookies', openInNewTab: false },
        { id: '12', label: 'DMCA', url: '/dmca', openInNewTab: false }
      ]
    }
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', visible: true },
    { id: '2', platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', visible: true },
    { id: '3', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', visible: true },
    { id: '4', platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', visible: false },
    { id: '5', platform: 'GitHub', url: 'https://github.com', icon: 'Github', visible: true },
    { id: '6', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', visible: false }
  ]);

  const [footerSettings, setFooterSettings] = useState<FooterSettings>({
    companyName: 'SoftwareHub',
    description: 'Your trusted destination for downloading the latest games, software, and applications. Safe, fast, and reliable downloads for all your digital needs.',
    logo: '',
    address: '123 Tech Street, Digital City, DC 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@softwarehub.com',
    copyright: '© 2024 SoftwareHub. All rights reserved.',
    showSocialLinks: true,
    showNewsletter: true,
    backgroundColor: '#111827',
    textColor: '#9CA3AF',
    linkColor: '#3B82F6',
    borderColor: '#374151'
  });

  const [activeTab, setActiveTab] = useState('columns');
  const [editingColumn, setEditingColumn] = useState<FooterColumn | null>(null);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  const handleSave = () => {
    // Save footer configuration
    alert('Footer settings saved successfully!');
  };

  const addColumn = (column: Omit<FooterColumn, 'id'>) => {
    const newColumn: FooterColumn = {
      ...column,
      id: Date.now().toString()
    };
    setFooterColumns([...footerColumns, newColumn]);
  };

  const updateColumn = (id: string, updatedColumn: FooterColumn) => {
    setFooterColumns(footerColumns.map(col => col.id === id ? updatedColumn : col));
  };

  const deleteColumn = (id: string) => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      setFooterColumns(footerColumns.filter(col => col.id !== id));
    }
  };

  const toggleSocialLink = (id: string) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, visible: !link.visible } : link
    ));
  };

  const ColumnModal = ({ column, onClose }: { column?: FooterColumn | null; onClose: () => void }) => {
    const [formData, setFormData] = useState<FooterColumn>(
      column || {
        id: '',
        title: '',
        visible: true,
        order: footerColumns.length + 1,
        links: []
      }
    );

    const addLink = () => {
      const newLink: FooterLink = {
        id: Date.now().toString(),
        label: '',
        url: '',
        openInNewTab: false
      };
      setFormData({
        ...formData,
        links: [...formData.links, newLink]
      });
    };

    const updateLink = (linkId: string, updatedLink: FooterLink) => {
      setFormData({
        ...formData,
        links: formData.links.map(link => link.id === linkId ? updatedLink : link)
      });
    };

    const removeLink = (linkId: string) => {
      setFormData({
        ...formData,
        links: formData.links.filter(link => link.id !== linkId)
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (column) {
        updateColumn(column.id, formData);
      } else {
        addColumn(formData);
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {column ? 'Edit Column' : 'Add New Column'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Column Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">Links</label>
                <button
                  type="button"
                  onClick={addLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Link</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.links.map((link) => (
                  <div key={link.id} className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Link Label"
                        value={link.label}
                        onChange={(e) => updateLink(link.id, { ...link, label: e.target.value })}
                        className="bg-gray-600 text-white border border-gray-500 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLink(link.id, { ...link, url: e.target.value })}
                        className="bg-gray-600 text-white border border-gray-500 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={link.openInNewTab}
                          onChange={(e) => updateLink(link.id, { ...link, openInNewTab: e.target.checked })}
                          className="rounded border-gray-500 bg-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-300 text-sm">Open in new tab</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeLink(link.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300">Visible</span>
              </label>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                {column ? 'Update Column' : 'Add Column'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'columns', label: 'Footer Columns', icon: Link },
    { id: 'social', label: 'Social Links', icon: Facebook },
    { id: 'settings', label: 'Footer Settings', icon: Settings },
    { id: 'preview', label: 'Preview', icon: Eye }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Footer Management</h1>
            <p className="text-gray-400">Customize your website footer content and appearance</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Footer</span>
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
              {activeTab === 'columns' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Footer Columns</h2>
                    <button
                      onClick={() => setShowAddColumnModal(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Column</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {footerColumns.map((column) => (
                      <div key={column.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium">{column.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingColumn(column)}
                              className="text-gray-400 hover:text-blue-400"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteColumn(column.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {column.links.map((link) => (
                            <div key={link.id} className="text-gray-300 text-sm">
                              {link.label} → {link.url}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          {column.links.length} links • {column.visible ? 'Visible' : 'Hidden'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Social Media Links</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialLinks.map((social) => (
                      <div key={social.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">{social.platform[0]}</span>
                            </div>
                            <span className="text-white font-medium">{social.platform}</span>
                          </div>
                          <button
                            onClick={() => toggleSocialLink(social.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              social.visible 
                                ? 'text-green-400 hover:text-green-300' 
                                : 'text-gray-400 hover:text-gray-300'
                            }`}
                          >
                            {social.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => setSocialLinks(socialLinks.map(s => 
                            s.id === social.id ? { ...s, url: e.target.value } : s
                          ))}
                          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none text-sm"
                          placeholder={`${social.platform} URL`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Footer Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={footerSettings.companyName}
                        onChange={(e) => setFooterSettings({...footerSettings, companyName: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={footerSettings.email}
                        onChange={(e) => setFooterSettings({...footerSettings, email: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={footerSettings.phone}
                        onChange={(e) => setFooterSettings({...footerSettings, phone: e.target.value})}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={footerSettings.backgroundColor}
                          onChange={(e) => setFooterSettings({...footerSettings, backgroundColor: e.target.value})}
                          className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <input
                          type="text"
                          value={footerSettings.backgroundColor}
                          onChange={(e) => setFooterSettings({...footerSettings, backgroundColor: e.target.value})}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={footerSettings.description}
                      onChange={(e) => setFooterSettings({...footerSettings, description: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <textarea
                      value={footerSettings.address}
                      onChange={(e) => setFooterSettings({...footerSettings, address: e.target.value})}
                      rows={2}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Copyright Text</label>
                    <input
                      type="text"
                      value={footerSettings.copyright}
                      onChange={(e) => setFooterSettings({...footerSettings, copyright: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Show Social Links</h3>
                        <p className="text-gray-400 text-sm">Display social media icons in footer</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={footerSettings.showSocialLinks}
                          onChange={(e) => setFooterSettings({...footerSettings, showSocialLinks: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Show Newsletter</h3>
                        <p className="text-gray-400 text-sm">Display newsletter signup form</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={footerSettings.showNewsletter}
                          onChange={(e) => setFooterSettings({...footerSettings, showNewsletter: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-white">Footer Preview</h2>
                  
                  <div 
                    className="rounded-lg p-8 border"
                    style={{ 
                      backgroundColor: footerSettings.backgroundColor,
                      color: footerSettings.textColor,
                      borderColor: footerSettings.borderColor
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      {/* Company Info */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">{footerSettings.companyName}</h3>
                        <p className="text-sm mb-4">{footerSettings.description}</p>
                        {footerSettings.showSocialLinks && (
                          <div className="flex space-x-3">
                            {socialLinks.filter(s => s.visible).map(social => (
                              <div key={social.id} className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">{social.platform[0]}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Columns */}
                      {footerColumns.filter(col => col.visible).map(column => (
                        <div key={column.id}>
                          <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
                          <ul className="space-y-2">
                            {column.links.map(link => (
                              <li key={link.id}>
                                <a 
                                  href={link.url} 
                                  className="text-sm hover:text-white transition-colors"
                                  style={{ color: footerSettings.linkColor }}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="border-t mt-8 pt-8" style={{ borderColor: footerSettings.borderColor }}>
                      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-sm">{footerSettings.copyright}</div>
                        <div className="text-sm">Made with ❤️ for developers and gamers</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column Modal */}
        {(showAddColumnModal || editingColumn) && (
          <ColumnModal
            column={editingColumn}
            onClose={() => {
              setShowAddColumnModal(false);
              setEditingColumn(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};