export default function ScholarshipCard({
  name,
  amount,
  deadline,
  university,
}) {
  return (
    <div className="scholarship-card">
      <p>{name}</p>
      <p>Amount: {amount}</p>
      <p>Deadline: {deadline}</p>
      <p>University: {university}</p>
    </div>
  );
}
