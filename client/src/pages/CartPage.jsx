import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 3990;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="container page-section">
        <EmptyState title="Tu carrito está vacío" message="Agrega un disco para comenzar tu pedido.">
          <Link className="button button-primary" to="/">Ver catálogo</Link>
        </EmptyState>
      </main>
    );
  }

  return (
    <main className="container page-section">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Tu selección</span>
          <h1>Carrito de compras</h1>
        </div>
        <Link className="back-link" to="/">Seguir comprando</Link>
      </div>

      <div className="cart-layout">
        <section className="panel cart-items">
          {items.map((item) => {
            const imageSource = item.image ? `${API_BASE_URL}${item.image}` : '/placeholder-album.svg';
            return (
              <article className="cart-item" key={item._id}>
                <img
                  src={imageSource}
                  alt={`Portada de ${item.title}`}
                  onError={(event) => { event.currentTarget.src = '/placeholder-album.svg'; }}
                />
                <div className="cart-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.artist} · {item.format}</span>
                  <button type="button" className="text-button danger-text" onClick={() => removeFromCart(item._id)}>
                    Quitar
                  </button>
                </div>
                <label className="quantity-field">
                  Cantidad
                  <select value={item.quantity} onChange={(event) => updateQuantity(item._id, event.target.value)}>
                    {Array.from({ length: Math.min(item.stock, 10) }, (_, index) => index + 1).map((number) => (
                      <option key={number} value={number}>{number}</option>
                    ))}
                  </select>
                </label>
                <strong className="cart-line-total">{formatCurrency(item.price * item.quantity)}</strong>
              </article>
            );
          })}
        </section>

        <aside className="panel order-summary">
          <span className="eyebrow">Resumen</span>
          <h2>Tu pedido</h2>
          <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className="summary-row"><span>Envío</span><strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong></div>
          <div className="summary-row summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
          <p>Envío gratis en compras desde $50.000.</p>
          <Link className="button button-primary full-button" to="/checkout">Continuar al checkout</Link>
        </aside>
      </div>
    </main>
  );
}
