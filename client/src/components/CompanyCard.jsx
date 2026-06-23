import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiUsers, FiEye } from 'react-icons/fi';

const BADGE_CLASS = {
  PREMIUM: 'badge--premium',
  VERIFIED: 'badge--verified',
  'NEW LISTING': 'badge--new',
  'URGENT SALE': 'badge--urgent',
  FEATURED: 'badge--featured',
};

function getPrimaryMetric(company) {
  if (company.budget) return { label: 'BUDGET', value: company.budget };
  if (company.askingPrice) return { label: 'ASKING PRICE', value: company.askingPrice };
  if (company.investment) return { label: 'INVESTMENT', value: company.investment };
  return { label: 'VALUE', value: 'On Request' };
}

function getSecondaryMetric(company) {
  if (company.ebitda) return { label: 'EBITDA', value: company.ebitda };
  if (company.assets) return { label: 'ASSETS', value: company.assets };
  return null;
}

export default function CompanyCard({ company }) {
  const navigate = useNavigate();
  const primary = getPrimaryMetric(company);
  const secondary = getSecondaryMetric(company);

  return (
    <article
      className="company-card"
      onClick={() => navigate(`/company/${company._id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${company.name}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/company/${company._id}`)}
      id={`company-card-${company._id}`}
    >
      <div className="company-card__img-wrap">
        <img
          className="company-card__img"
          src={company.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'}
          alt={company.name}
          loading="lazy"
        />
        <div className="company-card__img-overlay" />
        <div className="company-card__badge-row">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {company.badge && (
              <span className={`badge ${BADGE_CLASS[company.badge] || ''}`}>
                {company.badge}
              </span>
            )}
            <span className="badge badge--industry">{company.industry}</span>
          </div>
          <div className="company-card__views">
            <FiEye size={10} />
            {(company.views || 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="company-card__body">
        <div>
          <h3 className="company-card__name">{company.name}</h3>
          {company.tagline && (
            <p className="company-card__tagline">{company.tagline}</p>
          )}
        </div>

        <div className="company-card__meta-grid">
          <div className="company-card__meta-item">
            <span className="company-card__meta-label">{primary.label}</span>
            <span className="company-card__meta-value highlight">{primary.value}</span>
          </div>

          <div className="company-card__meta-item">
            <span className="company-card__meta-label">LOCATION</span>
            <span className="company-card__meta-value">{company.location}</span>
          </div>

          {company.revenue && (
            <div className="company-card__meta-item">
              <span className="company-card__meta-label">REVENUE</span>
              <span className="company-card__meta-value">{company.revenue}</span>
            </div>
          )}

          {secondary ? (
            <div className="company-card__meta-item">
              <span className="company-card__meta-label">{secondary.label}</span>
              <span className="company-card__meta-value">{secondary.value}</span>
            </div>
          ) : company.employees ? (
            <div className="company-card__meta-item">
              <span className="company-card__meta-label">EMPLOYEES</span>
              <span className="company-card__meta-value">{company.employees}</span>
            </div>
          ) : null}
        </div>

        <div className="company-card__divider" />

        <div className="company-card__footer">
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="company-card__location">
              <FiMapPin size={11} />
              {company.country || company.location}
            </div>
            {company.employees > 0 && (
              <div className="company-card__employees">
                <FiUsers size={11} />
                {company.employees} emp.
              </div>
            )}
          </div>
          <button
            className="company-card__view-btn"
            onClick={(e) => { e.stopPropagation(); navigate(`/company/${company._id}`); }}
            id={`view-btn-${company._id}`}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
