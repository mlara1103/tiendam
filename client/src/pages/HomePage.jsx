import { useEffect, useMemo, useState } from 'react';
import api, { getErrorMessage } from '../api/api';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ProductCard from '../components/ProductCard';
import SideBanner from '../components/SideBanner';
import StoreHero from '../components/StoreHero';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Todos');

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const genres = useMemo(
    () => ['Todos', ...new Set(products.map((product) => product.genre).filter(Boolean))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !normalizedSearch
        || `${product.title} ${product.artist}`.toLowerCase().includes(normalizedSearch);
      const matchesGenre = genre === 'Todos' || product.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [products, search, genre]);

  return (
    <main>
      <div className="container">
        <StoreHero />

        <section id="catalogo" className="catalog-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Catálogo actual</span>
              <h2>Encuentra tu próxima escucha</h2>
            </div>
            <p>{products.length} títulos disponibles en la colección.</p>
          </div>

          <div className="catalog-toolbar">
            <label className="search-field">
              <span>Buscar</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Disco o artista"
              />
            </label>
            <label>
              Género
              <select value={genre} onChange={(event) => setGenre(event.target.value)}>
                {genres.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          {loading && <LoadingState />}
          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && (
            <div className="catalog-layout">
              <SideBanner side="left" />
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
                {visibleProducts.length === 0 && (
                  <div className="grid-empty">
                    <EmptyState
                      title="No encontramos discos"
                      message="Prueba con otra búsqueda o agrega productos desde Administración."
                    />
                  </div>
                )}
              </div>
              <SideBanner side="right" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
