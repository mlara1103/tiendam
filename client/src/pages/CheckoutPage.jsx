import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  paymentMethod: 'Tarjeta simulada'
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 3990;
  const total = subtotal + shipping;

  function validate() {
    const nextErrors = {};
    if (form.fullName.trim().length < 3) nextErrors.fullName = 'Ingresa tu nombre completo.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Ingresa un correo válido.';
    if (form.address.trim().length < 6) nextErrors.address = 'Ingresa una dirección válida.';
    if (form.city.trim().length < 2) nextErrors.city = 'Ingresa tu ciudad.';
    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const confirmation = {
      number: `GS-${Date.now().toString().slice(-8)}`,
      customer: form.fullName,
      email: form.email,
      total
    };
    setOrder(confirmation);
    clearCart();
  }

  if (order) {
    return (
      <main className="container page-section">
        <section className="panel checkout-success">
          <span className="success-icon">✓</span>
          <span className="eyebrow">Compra simulada</span>
          <h1>Pedido confirmado</h1>
          <p>Gracias, {order.customer}. Enviamos una confirmación simulada a <strong>{order.email}</strong>.</p>
          <div className="confirmation-box">
            <span>Número de pedido</span><strong>{order.number}</strong>
            <span>Total</span><strong>{formatCurrency(order.total)}</strong>
          </div>
          <Link className="button button-primary" to="/">Volver a la tienda</Link>
        </section>
      </main>
    );
  }

  if (items.length === 0) return <Navigate to="/carrito" replace />;

  return (
    <main className="container page-section">
      <div className="checkout-heading">
        <Link className="back-link" to="/carrito">← Volver al carrito</Link>
        <span>Checkout seguro · Demostración</span>
      </div>

      <div className="checkout-layout">
        <form className="panel checkout-form" onSubmit={handleSubmit} noValidate>
          <span className="eyebrow">Datos de entrega</span>
          <h1>Finalizar compra</h1>
          <p>Completa los campos mínimos para simular la confirmación del pedido.</p>

          <label>
            Nombre completo
            <input name="fullName" value={form.fullName} onChange={handleChange} autoComplete="name" />
            {errors.fullName && <small className="field-error">{errors.fullName}</small>}
          </label>
          <label>
            Correo electrónico
            <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </label>
          <label>
            Dirección
            <input name="address" value={form.address} onChange={handleChange} autoComplete="street-address" />
            {errors.address && <small className="field-error">{errors.address}</small>}
          </label>
          <label>
            Ciudad
            <input name="city" value={form.city} onChange={handleChange} autoComplete="address-level2" />
            {errors.city && <small className="field-error">{errors.city}</small>}
          </label>
          <label>
            Método de pago
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option>Tarjeta simulada</option>
              <option>Transferencia simulada</option>
            </select>
          </label>

          <button className="button button-primary full-button" type="submit">
            Comprar por {formatCurrency(total)}
          </button>
          <small className="checkout-note">No se procesa ningún pago real.</small>
        </form>

        <aside className="panel checkout-summary">
          <span className="eyebrow">Resumen del pedido</span>
          <h2>{items.length} producto{items.length !== 1 ? 's' : ''}</h2>
          <div className="checkout-lines">
            {items.map((item) => (
              <div className="checkout-line" key={item._id}>
                <span>{item.quantity} × {item.title}</span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className="summary-row"><span>Envío</span><strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong></div>
          <div className="summary-row summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
        </aside>
      </div>
    </main>
  );
}
