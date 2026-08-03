import { Link } from 'react-router-dom';

export default function StoreHero() {
  return (
    <section className="store-hero">
      <div className="hero-copy">
        <span className="eyebrow">Selección independiente</span>
        <h1>Discos para escuchar completos.</h1>
        <p>Vinilos, CD y ediciones especiales elegidas para una colección con identidad.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#catalogo">Explorar catálogo</a>
          <Link className="button button-ghost" to="/administrar">Gestionar productos</Link>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="record-sleeve">
          <span>GROOVE</span>
          <div className="record"><i /></div>
          <small>Curated sound</small>
        </div>
      </div>
    </section>
  );
}
