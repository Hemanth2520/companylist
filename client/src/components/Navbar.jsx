import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiBriefcase, FiTrendingUp, FiUsers, FiMapPin, FiMenu, FiX, FiSun, FiMoon
} from 'react-icons/fi';

export default function Navbar({ onSearch, theme, toggleTheme }) {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">CompanyList</Link>

          <div className="navbar__nav">
            <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} end>
              Businesses
            </NavLink>
            <NavLink to="/?type=Investment+Opportunity" className="navbar__link">
              Investments
            </NavLink>
            <NavLink to="/franchises" className="navbar__link">Franchises</NavLink>
            <NavLink to="/investors" className="navbar__link">Investors</NavLink>
            <NavLink to="/advisors" className="navbar__link">Advisors</NavLink>
          </div>

          <form className="navbar__search" onSubmit={handleSearch}>
            <FiSearch className="navbar__search-icon" />
            <input
              id="global-search"
              type="text"
              placeholder="Search businesses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="navbar__actions">
            <button className="btn-ghost" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            <button className="btn-ghost">Login</button>
            <button className="btn-primary">Register</button>
          </div>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu__close" onClick={() => setMobileOpen(false)}>
            <FiX />
          </button>
          <Link to="/" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Businesses</Link>
          <Link to="/" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Investments</Link>
          <span className="mobile-menu__link">Franchises</span>
          <span className="mobile-menu__link">Investors</span>
          <span className="mobile-menu__link">Advisors</span>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn-ghost" style={{ flex: 1 }}>Login</button>
            <button className="btn-primary" style={{ flex: 1 }}>Register</button>
          </div>
        </div>
      )}
    </>
  );
}
