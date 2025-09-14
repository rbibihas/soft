import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
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
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/software" element={<ProtectedRoute><SoftwareManagement /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;