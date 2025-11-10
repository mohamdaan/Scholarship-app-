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
        country={scholarship.country}
        level={scholarship.level}
        degree={scholarship.degree}
        description={scholarship.description}
        tags={scholarship.tags}
        link={scholarship.link}
        eligibility={scholarship.eligibility}
      />
      
      ))}
    </div>
  );
}
