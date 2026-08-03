export default function EmptyState({ title, message, children }) {
  return (
    <div className="state-card empty-state">
      <span aria-hidden="true">◎</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
}
