import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import FranchisesPage from './pages/FranchisesPage';
import InvestorsPage from './pages/InvestorsPage';
import AdvisorsPage from './pages/AdvisorsPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSearch={setSearchQuery} theme={theme} toggleTheme={toggleTheme} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/company/:id" element={<CompanyDetailPage />} />
          <Route path="/franchises" element={<FranchisesPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/advisors" element={<AdvisorsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
