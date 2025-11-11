export default function FilterForm({ filter, setFilter }) {
  return (
    <div
      className="filters"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
        margin: "1rem 0",
      }}
    >
      {/* Eligibility Filter */}
      <label htmlFor="eligibility">Eligibility:</label>
      <select
        id="eligibility"
        value={filter.eligibility}
        onChange={(e) =>
          setFilter((f) => ({ ...f, eligibility: e.target.value }))
        }
      >
        <option value="All">All</option>
        <option value="Local">Local</option>
        <option value="International">International</option>
      </select>

      {/* Level Filter */}
      <label htmlFor="level">Level:</label>
      <select
        id="level"
        value={filter.level}
        onChange={(e) => setFilter((f) => ({ ...f, level: e.target.value }))}
      >
        <option value="All">All</option>
        <option value="Undergraduate">Undergraduate</option>
        <option value="Graduate">Graduate</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>

      {/* Country Filter */}
      <label htmlFor="country">Country:</label>
      <select
        id="country"
        value={filter.country}
        onChange={(e) => setFilter((f) => ({ ...f, country: e.target.value }))}
      >
        <option value="All">All</option>
        <option value="Canada">Canada</option>
        <option value="United Kingdom">UK</option>
        <option value="United States">USA</option>
        <option value="Australia">Australia</option>
        <option value="United Arab Emirates">UAE</option>
      </select>

      <label htmlFor="amount">Min Amount:</label>
      <input
        id="amount"
        type="number"
        min="0"
        step="500"
        value={filter.amount}
        onChange={(e) => setFilter((f) => ({ ...f, amount: e.target.value }))}
        placeholder="e.g., 5000"
        style={{ width: 120 }}
      />
      <label htmlFor="onlyFavs" style={{ marginLeft: 8 }}>
        <input
          id="onlyFavs"
          type="checkbox"
          checked={filter.onlyFavorites}
          onChange={(e) =>
            setFilter((f) => ({ ...f, onlyFavorites: e.target.checked }))
          }
        />{" "}
        Show favorites only
      </label>
    </div>
  );
}
