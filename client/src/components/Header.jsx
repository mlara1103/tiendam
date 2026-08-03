import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Ir al inicio">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>
            <strong>GrooveShelf</strong>
            <small>Records & editions</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end>Catálogo</NavLink>
          <NavLink to="/administrar">Administrar</NavLink>
          <NavLink to="/carrito" className="cart-link">
            Carrito <span>{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
