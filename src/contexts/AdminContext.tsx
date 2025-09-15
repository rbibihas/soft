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
  seoSettings: SEOSettings;
  updateSEOSettings: (settings: Partial<SEOSettings>) => void;
  appearanceSettings: AppearanceSettings;
  updateAppearanceSettings: (settings: Partial<AppearanceSettings>) => void;
  adminProfile: AdminProfile;
  updateAdminProfile: (profile: Partial<AdminProfile>) => void;
  menuItems: MenuItem[];
  updateMenuItems: (items: MenuItem[]) => void;
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
  enableComments: boolean;
  enableNewsletter: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  backupFrequency: string;
  cacheEnabled: boolean;
  compressionEnabled: boolean;
  securityLevel: string;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  googleAdsId: string;
  facebookPixelId: string;
  customHeaderCode: string;
  customFooterCode: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
  structuredDataEnabled: boolean;
  openGraphEnabled: boolean;
  twitterCardEnabled: boolean;
}

interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
  headerHeight: number;
  sidebarWidth: number;
  cardSpacing: number;
  animationSpeed: string;
  theme: 'dark' | 'light' | 'auto';
  layout: 'boxed' | 'full-width';
  headerStyle: 'fixed' | 'static' | 'sticky';
  sidebarStyle: 'fixed' | 'overlay' | 'push';
}

interface AdminProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  loginRedirect: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  lastLogin: string;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  order: number;
  visible: boolean;
  children?: MenuItem[];
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
  enableComments: false,
  enableNewsletter: true,
  maxFileSize: 100,
  allowedFileTypes: ['.exe', '.msi', '.dmg', '.deb', '.rpm', '.zip', '.rar'],
  backupFrequency: 'daily',
  cacheEnabled: true,
  compressionEnabled: true,
  securityLevel: 'medium',
};

const defaultSEOSettings: SEOSettings = {
  metaTitle: 'SoftwareHub - Download Games & Software',
  metaDescription: 'Download the latest games, software, and applications safely and securely.',
  metaKeywords: 'software, games, download, applications, tools',
  googleAnalyticsId: '',
  googleAdsId: '',
  facebookPixelId: '',
  customHeaderCode: '',
  customFooterCode: '',
  robotsTxt: 'User-agent: *\nDisallow: /admin\nAllow: /',
  sitemapEnabled: true,
  structuredDataEnabled: true,
  openGraphEnabled: true,
  twitterCardEnabled: true,
};

const defaultAppearanceSettings: AppearanceSettings = {
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  accentColor: '#10B981',
  backgroundColor: '#111827',
  textColor: '#F9FAFB',
  borderRadius: 8,
  fontSize: 16,
  fontFamily: 'Inter, system-ui, sans-serif',
  headerHeight: 64,
  sidebarWidth: 256,
  cardSpacing: 24,
  animationSpeed: '200ms',
  theme: 'dark',
  layout: 'full-width',
  headerStyle: 'sticky',
  sidebarStyle: 'fixed',
};

const defaultAdminProfile: AdminProfile = {
  name: 'Admin User',
  email: 'admin@softwarehub.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
  role: 'Super Admin',
  loginRedirect: '/admin',
  twoFactorEnabled: false,
  emailNotifications: true,
  lastLogin: new Date().toISOString(),
};

const defaultMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: 'Home', order: 1, visible: true },
  { id: 'games', label: 'Games', path: '/category/games', icon: 'Gamepad2', order: 2, visible: true },
  { id: 'productivity', label: 'Productivity', path: '/category/productivity', icon: 'Briefcase', order: 3, visible: true },
  { id: 'multimedia', label: 'Multimedia', path: '/category/multimedia', icon: 'Video', order: 4, visible: true },
  { id: 'development', label: 'Development', path: '/category/development', icon: 'Code2', order: 5, visible: true },
  { id: 'security', label: 'Security', path: '/category/security', icon: 'ShieldCheck', order: 6, visible: true },
  { id: 'utilities', label: 'Utilities', path: '/category/utilities', icon: 'Wrench', order: 7, visible: true },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [software, setSoftware] = useState<Software[]>(initialSoftware);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(defaultAppearanceSettings);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(defaultAdminProfile);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setAdminProfile(prev => ({ ...prev, lastLogin: new Date().toISOString() }));
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
    setSoftware(prev => prev.filter(item => item.category !== id));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateSEOSettings = (newSettings: Partial<SEOSettings>) => {
    setSEOSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateAppearanceSettings = (newSettings: Partial<AppearanceSettings>) => {
    setAppearanceSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateAdminProfile = (newProfile: Partial<AdminProfile>) => {
    setAdminProfile(prev => ({ ...prev, ...newProfile }));
  };

  const updateMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
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
      seoSettings,
      updateSEOSettings,
      appearanceSettings,
      updateAppearanceSettings,
      adminProfile,
      updateAdminProfile,
      menuItems,
      updateMenuItems,
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