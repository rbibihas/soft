import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SoftwarePage } from './pages/SoftwarePage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SoftwareManagement } from './pages/admin/SoftwareManagement';
import { CategoryManagement } from './pages/admin/CategoryManagement';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminUsers } from './pages/admin/AdminUsers';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/software/:id" element={
              <>
                <Header />
                <SoftwarePage />
                <Footer />
              </>
            } />
            <Route path="/category/:category" element={
              <>
                <Header />
                <CategoryPage />
                <Footer />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/software" element={<SoftwareManagement />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;