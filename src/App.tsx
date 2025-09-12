import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SoftwarePage } from './pages/SoftwarePage';
import { CategoryPage } from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/software/:id" element={<SoftwarePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;