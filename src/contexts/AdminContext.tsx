import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Software, Category } from '../types';
import { software as initialSoftware, categories as initialCategories } from '../data/mockData';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  software: Software[];
  categories: Category[];
  addSoftware: (software: Software) => void;
  updateSoftware: (id: string, software: Software) => void;
  deleteSoftware: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Category) => void;
  deleteCategory: (id: string) => void;
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

interface AppSettings {
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredCount: number;
  recentCount: number;
  enableSearch: boolean;
  enableRatings: boolean;
  maintenanceMode: boolean;
}

const defaultSettings: AppSettings = {
  siteName: 'SoftwareHub',
  siteDescription: 'Your trusted destination for downloading games and software',
  heroTitle: 'Download Hub',
  heroSubtitle: 'Discover and download the latest games, software, and applications. Your one-stop destination for digital downloads.',
  featuredCount: 3,
  recentCount: 9,
  enableSearch: true,
  enableRatings: true,
  maintenanceMode: false,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [software, setSoftware] = useState<Software[]>(initialSoftware);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const login = (username: string, password: string): boolean => {
    // Simple demo authentication - in real app, this would be API call
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addSoftware = (newSoftware: Software) => {
    setSoftware(prev => [...prev, newSoftware]);
  };

  const updateSoftware = (id: string, updatedSoftware: Software) => {
    setSoftware(prev => prev.map(item => item.id === id ? updatedSoftware : item));
  };

  const deleteSoftware = (id: string) => {
    setSoftware(prev => prev.filter(item => item.id !== id));
  };

  const addCategory = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updatedCategory: Category) => {
    setCategories(prev => prev.map(cat => cat.id === id ? updatedCategory : cat));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Also remove software in this category
    setSoftware(prev => prev.filter(item => item.category !== id));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      software,
      categories,
      addSoftware,
      updateSoftware,
      deleteSoftware,
      addCategory,
      updateCategory,
      deleteCategory,
      settings,
      updateSettings,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};