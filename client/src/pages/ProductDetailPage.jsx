import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { API_BASE_URL, getErrorMessage } from '../api/api';
import LoadingState from '../components/LoadingState';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <main className="container page-section"><LoadingState label="Cargando disco..." /></main>;
  if (error || !product) {
    return (
      <main className="container page-section">
        <div className="alert alert-error">{error || 'Producto no encontrado.'}</div>
        <Link className="button button-ghost" to="/">Volver al catálogo</Link>
      </main>
    );
  }

  const imageSource = product.image ? `${API_BASE_URL}${product.image}` : '/placeholder-album.svg';

  return (
    <main className="container page-section">
      <Link className="back-link" to="/">← Volver al catálogo</Link>
      <article className="product-detail panel">
        <div className="detail-image-wrap">
          <img
            src={imageSource}
            alt={`Portada de ${product.title}`}
            onError={(event) => { event.currentTarget.src = '/placeholder-album.svg'; }}
          />
        </div>
        <div className="detail-copy">
          <div className="product-meta">
            <span>{product.format}</span>
            <span>{product.genre}</span>
            {product.year && <span>{product.year}</span>}
          </div>
          <h1>{product.title}</h1>
          <p className="detail-artist">{product.artist}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-purchase">
            <div>
              <strong>{formatCurrency(product.price)}</strong>
              <small>{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Producto agotado'}</small>
            </div>
            <button
              className="button button-primary"
              type="button"
              disabled={product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
