import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AddSoftwareModal } from '../../components/admin/AddSoftwareModal';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  Download,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { Software } from '../../types';

export const SoftwareManagement: React.FC = () => {
  const { software, categories, deleteSoftware } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | null>(null);

  const filteredSoftware = software.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this software?')) {
      deleteSoftware(id);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Software Management</h1>
            <p className="text-gray-400">Manage all software items in your collection</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Software</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Software List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Software</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Version</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Rating</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Downloads</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSoftware.map((item) => (
                  <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.developer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">v{item.version}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{item.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Download className="w-4 h-4" />
                        <span>{item.downloads.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => window.open(`/software/${item.id}`, '_blank')}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingSoftware(item)}
                          className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredSoftware.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No software found matching your criteria.</p>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AddSoftwareModal
          isOpen={showAddModal || editingSoftware !== null}
          onClose={() => {
            setShowAddModal(false);
            setEditingSoftware(null);
          }}
          editingSoftware={editingSoftware}
        />
      </div>
    </AdminLayout>
  );
};