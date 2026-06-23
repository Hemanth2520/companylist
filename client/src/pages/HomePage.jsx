import { useState, useEffect, useCallback } from 'react';
import { FiTrendingUp, FiGlobe, FiBriefcase, FiFilter } from 'react-icons/fi';
import FilterTabs from '../components/FilterTabs';
import Sidebar from '../components/Sidebar';
import CompanyCard from '../components/CompanyCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { getCompanies } from '../api/companies';
import { MOCK_COMPANIES } from '../data/mockCompanies';

const ITEMS_PER_PAGE = 9;

export default function HomePage({ searchQuery }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Industries');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ transactionTypes: [], locations: [], industries: [], employees: {}, budget: {} });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [usingMock, setUsingMock] = useState(false);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const industry = activeTab === 'All Industries' ? undefined : activeTab;
      const params = { page, limit: ITEMS_PER_PAGE };
      if (industry) params.industry = industry;
      if (searchQuery) params.search = searchQuery;

      // Add applied filters to params
      if (appliedFilters.transactionTypes?.length) params.transactionType = appliedFilters.transactionTypes.join(',');
      if (appliedFilters.locations?.length) params.location = appliedFilters.locations.join(',');
      if (appliedFilters.industries?.length) params.industry = appliedFilters.industries.join(',');
      if (appliedFilters.employees?.min) params.minEmployees = appliedFilters.employees.min;
      if (appliedFilters.employees?.max) params.maxEmployees = appliedFilters.employees.max;
      if (appliedFilters.budget?.min) params.minBudget = appliedFilters.budget.min;
      if (appliedFilters.budget?.max) params.maxBudget = appliedFilters.budget.max;

      const res = await getCompanies(params);
      setCompanies(res.data.companies);
      setTotalPages(res.data.pages);
      setTotalCount(res.data.total);
      setUsingMock(false);
    } catch {
      // Fallback to mock data
      let filtered = MOCK_COMPANIES;
      if (activeTab !== 'All Industries') {
        filtered = filtered.filter((c) => c.industry === activeTab);
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.industry.toLowerCase().includes(q) ||
            c.location.toLowerCase().includes(q)
        );
      }

      // Apply other filters to mock data
      if (appliedFilters.transactionTypes?.length) {
        filtered = filtered.filter(c => appliedFilters.transactionTypes.includes(c.transactionType));
      }
      if (appliedFilters.locations?.length) {
        filtered = filtered.filter(c => appliedFilters.locations.some(l => c.country.includes(l)));
      }
      if (appliedFilters.employees?.min) {
        filtered = filtered.filter(c => c.employees >= parseInt(appliedFilters.employees.min));
      }
      if (appliedFilters.employees?.max) {
        filtered = filtered.filter(c => c.employees <= parseInt(appliedFilters.employees.max));
      }

      // Sort
      if (sortBy === 'views') filtered = [...filtered].sort((a, b) => b.views - a.views);
      if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

      const start = (page - 1) * ITEMS_PER_PAGE;
      setCompanies(filtered.slice(start, start + ITEMS_PER_PAGE));
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      setTotalCount(filtered.length);
      setUsingMock(true);
    }
    setLoading(false);
  }, [activeTab, page, searchQuery, sortBy, appliedFilters]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery, sortBy]);

  const handleFilterChange = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
    setSidebarOpen(false);
  };
  const handleClearFilters = () => {
    setFilters({ transactionTypes: [], locations: [], industries: [], employees: {}, budget: {} });
    setAppliedFilters({});
    setPage(1);
  };

  return (
    <>
      {usingMock && (
        <div style={{
          background: 'linear-gradient(90deg, var(--clr-gold), var(--clr-gold-dark))',
          color: '#0a0600',
          textAlign: 'center',
          padding: '8px 0',
          fontSize: '0.8rem',
          fontWeight: 700,
          position: 'sticky',
          top: 0,
          zIndex: 2000
        }}>
          Demo Mode: Connected to local mock data. Connect MongoDB for live listings.
        </div>
      )}
      {/* Hero */}
      <section className="hero">
        <div className="container hero__content">
          <h1>
            Businesses for Sale<br />
            <span>and Investment</span>
          </h1>
          <p className="hero__sub">
            Showing {totalCount.toLocaleString()} opportunities worldwide
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">23,480+</span>
              <span className="hero__stat-label">Listings</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">180+</span>
              <span className="hero__stat-label">Countries</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">$50B+</span>
              <span className="hero__stat-label">Deal Value</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">120k+</span>
              <span className="hero__stat-label">Investors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="container">
        <div className="page-layout">
          {/* Sidebar */}
          {!sidebarOpen && (
            <Sidebar
              filters={filters}
              onChange={handleFilterChange}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          )}

          {/* Content */}
          <main className="main-content">
            {/* Mobile filter toggle */}
            <button
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, width: 'fit-content' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              id="mobile-filter-toggle"
              aria-expanded={sidebarOpen}
              aria-controls="sidebar-container"
            >
              <FiFilter /> Filters
            </button>

            {sidebarOpen && (
              <div id="sidebar-container" style={{ marginBottom: 24 }}>
                <Sidebar
                  filters={filters}
                  onChange={handleFilterChange}
                  onApply={handleApplyFilters}
                  onClear={handleClearFilters}
                />
              </div>
            )}

            <FilterTabs active={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />

            <div className="results-bar">
              <p className="results-bar__count">
                Showing <strong>1–{Math.min(ITEMS_PER_PAGE, totalCount)}</strong> of{' '}
                <strong>{totalCount.toLocaleString()}</strong> opportunities worldwide
              </p>
              <div className="results-bar__sort">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="views">Most Viewed</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div className="company-grid">
              {loading
                ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
                : companies.length === 0
                ? (
                  <div className="empty-state">
                    <div className="empty-state__icon">🏢</div>
                    <h3>No companies found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                  </div>
                )
                : companies.map((c) => <CompanyCard key={c._id} company={c} />)
              }
            </div>

            <Pagination page={page} pages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </>
  );
}
