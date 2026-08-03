import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

export default function NotFoundPage() {
  return (
    <main className="container page-section">
      <EmptyState title="Página no encontrada" message="La dirección que buscaste no existe.">
        <Link className="button button-primary" to="/">Ir al catálogo</Link>
      </EmptyState>
    </main>
  );
}
