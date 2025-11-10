import "./ScholarshipCard.css";

export default function ScholarshipCard({
  name,
  university,
  country,
  level,
  degree,
  amount,
  deadline,
  description,
  tags = [],
  link,
  eligibility,
}) {
  return (
    <div className="scholarship-card">
      <h2 className="scholarship-name">{name}</h2>
      <h3 className="scholarship-university">{university}</h3>

      {/* ✅ Eligibility tag */}
      {eligibility && (
        <div
          className={`eligibility-tag ${
            eligibility.toLowerCase() === "international"
              ? "international"
              : "local"
          }`}
        >
          {eligibility}
        </div>
      )}

      {/* ✅ Properly filled meta list */}
      <ul className="scholarship-meta">
        <li><strong>Country:</strong> {country}</li>
        <li><strong>Level:</strong> {level}</li>
        <li><strong>Field:</strong> {degree}</li>
        <li><strong>Amount:</strong> ${amount.toLocaleString()}</li>
        <li><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</li>
      </ul>

      <p className="scholarship-description">{description}</p>

      <div className="scholarship-tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>

      {link && (
        <a
          className="apply-button"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      )}
    </div>
  );
}
