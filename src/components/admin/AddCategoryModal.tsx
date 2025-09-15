import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../../types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory?: Category | null;
}

const availableIcons = [
  'Folder', 'Gamepad2', 'Briefcase', 'Video', 'Code2', 'ShieldCheck', 'Wrench',
  'Music', 'Camera', 'Palette', 'Database', 'Globe', 'Smartphone',
  'Laptop', 'Monitor', 'Headphones', 'Mic', 'Settings', 'Tool'
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  editingCategory 
}) => {
  const { addCategory, updateCategory } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Folder'
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
        icon: editingCategory.icon
      });
    } else {
      setFormData({ name: '', description: '', icon: 'Folder' });
    }
  }, [editingCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData: Category = {
      id: editingCategory?.id || formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      count: editingCategory?.count || 0
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl">
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              placeholder="Enter category description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">Select Icon</label>
            <div className="grid grid-cols-6 gap-3">
              {availableIcons.map((iconName) => {
                const IconComponent = (Icons as any)[iconName] || Icons.Folder;
                const isSelected = formData.icon === iconName;
                
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-500 bg-blue-600/20'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </button>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm mt-2">Selected: {formData.icon}</p>
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
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};