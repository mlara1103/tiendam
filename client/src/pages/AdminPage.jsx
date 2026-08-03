import { useCallback, useEffect, useState } from 'react';
import api, { API_BASE_URL, getErrorMessage } from '../api/api';
import LoadingState from '../components/LoadingState';
import ProductForm from '../components/ProductForm';
import { formatCurrency } from '../utils/currency';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  async function handleSubmit(formData) {
    setBusy(true);
    setMessage({ type: '', text: '' });
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        setMessage({ type: 'success', text: 'Producto actualizado correctamente.' });
      } else {
        await api.post('/products', formData);
        setMessage({ type: 'success', text: 'Producto creado correctamente.' });
      }
      setEditingProduct(null);
      await loadProducts();
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`¿Eliminar “${product.title}”? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    try {
      await api.delete(`/products/${product._id}`);
      if (editingProduct?._id === product._id) setEditingProduct(null);
      setMessage({ type: 'success', text: 'Producto eliminado correctamente.' });
      await loadProducts();
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
    }
  }

  return (
    <main className="container page-section admin-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Administración</span>
          <h1>Gestiona el catálogo</h1>
        </div>
        <p>Crea, edita y elimina discos sin salir de la tienda.</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <ProductForm
        product={editingProduct}
        busy={busy}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />

      <section className="panel admin-list-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Inventario</span>
            <h2>{products.length} productos</h2>
          </div>
        </div>

        {loading ? <LoadingState /> : (
          <div className="admin-list">
            {products.map((product) => {
              const imageSource = product.image ? `${API_BASE_URL}${product.image}` : '/placeholder-album.svg';
              return (
                <article className="admin-product" key={product._id}>
                  <img
                    src={imageSource}
                    alt=""
                    onError={(event) => { event.currentTarget.src = '/placeholder-album.svg'; }}
                  />
                  <div className="admin-product-copy">
                    <strong>{product.title}</strong>
                    <span>{product.artist} · {product.format}</span>
                  </div>
                  <div className="admin-product-price">
                    <strong>{formatCurrency(product.price)}</strong>
                    <span>Stock: {product.stock}</span>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="button button-small button-ghost" onClick={() => {
                      setEditingProduct(product);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                      Editar
                    </button>
                    <button type="button" className="button button-small button-danger" onClick={() => handleDelete(product)}>
                      Eliminar
                    </button>
                  </div>
                </article>
              );
            })}
            {products.length === 0 && <p className="muted-center">Todavía no hay productos en el catálogo.</p>}
          </div>
        )}
      </section>
    </main>
  );
}
