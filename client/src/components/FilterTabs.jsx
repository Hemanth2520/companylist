const INDUSTRIES = [
  'All Industries',
  'Manufacturing',
  'Technology',
  'Healthcare',
  'Hospitality',
  'Energy',
  'Finance',
  'Retail',
];

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Industry filter">
      {INDUSTRIES.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          className={`filter-tab ${active === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
          id={`tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
