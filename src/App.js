// src/App.js
import { useState, useMemo } from "react";
import scholarshipsData from "./mockData";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ScholarshipList from "./components/ScholarshipList";
import FilterForm from "./components/FilterForm"

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

  // case-insensitive search
  const filteredScholarships = useMemo(() => {
    const q = query.trim().toLowerCase();

    return scholarshipsData.filter((s) => {
      if (!q) return true;

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

      return (
        name.includes(q) ||
        university.includes(q) ||
        uniAcrNoStop.includes(q) || // "ut"
        uniAcrAll.includes(q) || // "uot" 
        uniCompact.includes(q) || // "uoft" won't match here, but "universitytoronto" will
        degree.includes(q) ||
        tags.some((t) => t.includes(q))
      );
    });
  }, [query]);

  return (
    <div className="App">
      <Header />
      <SearchBar query={query} setQuery={setQuery} />

      <p style={{ margin: "8px 0" }}>
        Showing <strong>{filteredScholarships.length}</strong> result(s)
      </p>
      <FilterForm/>
      <ScholarshipList scholarships={filteredScholarships} />
    </div>
  );
}
