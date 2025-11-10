export default function FilterForm({ filter, setFilter }) {
    return (
      <div className="filters" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label htmlFor="eligibility">Eligibility:</label>
        <select
          id="eligibility"
          value={filter.eligibility}
          onChange={(e) => setFilter(f => ({ ...f, eligibility: e.target.value }))}
        >
          <option value="All">All</option>
          <option value="Local">Local</option>
          <option value="International">International</option>
        </select>
      </div>
    );
  }
  