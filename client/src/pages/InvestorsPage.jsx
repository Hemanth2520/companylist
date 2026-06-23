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

export default function InvestorsPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Industries');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ transactionTypes: [], locations: [], industries: [], employees: {}, budget: {} });
  const [appliedFilters, setAppliedFilters] = useState({ transactionType: 'Investment Opportunity' });
  const [usingMock, setUsingMock] = useState(false);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const industry = activeTab === 'All Industries' ? undefined : activeTab;
      const params = { page, limit: ITEMS_PER_PAGE };
      if (industry) params.industry = industry;

      if (appliedFilters.transactionTypes?.length) params.transactionType = appliedFilters.transactionTypes.join(',');
      else if (appliedFilters.transactionType) params.transactionType = appliedFilters.transactionType;

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
      let filtered = MOCK_COMPANIES;
      if (activeTab !== 'All Industries') {
        filtered = filtered.filter((c) => c.industry === activeTab);
      }

      if (appliedFilters.transactionType === 'Investment Opportunity') {
        filtered = filtered.filter(c => c.transactionType === 'Investment Opportunity');
      }

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

      if (sortBy === 'views') filtered = [...filtered].sort((a, b) => b.views - a.views);
      if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

      const start = (page - 1) * ITEMS_PER_PAGE;
      setCompanies(filtered.slice(start, start + ITEMS_PER_PAGE));
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      setTotalCount(filtered.length);
      setUsingMock(true);
    }
    setLoading(false);
  }, [activeTab, page, sortBy, appliedFilters]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, sortBy]);

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
    <div className="investors-page">
      <section className="hero">
        <div className="container hero__content">
          <h1>Prime <span className="gold-text">Investment</span> Opportunities</h1>
          <p className="hero__sub">
            Strategic partnerships and growth-stage ventures for sophisticated investors
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">$2.4B</span>
              <span className="hero__stat-label">Total AUM</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">450+</span>
              <span className="hero__stat-label">Active Deals</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">12%</span>
              <span className="hero__stat-label">Avg Return</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-layout">
          <Sidebar
            filters={filters}
            onChange={handleFilterChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />

          <main className="main-content">
            <button
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, width: 'fit-content' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiFilter /> Filters
            </button>

            {sidebarOpen && (
              <div style={{ marginBottom: 24 }}>
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
                <strong>{totalCount.toLocaleString()}</strong> investment opportunities
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
                    <div className="empty-state__icon">📈</div>
                    <h3>No opportunities found</h3>
                    <p>Adjust your filters to find a matching investment.</p>
                  </div>
                )
                : companies.map((c) => <CompanyCard key={c._id} company={c} />)
              }
            </div>

            <Pagination page={page} pages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </div>
  );
}
