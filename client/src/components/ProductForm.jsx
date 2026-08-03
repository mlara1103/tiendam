import { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../api/api';

const EMPTY_FORM = {
  title: '',
  artist: '',
  genre: '',
  format: 'Vinilo',
  year: '',
  price: '',
  stock: '',
  description: '',
  featured: false
};

export default function ProductForm({ product, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || '',
        artist: product.artist || '',
        genre: product.genre || '',
        format: product.format || 'Vinilo',
        year: product.year || '',
        price: product.price ?? '',
        stock: product.stock ?? '',
        description: product.description || '',
        featured: Boolean(product.featured)
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setImage(null);
  }, [product]);

  const preview = useMemo(() => {
    if (image) return URL.createObjectURL(image);
    if (product?.image) return `${API_BASE_URL}${product.image}`;
    return '/placeholder-album.svg';
  }, [image, product]);

  useEffect(() => {
    return () => {
      if (image && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [image, preview]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);
    const succeeded = await onSubmit(data);
    if (succeeded && !product) {
      setForm(EMPTY_FORM);
      setImage(null);
    }
  }

  return (
    <form className="product-form panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Panel de catálogo</span>
          <h2>{product ? 'Editar disco' : 'Agregar un disco'}</h2>
        </div>
        {product && (
          <button type="button" className="text-button" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </div>

      <div className="form-layout">
        <div className="image-field">
          <img src={preview} alt="Vista previa de portada" />
          <label className="file-button">
            {image ? 'Cambiar archivo' : 'Seleccionar portada'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
          </label>
          <small>JPG, PNG o WEBP · máximo 5 MB</small>
        </div>

        <div className="form-grid">
          <label>
            Título
            <input name="title" value={form.title} onChange={handleChange} required maxLength="120" />
          </label>
          <label>
            Artista
            <input name="artist" value={form.artist} onChange={handleChange} required maxLength="100" />
          </label>
          <label>
            Género
            <input name="genre" value={form.genre} onChange={handleChange} required maxLength="60" placeholder="Rock, Jazz, Pop..." />
          </label>
          <label>
            Formato
            <select name="format" value={form.format} onChange={handleChange}>
              <option>Vinilo</option>
              <option>CD</option>
              <option>Cassette</option>
            </select>
          </label>
          <label>
            Año
            <input name="year" type="number" min="1900" max="2100" value={form.year} onChange={handleChange} />
          </label>
          <label>
            Precio CLP
            <input name="price" type="number" min="0" step="1" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required />
          </label>
          <label className="checkbox-field">
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
            Mostrar como destacado
          </label>
          <label className="full-field">
            Descripción
            <textarea name="description" value={form.description} onChange={handleChange} required maxLength="1200" rows="5" />
          </label>
        </div>
      </div>

      <button className="button button-primary form-submit" type="submit" disabled={busy}>
        {busy ? 'Guardando...' : product ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </form>
  );
}
