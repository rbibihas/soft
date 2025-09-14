import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AddCategoryModal } from '../../components/admin/AddCategoryModal';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../../types';

export const CategoryManagement: React.FC = () => {
  const { categories, software, deleteCategory } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const getCategoryCount = (categoryId: string) => {
    return software.filter(item => item.category === categoryId).length;
  };

  const handleDelete = (id: string) => {
    const count = getCategoryCount(id);
    const message = count > 0 
      ? `This will delete the category and ${count} software items. Are you sure?`
      : 'Are you sure you want to delete this category?';
    
    if (window.confirm(message)) {
      deleteCategory(id);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Category Management</h1>
            <p className="text-gray-400">Organize your software collection with categories</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = (Icons as any)[category.icon] || FolderOpen;
            const itemCount = getCategoryCount(category.id);
            
            return (
              <div key={category.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-400">{itemCount}</span>
                  <span className="text-gray-400 text-sm">items</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add empty state if no categories */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Categories Yet</h3>
            <p className="text-gray-400 mb-6">Create your first category to organize your software collection.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Create Category
            </button>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AddCategoryModal
          isOpen={showAddModal || editingCategory !== null}
          onClose={() => {
            setShowAddModal(false);
            setEditingCategory(null);
          }}
          editingCategory={editingCategory}
        />
      </div>
    </AdminLayout>
  );
};