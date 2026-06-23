import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../api/companies';
import AdminCompanyForm from '../components/AdminCompanyForm';

export default function AdminPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCompanies({ limit: 1000 });
      setCompanies(res.data.companies || []);
    } catch (err) {
      console.error('Error fetching companies:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to connect to backend';
      setError(msg);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingCompany) {
        await updateCompany(editingCompany._id, data);
      } else {
        await createCompany(data);
      }
      setShowForm(false);
      setEditingCompany(null);
      await fetchCompanies();
    } catch (err) {
      alert('Error saving company: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await deleteCompany(id);
        await fetchCompanies();
      } catch (err) {
        alert('Error deleting company: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---- FORM VIEW ---- */
  if (showForm) {
    return (
      <div className="admin-container">
        <AdminCompanyForm
          company={editingCompany}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
        />
      </div>
    );
  }

  /* ---- LIST VIEW ---- */
  return (
    <div className="admin-container">
      {/* Error Banner */}
      {error && (
        <div className="admin-error-banner">
          <div className="admin-error-banner__content">
            <FiAlertTriangle size={18} />
            <div>
              <strong>Connection Error</strong>
              <p>{error}</p>
              <p style={{ fontSize: '0.75rem', marginTop: 4 }}>
                Make sure the backend server is running: <code>npm run server</code>
              </p>
            </div>
          </div>
          <button className="btn-ghost" onClick={fetchCompanies} style={{ flexShrink: 0 }}>
            <FiRefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Company Management</h1>
          <p>Manage business listings and investment opportunities</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingCompany(null);
            setShowForm(true);
          }}
        >
          <FiPlus /> Add Company
        </button>
      </header>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-card__label">Total Listings</div>
          <div className="stat-card__value">{companies.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Showing</div>
          <div className="stat-card__value">{filteredCompanies.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Featured</div>
          <div className="stat-card__value">{companies.filter((c) => c.featured).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Premium</div>
          <div className="stat-card__value">{companies.filter((c) => c.badge === 'PREMIUM').length}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="admin-controls">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, industry, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading companies…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Type</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.industry}</td>
                  <td>{c.location}</td>
                  <td style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem' }}>{c.transactionType}</td>
                  <td>
                    <span
                      className={`badge badge--${
                        (c.badge || 'none').toLowerCase().replace(/\s+/g, '-')
                      }`}
                    >
                      {c.badge || 'Standard'}
                    </span>
                  </td>
                  <td className="admin-actions">
                    <button
                      className="btn-ghost action-btn"
                      onClick={() => {
                        setEditingCompany(c);
                        setShowForm(true);
                      }}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="btn-ghost action-btn delete"
                      onClick={() => handleDelete(c._id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCompanies.length === 0 && (
            <div className="admin-empty">
              {error ? 'Unable to load companies. Start the backend server and click Retry.' : 'No companies found.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
