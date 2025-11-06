import ScholarshipCard from "./ScholarshipCard";

export default function ({ scholarships }) {
  return (
    <div className="scholarship-list">
      {scholarships.map((scholarship) => (
        <ScholarshipCard
          key={scholarship.id}
          name={scholarship.name}
          amount={scholarship.amount}
          deadline={scholarship.deadline}
          university={scholarship.university}
        />
      ))}
    </div>
  );
}
