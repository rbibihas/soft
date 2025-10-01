import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AddCategoryModal } from '../../components/admin/AddCategoryModal';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, CreditCard as Edit, Trash2, FolderOpen } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../../types';

export const CategoryManagement: React.FC = () => {
  const { categories, software, deleteCategory } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'platforms' | 'subcategories'>('all');

  const getCategoryCount = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category?.type === 'platform') {
      // For platforms, count all software in subcategories
      return software.filter(item => {
        const itemCategory = categories.find(cat => cat.id === item.category);
        return itemCategory?.parentId === categoryId;
      }).length;
    } else {
      // For subcategories, count direct software items
      return software.filter(item => item.category === categoryId).length;
    }
  };

  const handleDelete = (id: string) => {
    const count = getCategoryCount(id);
    const category = categories.find(c => c.id === id);
    const hasSubcategories = categories.some(c => c.parentId === id);
    
    const message = count > 0 
      ? `This will delete the category and ${count} software items. Are you sure?`
      : hasSubcategories
      ? 'This platform has subcategories. Deleting it will also delete all subcategories. Are you sure?'
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded transition-colors text-sm ${
                  viewMode === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setViewMode('platforms')}
                className={`px-4 py-2 rounded transition-colors text-sm ${
                  viewMode === 'platforms' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Platforms
              </button>
              <button
                onClick={() => setViewMode('subcategories')}
                className={`px-4 py-2 rounded transition-colors text-sm ${
                  viewMode === 'subcategories' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Subcategories
              </button>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {viewMode === 'all' && (
            <>
              {/* Platforms */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Platforms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.filter(cat => cat.type === 'platform').map((category) => (
                    <CategoryCard key={category.id} category={category} count={getCategoryCount(category.id)} />
                  ))}
                </div>
              </div>
              
              {/* Subcategories by Platform */}
              {categories.filter(cat => cat.type === 'platform').map((platform) => {
                const subcategories = categories.filter(cat => cat.parentId === platform.id);
                if (subcategories.length === 0) return null;
                
                return (
                  <div key={platform.id}>
                    <h2 className="text-xl font-bold text-white mb-4">{platform.name} - Subcategories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subcategories.map((category) => (
                        <CategoryCard key={category.id} category={category} count={getCategoryCount(category.id)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          
          {viewMode === 'platforms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.filter(cat => cat.type === 'platform').map((category) => (
                <CategoryCard key={category.id} category={category} count={getCategoryCount(category.id)} />
              ))}
            </div>
          )}
          
          {viewMode === 'subcategories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.filter(cat => cat.type === 'subcategory').map((category) => (
                <CategoryCard key={category.id} category={category} count={getCategoryCount(category.id)} />
              ))}
            </div>
          )}
        </div>
        
        {/* Legacy single grid for individual category cards */}
        <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(cat => {
            if (viewMode === 'platforms') return cat.type === 'platform';
            if (viewMode === 'subcategories') return cat.type === 'subcategory';
            return true;
          }).map((category) => {
            const IconComponent = (Icons as any)[category.icon] || FolderOpen;
            const itemCount = getCategoryCount(category.id);
            const parentCategory = category.parentId ? categories.find(c => c.id === category.parentId) : null;
            
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
                {parentCategory && (
                  <p className="text-blue-400 text-sm mb-1">Under: {parentCategory.name}</p>
                )}
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