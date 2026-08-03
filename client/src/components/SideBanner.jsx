export default function SideBanner({ side }) {
  return (
    <aside className={`side-banner side-banner-${side}`} aria-label={`Banner lateral ${side}`}>
      <span className="banner-kicker">Espacio editable</span>
      <strong>{side === 'left' ? 'Nuevos ingresos' : 'Ediciones limitadas'}</strong>
      <p>Reserva este bloque para campañas, artistas, sellos o promociones.</p>
      <div className="banner-decoration" aria-hidden="true" />
    </aside>
  );
}
