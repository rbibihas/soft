import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { X, Upload, Plus, Trash2, FileText } from 'lucide-react';
import { Software } from '../../types';

interface AddSoftwareModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSoftware?: Software | null;
}

export const AddSoftwareModal: React.FC<AddSoftwareModalProps> = ({ 
  isOpen, 
  onClose, 
  editingSoftware 
}) => {
  const { categories, addSoftware, updateSoftware } = useAdmin();
  const [formData, setFormData] = useState<Partial<Software>>({
    title: '',
    category: categories[0]?.id || '',
    description: '',
    fullDescription: '',
    version: '',
    size: '',
    developer: '',
    releaseDate: new Date().toISOString().split('T')[0],
    requirements: [''],
    features: [''],
    screenshots: [],
    image: '',
    downloadUrl: '#',
    rating: 4.0,
    downloads: 0,
    tags: ['']
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [downloadFiles, setDownloadFiles] = useState<File[]>([]);

  useEffect(() => {
    if (editingSoftware) {
      setFormData(editingSoftware);
      setImagePreview(editingSoftware.image);
    } else {
      setFormData({
        title: '',
        category: categories[0]?.id || '',
        description: '',
        fullDescription: '',
        version: '',
        size: '',
        developer: '',
        releaseDate: new Date().toISOString().split('T')[0],
        requirements: [''],
        features: [''],
        screenshots: [],
        image: '',
        downloadUrl: '#',
        rating: 4.0,
        downloads: 0,
        tags: ['']
      });
      setImagePreview('');
      setDownloadFiles([]);
    }
  }, [editingSoftware, categories]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDownloadFiles(prev => [...prev, ...files]);
  };

  const removeDownloadFile = (index: number) => {
    setDownloadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleArrayChange = (field: 'requirements' | 'features' | 'tags', index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'requirements' | 'features' | 'tags') => {
    const newArray = [...(formData[field] || []), ''];
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: 'requirements' | 'features' | 'tags', index: number) => {
    const newArray = (formData[field] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const softwareData: Software = {
      id: editingSoftware?.id || Date.now().toString(),
      title: formData.title!,
      category: formData.category!,
      description: formData.description!,
      fullDescription: formData.fullDescription!,
      version: formData.version!,
      size: formData.size!,
      developer: formData.developer!,
      releaseDate: formData.releaseDate!,
      requirements: (formData.requirements || []).filter(r => r.trim() !== ''),
      features: (formData.features || []).filter(f => f.trim() !== ''),
      screenshots: formData.screenshots || [],
      image: formData.image!,
      downloadUrl: formData.downloadUrl!,
      rating: formData.rating!,
      downloads: formData.downloads!,
      tags: (formData.tags || []).filter(t => t.trim() !== '')
    };

    if (editingSoftware) {
      updateSoftware(editingSoftware.id, softwareData);
    } else {
      addSoftware(softwareData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingSoftware ? 'Edit Software' : 'Add New Software'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              >
                {categories.filter(cat => cat.type === 'subcategory').map(cat => {
                  const parent = categories.find(p => p.id === cat.parentId);
                  return (
                    <option key={cat.id} value={cat.id}>
                      {parent?.name} - {cat.name}
                    </option>
                  );
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Developer</label>
              <input
                type="text"
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Version</label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">File Size</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., 2.5 GB"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Release Date</label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Downloads</label>
              <input
                type="number"
                min="0"
                value={formData.downloads}
                onChange={(e) => setFormData({ ...formData, downloads: parseInt(e.target.value) })}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Main Image</label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
                />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                />
              )}
            </div>
          </div>

          {/* Download Files Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Download Files</label>
            <input
              type="file"
              multiple
              onChange={handleDownloadFilesUpload}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:cursor-pointer"
            />
            {downloadFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Uploaded Files:</h4>
                {downloadFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <span className="text-white">{file.name}</span>
                      <span className="text-gray-400 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDownloadFile(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Short Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Description</label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              rows={4}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Dynamic Arrays */}
          {(['requirements', 'features', 'tags'] as const).map((field) => (
            <div key={field}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300 capitalize">{field}</label>
                <button
                  type="button"
                  onClick={() => addArrayItem(field)}
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="space-y-2">
                {(formData[field] || []).map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange(field, index, e.target.value)}
                      className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                      placeholder={`Enter ${field.slice(0, -1)}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(field, index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Buttons */}
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
              {editingSoftware ? 'Update Software' : 'Add Software'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};