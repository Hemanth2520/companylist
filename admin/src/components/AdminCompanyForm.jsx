import { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

const INDUSTRIES = ['Manufacturing', 'Technology', 'Healthcare', 'Hospitality', 'Energy', 'Finance', 'Retail'];
const BADGES     = ['PREMIUM', 'VERIFIED', 'NEW LISTING', 'URGENT SALE', 'FEATURED'];
const TX_TYPES   = ['Business for Sale', 'Investment Opportunity'];

const DEFAULT_FORM = {
  name: '',
  tagline: '',
  industry: 'Manufacturing',
  badge: '',
  transactionType: 'Business for Sale',
  budget: '',
  revenue: '',
  investment: '',
  askingPrice: '',
  assets: '',
  ebitda: '',
  employees: 0,
  location: '',
  country: '',
  established: '',
  about: '',
  description: '',
  image: '',
  website: '',
  contactEmail: '',
  tags: [],
  featured: false,
};

export default function AdminCompanyForm({ company, onSave, onCancel }) {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (company) {
      setFormData({
        ...DEFAULT_FORM,
        ...company,
        badge: company.badge || '',
        tags: company.tags || [],
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagChange = (e) => {
    const tags = e.target.value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normalise: send null instead of empty string for badge
    const payload = { ...formData, badge: formData.badge || null };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {/* Header */}
      <div className="admin-form__header">
        <h2>{company ? 'Edit Company' : 'Add New Company'}</h2>
        <button type="button" className="btn-ghost" onClick={onCancel}>
          <FiX /> Cancel
        </button>
      </div>

      <div className="admin-form__grid">
        {/* Basic Info */}
        <div className="admin-form__section">
          <h3>Basic Information</h3>

          <div className="admin-form__field">
            <label>Company Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="admin-form__field">
            <label>Tagline</label>
            <input name="tagline" value={formData.tagline} onChange={handleChange} />
          </div>

          <div className="admin-form__field">
            <label>Industry *</label>
            <select name="industry" value={formData.industry} onChange={handleChange} required>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="admin-form__field">
            <label>Badge</label>
            <select name="badge" value={formData.badge} onChange={handleChange}>
              <option value="">None</option>
              {BADGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="admin-form__field">
            <label>Transaction Type</label>
            <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
              {TX_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Financials */}
        <div className="admin-form__section">
          <h3>Financials &amp; Scale</h3>

          <div className="admin-form__field">
            <label>Budget</label>
            <input name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. $1M – $5M" />
          </div>

          <div className="admin-form__field">
            <label>Revenue</label>
            <input name="revenue" value={formData.revenue} onChange={handleChange} placeholder="e.g. $1.2M /yr" />
          </div>

          <div className="admin-form__field">
            <label>Investment</label>
            <input name="investment" value={formData.investment} onChange={handleChange} placeholder="e.g. $1.5M" />
          </div>

          <div className="admin-form__field">
            <label>Asking Price</label>
            <input name="askingPrice" value={formData.askingPrice} onChange={handleChange} placeholder="e.g. $12.5M" />
          </div>

          <div className="admin-form__field">
            <label>Assets</label>
            <input name="assets" value={formData.assets} onChange={handleChange} placeholder="e.g. $1.2M" />
          </div>

          <div className="admin-form__field">
            <label>EBITDA</label>
            <input name="ebitda" value={formData.ebitda} onChange={handleChange} placeholder="e.g. 15%" />
          </div>

          <div className="admin-form__field">
            <label>Employees</label>
            <input type="number" name="employees" value={formData.employees} onChange={handleChange} min="0" />
          </div>
        </div>

        {/* Location */}
        <div className="admin-form__section">
          <h3>Location &amp; Details</h3>

          <div className="admin-form__field">
            <label>City / Location *</label>
            <input name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="admin-form__field">
            <label>Country</label>
            <input name="country" value={formData.country} onChange={handleChange} />
          </div>

          <div className="admin-form__field">
            <label>Year Established</label>
            <input
              type="number"
              name="established"
              value={formData.established}
              onChange={handleChange}
              placeholder="e.g. 2010"
              min="1800"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="admin-form__field">
            <label>Website</label>
            <input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="admin-form__field">
            <label>Contact Email</label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
          </div>
        </div>

        {/* Content — full width */}
        <div className="admin-form__section full-width">
          <h3>Content &amp; Marketing</h3>

          <div className="admin-form__field">
            <label>About (Short Summary)</label>
            <textarea name="about" value={formData.about} onChange={handleChange} rows="2" />
          </div>

          <div className="admin-form__field">
            <label>Full Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" />
          </div>

          <div className="admin-form__field">
            <label>Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="admin-form__field">
            <label>Tags (comma-separated)</label>
            <input
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagChange}
              placeholder="e.g. SaaS, B2B, Profitable"
            />
          </div>

          <div className="admin-form__field checkbox">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Listing
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-form__footer">
        <button type="button" className="btn-ghost" onClick={onCancel}>
          <FiX /> Cancel
        </button>
        <button type="submit" className="btn-primary">
          <FiSave /> {company ? 'Update Company' : 'Create Company'}
        </button>
      </div>
    </form>
  );
}
