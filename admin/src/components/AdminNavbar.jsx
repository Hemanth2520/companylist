import { useState, useEffect } from 'react';
import { FiBriefcase, FiServer, FiWifiOff } from 'react-icons/fi';

import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  const [backendOk, setBackendOk] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('/api/health');
        setBackendOk(res.ok);
      } catch {
        setBackendOk(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="admin-navbar">
      <Link to="/" className="admin-navbar__logo">
        <FiBriefcase size={20} />
        CompanyList
        <span>/ Admin Panel</span>
        <span className="admin-navbar__badge">Private</span>
      </Link>

      <div className="admin-navbar__right">
        <div className="admin-navbar__status">
          {backendOk === null ? (
            <>
              <span className="status-dot" style={{ background: '#888', boxShadow: 'none' }} />
              Checking…
            </>
          ) : backendOk ? (
            <>
              <span className="status-dot" />
              Backend connected
            </>
          ) : (
            <>
              <FiWifiOff size={14} style={{ color: 'var(--clr-red)' }} />
              <span style={{ color: 'var(--clr-red)' }}>Backend offline</span>
            </>
          )}
        </div>
        <FiServer size={16} />
        <span>Port 5174</span>
      </div>
    </header>
  );
}
