import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiMapPin, FiUsers, FiCalendar, FiEye,
  FiDollarSign, FiTrendingUp, FiBarChart2, FiTag,
  FiMail, FiPhone, FiBookmark, FiShare2, FiStar,
  FiGlobe, FiClock, FiCheckCircle
} from 'react-icons/fi';
import { getCompany } from '../api/companies';
import { MOCK_COMPANIES } from '../data/mockCompanies';

const BADGE_CLASS = {
  PREMIUM: 'badge--premium',
  VERIFIED: 'badge--verified',
  'NEW LISTING': 'badge--new',
  'URGENT SALE': 'badge--urgent',
  FEATURED: 'badge--featured',
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="rating-stars" role="img" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          fill={i < full || (i === full && half) ? 'currentColor' : 'none'}
          size={14}
        />
      ))}
      <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-muted)', marginLeft: 4 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getCompany(id);
        setCompany(res.data);
      } catch {
        const mock = MOCK_COMPANIES.find((c) => c._id === id);
        setCompany(mock || null);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) {
    return (
      <div className="container detail-page">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="skeleton" style={{ height: 360, borderRadius: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />)}
          </div>
          <div className="skeleton" style={{ height: 200, borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container detail-page">
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <h3>Company Not Found</h3>
          <p>The listing you're looking for doesn't exist or has been removed.</p>
          <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: 16 }}>
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const metrics = [
    company.budget && { icon: <FiDollarSign />, label: 'Budget', value: company.budget },
    company.askingPrice && { icon: <FiDollarSign />, label: 'Asking Price', value: company.askingPrice },
    company.investment && { icon: <FiDollarSign />, label: 'Investment', value: company.investment },
    company.revenue && { icon: <FiTrendingUp />, label: 'Revenue', value: company.revenue },
    company.ebitda && { icon: <FiBarChart2 />, label: 'EBITDA', value: company.ebitda },
    company.assets && { icon: <FiBarChart2 />, label: 'Assets', value: company.assets },
    { icon: <FiUsers />, label: 'Employees', value: company.employees || 'N/A' },
    { icon: <FiMapPin />, label: 'Location', value: company.location },
  ].filter(Boolean);

  return (
    <div className="container detail-page">
      <button className="detail-back" onClick={() => navigate(-1)} id="detail-back-btn">
        <FiArrowLeft /> Back to Listings
      </button>

      <div className="detail-layout">
        {/* Left Main */}
        <div className="detail-main">
          {/* Hero Image */}
          <div className="detail-hero">
            <img
              className="detail-hero__img"
              src={company.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'}
              alt={company.name}
            />
            <div className="detail-hero__overlay" />
            <div className="detail-hero__content">
              <div className="detail-hero__badges">
                {company.badge && (
                  <span className={`badge ${BADGE_CLASS[company.badge] || ''}`}>
                    {company.badge}
                  </span>
                )}
                <span className="badge badge--industry">{company.industry}</span>
                {company.transactionType && (
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)' }}>
                    {company.transactionType}
                  </span>
                )}
              </div>
              <h1 className="detail-hero__name">{company.name}</h1>
              {company.tagline && (
                <p className="detail-hero__tagline">{company.tagline}</p>
              )}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="detail-metrics">
            {metrics.map((m, i) => (
              <div className="metric-card" key={i}>
                <div className="metric-card__icon">{m.icon}</div>
                <div className="metric-card__label">{m.label}</div>
                <div className="metric-card__value">{m.value}</div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="info-section">
            <h2 className="info-section__title">
              <FiCheckCircle className="info-section__title-icon" />
              About This Business
            </h2>
            <p className="info-section__body">{company.about}</p>
            {company.description && (
              <p className="info-section__body" style={{ marginTop: 12 }}>{company.description}</p>
            )}
            {company.tags && company.tags.length > 0 && (
              <div className="info-section__tags">
                {company.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Facts */}
          <div className="info-section">
            <h2 className="info-section__title">
              <FiBarChart2 className="info-section__title-icon" />
              Quick Facts
            </h2>
            <table className="facts-table">
              <tbody>
                {company.industry && (
                  <tr><td>Industry</td><td>{company.industry}</td></tr>
                )}
                {company.established && (
                  <tr><td>Established</td><td>{company.established}</td></tr>
                )}
                {company.employees > 0 && (
                  <tr><td>Employees</td><td>{company.employees}</td></tr>
                )}
                {company.location && (
                  <tr><td>Location</td><td>{company.location}</td></tr>
                )}
                {company.transactionType && (
                  <tr><td>Transaction Type</td><td>{company.transactionType}</td></tr>
                )}
                {company.revenue && (
                  <tr><td>Annual Revenue</td><td>{company.revenue}</td></tr>
                )}
                {company.budget && (
                  <tr><td>Budget</td><td>{company.budget}</td></tr>
                )}
                {company.askingPrice && (
                  <tr><td>Asking Price</td><td>{company.askingPrice}</td></tr>
                )}
                {company.investment && (
                  <tr><td>Investment Required</td><td>{company.investment}</td></tr>
                )}
                {company.ebitda && (
                  <tr><td>EBITDA</td><td>{company.ebitda}</td></tr>
                )}
                {company.assets && (
                  <tr><td>Total Assets</td><td>{company.assets}</td></tr>
                )}
                {company.rating > 0 && (
                  <tr>
                    <td>Rating</td>
                    <td><StarRating rating={company.rating} /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="detail-sidebar">
          {/* Contact Card */}
          <div className="contact-card">
            <div>
              <p className="contact-card__title">Interested in this business?</p>
              <p className="contact-card__sub">
                Connect with the seller or advisor to learn more about this opportunity.
              </p>
            </div>

            {company.rating > 0 && <StarRating rating={company.rating} />}

            <button
              className="contact-card__btn primary"
              id="contact-seller-btn"
              onClick={() => showToast('🎉 Contact request sent to the seller!')}
            >
              <FiMail /> Contact Seller
            </button>
            <button
              className="contact-card__btn outline"
              id="request-info-btn"
              onClick={() => showToast('📋 Information request submitted!')}
            >
              <FiPhone /> Request Info
            </button>
            <button
              className="contact-card__btn outline"
              id="save-listing-btn"
              onClick={() => { setSaved(!saved); showToast(saved ? 'Removed from saved' : '❤️ Saved to your list!'); }}
              style={{ color: saved ? 'var(--clr-gold)' : undefined, borderColor: saved ? 'var(--clr-gold)' : undefined }}
            >
              <FiBookmark fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save Listing'}
            </button>
            <button
              className="contact-card__btn outline"
              id="share-listing-btn"
              onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('🔗 Link copied to clipboard!'); }}
            >
              <FiShare2 /> Share Listing
            </button>
          </div>

          {/* Stats Card */}
          <div className="views-pill" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
              <FiEye size={14} />
              <span><strong style={{ color: 'var(--clr-text)' }}>{(company.views || 0).toLocaleString()}</strong> people viewed this listing</span>
            </div>
            {company.established && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
                <FiClock size={14} />
                <span><strong style={{ color: 'var(--clr-text)' }}>{new Date().getFullYear() - company.established} years</strong> in operation</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
              <FiGlobe size={14} />
              <span>Based in <strong style={{ color: 'var(--clr-text)' }}>{company.country || company.location}</strong></span>
            </div>
          </div>

          {/* Similar Section */}
          <div className="info-section" style={{ padding: 20 }}>
            <p className="info-section__title" style={{ fontSize: '0.875rem' }}>
              <FiTag className="info-section__title-icon" />
              Category
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="tag">{company.industry}</span>
              {company.tags?.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
