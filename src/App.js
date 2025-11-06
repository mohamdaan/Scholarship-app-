import logo from "./logo.svg";
import "./App.css";
import ScholarshipCard from "./components/ScholarshipCard";
import Header from "./components/Header";
import FilterForm from "./components/FilterForm";
import SearchBar from "./components/SearchBar";
import ScholarshipList from "./components/ScholarshipList";

function App() {
  const scholarships = [
    {
      id: 1,
      name: "UBC International Leader of Tomorrow",
      amount: "$20,000",
      deadline: "Jan 15",
      university: "University of British Columbia",
    },
    {
      id: 2,
      name: "SFU Entrance Scholarship",
      amount: "$10,000",
      deadline: "Feb 1",
      university: "Simon Fraser University",
    },
  ];
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <FilterForm />
      <ScholarshipCard
        name="UBC International Leader of Tomorrow"
        amount="$20,000"
        deadline="Jan 15"
        university="University of British Columbia"
      />
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
}

export default App;
