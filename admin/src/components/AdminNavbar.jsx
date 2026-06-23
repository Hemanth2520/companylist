import { FiBriefcase, FiServer } from 'react-icons/fi';

export default function AdminNavbar() {
  return (
    <header className="admin-navbar">
      <a href="/" className="admin-navbar__logo">
        <FiBriefcase size={20} />
        CompanyList
        <span>/ Admin Panel</span>
        <span className="admin-navbar__badge">Private</span>
      </a>

      <div className="admin-navbar__right">
        <div className="admin-navbar__status">
          <span className="status-dot" />
          Backend connected
        </div>
        <FiServer size={16} />
        <span>Port 5174</span>
      </div>
    </header>
  );
}
