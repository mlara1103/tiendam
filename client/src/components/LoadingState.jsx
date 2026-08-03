export default function LoadingState({ label = 'Cargando catálogo...' }) {
  return (
    <div className="state-card" role="status">
      <span className="loader" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
