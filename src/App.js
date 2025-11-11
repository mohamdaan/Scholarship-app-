// src/App.js
import { useState, useMemo } from "react";
import scholarshipsData from "./mockData";
import { useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ScholarshipList from "./components/ScholarshipList";
import FilterForm from "./components/FilterForm";

// Build acronyms like "ubc", "ut", "sfu"
const toAcronym = (str = "") => {
  const stop = new Set([
    "of",
    "the",
    "and",
    "for",
    "in",
    "at",
    "on",
    "a",
    "an",
  ]);
  return String(str)
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => !stop.has(w))
    .map((w) => w[0])
    .join("");
};

export default function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    eligibility: "All",
    country: "All",
    level: "All",
    amount: "",
    onlyFavorites: false,
  }); //state for filtering

  const [favorites, setFavorites] = useState(() => {
    // load once on first render
    try {
      const raw = localStorage.getItem("favorites");
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(arr);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // case-insensitive search
  const filteredScholarships = useMemo(() => {
    const q = query.trim().toLowerCase();

    return scholarshipsData.filter((s) => {
      const parseAmount = (val) => {
        if (typeof val === "number") return val;
        const cleaned = String(val).replace(/[^0-9.]/g, "");
        const num = Number(cleaned);
        return Number.isFinite(num) ? num : 0;
      };
      if (!q)
        return (
          (filter.eligibility === "All" ||
            s.eligibility === filter.eligibility) &&
          (filter.country === "All" || s.country === filter.country) &&
          (filter.level === "All" || s.level === filter.level) &&
          (!filter.amount ||
            parseAmount(Number(s.amount)) >=
              parseAmount(Number(filter.amount))) &&
          (!filter.onlyFavorites || favorites.has(s.id))
        );

      const name = s.name?.toLowerCase() || "";
      const university = s.university?.toLowerCase() || "";
      const degree = s.degree?.toLowerCase() || "";
      const tags = (s.tags || []).map((t) => t.toLowerCase());

      // Acronym WITHOUT stop-words: "University of Toronto" -> "ut"
      const toAcronym = (str = "") => {
        const stop = new Set([
          "of",
          "the",
          "and",
          "for",
          "in",
          "at",
          "on",
          "a",
          "an",
        ]);
        return String(str)
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => !stop.has(w))
          .map((w) => w[0])
          .join("");
      };
      const uniAcrNoStop = toAcronym(university); // "ut"

      // Acronym WITH all words kept: "University of Toronto" -> "uot"
      const uniAcrAll = String(university)
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w[0])
        .join(""); // "uot"

      // Compact: remove spaces and filler words: "University of Toronto" -> "universitytoronto"
      const uniCompact = university.replace(/\s+/g, "").replace(/of|the/g, "");
      const matchesEligibility =
        filter.eligibility === "All" || s.eligibility === filter.eligibility; // checks to see if current scholarship, s has same eligibility as the filter value in useState

      const matchesCountry =
        filter.country === "All" || s.country === filter.country;

      const matchesLevel = filter.level === "All" || s.level === filter.level;

      const matchesAmount =
        !filter.amount || Number(s.amount) >= Number(filter.amount);

      const matchesSearch =
        name.includes(q) ||
        university.includes(q) ||
        uniAcrNoStop.includes(q) || // "ut"
        uniAcrAll.includes(q) || // "uot"
        uniCompact.includes(q) || // "uoft" won't match here, but "universitytoronto" will
        degree.includes(q) ||
        tags.some((t) => t.includes(q));

      const matchesFavorites = !filter.onlyFavorites || favorites.has(s.id);

      return (
        matchesEligibility &&
        matchesSearch &&
        matchesCountry &&
        matchesLevel &&
        matchesAmount &&
        matchesFavorites
      );
    });
  }, [query, filter, favorites]);

  return (
    <div className="App">
      <Header />
      <SearchBar query={query} setQuery={setQuery} />
      <FilterForm filter={filter} setFilter={setFilter} />
      <p style={{ margin: "8px 0" }}>
        Showing <strong>{filteredScholarships.length}</strong> result(s)
      </p>
      <ScholarshipList
        scholarships={filteredScholarships}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
