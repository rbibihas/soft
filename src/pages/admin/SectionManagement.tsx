import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Move, 
  Eye, 
  EyeOff,
  GripVertical,
  Layout,
  Type,
  Image,
  Video,
  Code,
  Grid,
  Columns,
  Save,
  Settings
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  type: 'hero' | 'features' | 'gallery' | 'text' | 'video' | 'custom';
  visible: boolean;
  order: number;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    video?: string;
    customCode?: string;
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
  settings: {
    fullWidth: boolean;
    containerMaxWidth: string;
    backgroundType: 'color' | 'gradient' | 'image';
    backgroundValue: string;
    animation: string;
  };
}

export const SectionManagement: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      name: 'Hero Section',
      type: 'hero',
      visible: true,
      order: 1,
      content: {
        title: 'Download Hub',
        subtitle: 'Your one-stop destination for digital downloads',
        description: 'Discover and download the latest games, software, and applications.',
        image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
        backgroundColor: '#1f2937',
        textColor: '#ffffff'
      },
      settings: {
        fullWidth: true,
        containerMaxWidth: '1200px',
        backgroundType: 'gradient',
        backgroundValue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        animation: 'fadeInUp'
      }
    },
    {
      id: '2',
      name: 'Featured Downloads',
      type: 'features',
      visible: true,
      order: 2,
      content: {
        title: 'Featured Downloads',
        subtitle: 'Hand-picked software and games for you',
        backgroundColor: '#111827',
        textColor: '#ffffff'
      },
      settings: {
        fullWidth: false,
        containerMaxWidth: '1200px',
        backgroundType: 'color',
        backgroundValue: '#111827',
        animation: 'fadeIn'
      }
    },
    {
      id: '3',
      name: 'Categories',
      type: 'gallery',
      visible: true,
      order: 3,
      content: {
        title: 'Browse Categories',
        subtitle: 'Explore software by category',
        backgroundColor: '#1f2937',
        textColor: '#ffffff'
      },
      settings: {
        fullWidth: false,
        containerMaxWidth: '1200px',
        backgroundType: 'color',
        backgroundValue: '#1f2937',
        animation: 'slideInUp'
      }
    }
  ]);

  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const sectionTypes = [
    { id: 'hero', name: 'Hero Section', icon: Layout, description: 'Large banner with title and CTA' },
    { id: 'features', name: 'Features Grid', icon: Grid, description: 'Grid layout for showcasing items' },
    { id: 'gallery', name: 'Gallery', icon: Image, description: 'Image gallery or card grid' },
    { id: 'text', name: 'Text Block', icon: Type, description: 'Rich text content area' },
    { id: 'video', name: 'Video Section', icon: Video, description: 'Video player with content' },
    { id: 'custom', name: 'Custom HTML', icon: Code, description: 'Custom HTML/CSS code' }
  ];

  const animations = [
    'fadeIn', 'fadeInUp', 'fadeInDown', 'slideInLeft', 'slideInRight', 
    'slideInUp', 'slideInDown', 'zoomIn', 'bounceIn', 'none'
  ];

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(section => section.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < sections.length - 1)
    ) {
      const newSections = [...sections];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      
      // Update order numbers
      newSections.forEach((section, idx) => {
        section.order = idx + 1;
      });
      
      setSections(newSections);
    }
  };

  const toggleVisibility = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, visible: !section.visible } : section
    ));
  };

  const deleteSection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const SectionModal = ({ section, onClose }: { section?: Section | null; onClose: () => void }) => {
    const [formData, setFormData] = useState<Section>(
      section || {
        id: '',
        name: '',
        type: 'hero',
        visible: true,
        order: sections.length + 1,
        content: {
          title: '',
          subtitle: '',
          description: '',
          backgroundColor: '#1f2937',
          textColor: '#ffffff'
        },
        settings: {
          fullWidth: false,
          containerMaxWidth: '1200px',
          backgroundType: 'color',
          backgroundValue: '#1f2937',
          animation: 'fadeIn'
        }
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newSection = {
        ...formData,
        id: formData.id || Date.now().toString()
      };

      if (section) {
        setSections(sections.map(s => s.id === section.id ? newSection : s));
      } else {
        setSections([...sections, newSection]);
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {section ? 'Edit Section' : 'Add New Section'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Section Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Section Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Section['type'] })}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  {sectionTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Content</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.content.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, title: e.target.value }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.content.subtitle || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, subtitle: e.target.value }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.content.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    content: { ...formData.content, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {formData.type === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Custom HTML/CSS</label>
                  <textarea
                    value={formData.content.customCode || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, customCode: e.target.value }
                    })}
                    rows={8}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none font-mono text-sm"
                    placeholder="<div>Your custom HTML here</div>"
                  />
                </div>
              )}
            </div>

            {/* Design Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Design Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Type</label>
                  <select
                    value={formData.settings.backgroundType}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, backgroundType: e.target.value as 'color' | 'gradient' | 'image' }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="color">Solid Color</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Background Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Value</label>
                  <input
                    type="text"
                    value={formData.settings.backgroundValue}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, backgroundValue: e.target.value }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="#1f2937 or url(...)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Animation</label>
                  <select
                    value={formData.settings.animation}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, animation: e.target.value }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  >
                    {animations.map(anim => (
                      <option key={anim} value={anim}>{anim}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.content.textColor || '#ffffff'}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, textColor: e.target.value }
                      })}
                      className="w-12 h-12 rounded-lg border border-gray-600 bg-gray-700"
                    />
                    <input
                      type="text"
                      value={formData.content.textColor || '#ffffff'}
                      onChange={(e) => setFormData({
                        ...formData,
                        content: { ...formData.content, textColor: e.target.value }
                      })}
                      className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Container Max Width</label>
                  <input
                    type="text"
                    value={formData.settings.containerMaxWidth}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, containerMaxWidth: e.target.value }
                    })}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="1200px"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.settings.fullWidth}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, fullWidth: e.target.checked }
                    })}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Full Width Section</span>
                </label>

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
                {section ? 'Update Section' : 'Add Section'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Section Management</h1>
            <p className="text-gray-400">Design and manage your website sections like Elementor</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Section</span>
            </button>
          </div>
        </div>

        {/* Section Types */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {sectionTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setEditingSection({
                    id: '',
                    name: type.name,
                    type: type.id as Section['type'],
                    visible: true,
                    order: sections.length + 1,
                    content: { backgroundColor: '#1f2937', textColor: '#ffffff' },
                    settings: {
                      fullWidth: false,
                      containerMaxWidth: '1200px',
                      backgroundType: 'color',
                      backgroundValue: '#1f2937',
                      animation: 'fadeIn'
                    }
                  });
                }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all duration-200 text-center group"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-medium text-sm">{type.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{type.description}</p>
              </button>
            );
          })}
        </div>

        {/* Sections List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Website Sections</h2>
            <p className="text-gray-400 text-sm mt-1">Drag to reorder, toggle visibility, or edit sections</p>
          </div>

          <div className="divide-y divide-gray-700">
            {sections.map((section, index) => {
              const TypeIcon = sectionTypes.find(t => t.id === section.type)?.icon || Layout;
              
              return (
                <div key={section.id} className="p-6 flex items-center justify-between hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ↓
                      </button>
                    </div>
                    
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium">{section.name}</h3>
                      <p className="text-gray-400 text-sm">{section.type} • Order: {section.order}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleVisibility(section.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        section.visible 
                          ? 'text-green-400 hover:text-green-300' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title={section.visible ? 'Hide section' : 'Show section'}
                    >
                      {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => setEditingSection(section)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Edit section"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingSection) && (
          <SectionModal
            section={editingSection}
            onClose={() => {
              setShowAddModal(false);
              setEditingSection(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
};