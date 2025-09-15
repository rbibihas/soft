import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Move, 
  Eye, 
  EyeOff,
  GripVertical
} from 'lucide-react';
import * as Icons from 'lucide-react';

export const MenuManagement: React.FC = () => {
  const { menuItems, updateMenuItems } = useAdmin();
  const [items, setItems] = useState(menuItems);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSave = () => {
    updateMenuItems(items);
    alert('Menu saved successfully!');
  };

  const toggleVisibility = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = items.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < items.length - 1)
    ) {
      const newItems = [...items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      
      // Update order numbers
      newItems.forEach((item, idx) => {
        item.order = idx + 1;
      });
      
      setItems(newItems);
    }
  };

  const availableIcons = [
    'Home', 'Gamepad2', 'Briefcase', 'Video', 'Code2', 'ShieldCheck', 'Wrench',
    'Music', 'Camera', 'Palette', 'Database', 'Globe', 'Smartphone',
    'Laptop', 'Monitor', 'Headphones', 'Mic', 'Settings', 'Tool', 'Star',
    'Heart', 'Download', 'Upload', 'Search', 'Filter', 'Menu', 'Grid'
  ];

  const AddEditModal = ({ item, onClose, onSave }: any) => {
    const [formData, setFormData] = useState(
      item || { id: '', label: '', path: '', icon: 'Home', visible: true }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newItem = {
        ...formData,
        id: formData.id || formData.label.toLowerCase().replace(/\s+/g, '-'),
        order: item ? item.order : items.length + 1
      };

      if (item) {
        setItems(items.map(i => i.id === item.id ? newItem : i));
      } else {
        setItems([...items, newItem]);
      }
      
      onSave();
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl">
          <div className="border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {item ? 'Edit Menu Item' : 'Add Menu Item'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Path</label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="/path/to/page"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">Select Icon</label>
              <div className="grid grid-cols-8 gap-3 max-h-48 overflow-y-auto">
                {availableIcons.map((iconName) => {
                  const IconComponent = (Icons as any)[iconName] || Icons.Home;
                  const isSelected = formData.icon === iconName;
                  
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: iconName })}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-500 bg-blue-600/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="visible" className="text-gray-300">Visible in menu</label>
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
                {item ? 'Update' : 'Add'} Menu Item
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
            <h1 className="text-3xl font-bold text-white mb-2">Menu Management</h1>
            <p className="text-gray-400">Customize your website navigation menu</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Item</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Menu</span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Menu Items</h2>
            <p className="text-gray-400 text-sm mt-1">Drag to reorder, toggle visibility, or edit items</p>
          </div>

          <div className="divide-y divide-gray-700">
            {items.map((item, index) => {
              const IconComponent = (Icons as any)[item.icon] || Icons.Home;
              
              return (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={index === items.length - 1}
                        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ↓
                      </button>
                    </div>
                    
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium">{item.label}</h3>
                      <p className="text-gray-400 text-sm">{item.path}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Order: {item.order}</span>
                    
                    <button
                      onClick={() => toggleVisibility(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.visible 
                          ? 'text-green-400 hover:text-green-300' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title={item.visible ? 'Hide from menu' : 'Show in menu'}
                    >
                      {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Edit item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete item"
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
        {(showAddModal || editingItem) && (
          <AddEditModal
            item={editingItem}
            onClose={() => {
              setShowAddModal(false);
              setEditingItem(null);
            }}
            onSave={() => {}}
          />
        )}
      </div>
    </AdminLayout>
  );
};