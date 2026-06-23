import { FiTag, FiMapPin, FiGrid, FiSave, FiX, FiUsers, FiDollarSign } from 'react-icons/fi';

const TRANSACTION_TYPES = ['Business for Sale', 'Investment Opportunity'];
const LOCATIONS = ['Asia', 'Europe', 'North America', 'Middle East', 'Africa', 'Australia'];
const INDUSTRIES = ['Manufacturing', 'Technology', 'Healthcare', 'Hospitality', 'Energy', 'Finance', 'Retail'];

export default function Sidebar({ filters, onChange, onApply, onClear }) {
  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(key, updated);
  };

  const toggleLocation = (loc) => {
    const current = filters.locations || [];
    const updated = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc];
    onChange('locations', updated);
  };

  const handleRangeChange = (key, field, value) => {
    const current = filters[key] || {};
    onChange(key, { ...current, [field]: value });
  };

  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar__title">Filter Results</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--clr-text-dim)' }}>
          Narrow your search for the right deal
        </p>
      </div>

      {/* Transaction Type */}
      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <FiTag className="sidebar__section-icon" />
          <span>Transaction Types</span>
        </div>
        <div className="sidebar__options">
          {TRANSACTION_TYPES.map((t) => (
            <label key={t} className="sidebar__option" htmlFor={`tx-${t}`}>
              <input
                id={`tx-${t}`}
                type="checkbox"
                checked={(filters.transactionTypes || []).includes(t)}
                onChange={() => toggle('transactionTypes', t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <FiMapPin className="sidebar__section-icon" />
          <span>Locations</span>
        </div>
        <div className="sidebar__location-grid">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              className={`location-pill ${(filters.locations || []).includes(loc) ? 'active' : ''}`}
              onClick={() => toggleLocation(loc)}
              id={`loc-${loc.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <FiGrid className="sidebar__section-icon" />
          <span>Industries</span>
        </div>
        <div className="sidebar__options">
          {INDUSTRIES.map((ind) => (
            <label key={ind} className="sidebar__option" htmlFor={`ind-${ind}`}>
              <input
                id={`ind-${ind}`}
                type="checkbox"
                checked={(filters.industries || []).includes(ind)}
                onChange={() => toggle('industries', ind)}
              />
              <span>{ind}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employees Range */}
      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <FiUsers className="sidebar__section-icon" />
          <span>Employee Range</span>
        </div>
        <div className="sidebar__range-inputs">
          <div className="sidebar__range-field">
            <label>Min</label>
            <input
              type="number"
              value={filters.employees?.min || ''}
              onChange={(e) => handleRangeChange('employees', 'min', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="sidebar__range-field">
            <label>Max</label>
            <input
              type="number"
              value={filters.employees?.max || ''}
              onChange={(e) => handleRangeChange('employees', 'max', e.target.value)}
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      {/* Budget Range */}
      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <FiDollarSign className="sidebar__section-icon" />
          <span>Budget Range ($)</span>
        </div>
        <div className="sidebar__range-inputs">
          <div className="sidebar__range-field">
            <label>Min</label>
            <input
              type="number"
              value={filters.budget?.min || ''}
              onChange={(e) => handleRangeChange('budget', 'min', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="sidebar__range-field">
            <label>Max</label>
            <input
              type="number"
              value={filters.budget?.max || ''}
              onChange={(e) => handleRangeChange('budget', 'max', e.target.value)}
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      <div className="sidebar__actions">
        <button className="sidebar__apply-btn" onClick={onApply} id="apply-filters-btn">
          Apply Filters
        </button>
        <button className="sidebar__clear-btn" onClick={onClear} id="clear-filters-btn">
          <FiX style={{ marginRight: 4 }} /> Clear All
        </button>
      </div>

      <button
        className="sidebar__clear-btn"
        style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}
        id="saved-searches-btn"
      >
        <FiSave /> Saved Searches
      </button>
    </aside>
  );
}
