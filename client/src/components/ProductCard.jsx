import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/api';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imageSource = product.image
    ? `${API_BASE_URL}${product.image}`
    : '/placeholder-album.svg';

  return (
    <article className="product-card">
      <Link to={`/productos/${product._id}`} className="product-image-wrap">
        {product.featured && <span className="product-badge">Destacado</span>}
        <img
          className="product-image"
          src={imageSource}
          alt={`Portada de ${product.title}`}
          onError={(event) => { event.currentTarget.src = '/placeholder-album.svg'; }}
        />
      </Link>

      <div className="product-body">
        <div className="product-meta">
          <span>{product.format}</span>
          <span>{product.genre}</span>
        </div>
        <Link to={`/productos/${product._id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>
        <p className="product-artist">{product.artist}</p>
        <div className="product-footer">
          <div>
            <strong>{formatCurrency(product.price)}</strong>
            <small>{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</small>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            aria-label={`Agregar ${product.title} al carrito`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
