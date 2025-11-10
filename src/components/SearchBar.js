export default function SearchBar({ query, setQuery }) {
    return (
      <div className="searchbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, university, or field…"
        />
      </div>
    );
  }