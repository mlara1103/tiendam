const fs = require('fs/promises');
const path = require('path');
const Product = require('../models/Product');

function normalizeProductPayload(body) {
  return {
    title: body.title,
    artist: body.artist,
    genre: body.genre,
    format: body.format,
    year: body.year === '' || body.year === undefined ? undefined : Number(body.year),
    price: body.price === undefined ? undefined : Number(body.price),
    stock: body.stock === undefined ? undefined : Number(body.stock),
    description: body.description,
    featured: body.featured === true || body.featured === 'true'
  };
}

async function deleteLocalImage(imagePath) {
  if (!imagePath || !imagePath.startsWith('/uploads/')) return;

  const filename = path.basename(imagePath);
  const absolutePath = path.join(__dirname, '..', 'uploads', filename);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`No se pudo eliminar la imagen ${filename}: ${error.message}`);
    }
  }
}

async function getProducts(req, res, next) {
  try {
    const search = String(req.query.search || '').trim();
    const genre = String(req.query.genre || '').trim();
    const filter = {};

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: escaped, $options: 'i' } },
        { artist: { $regex: escaped, $options: 'i' } }
      ];
    }

    if (genre) filter.genre = genre;

    const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const payload = normalizeProductPayload(req.body);
    if (req.file) payload.image = `/uploads/${req.file.filename}`;

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    if (req.file) await deleteLocalImage(`/uploads/${req.file.filename}`);
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      if (req.file) await deleteLocalImage(`/uploads/${req.file.filename}`);
      res.status(404);
      throw new Error('Producto no encontrado.');
    }

    const previousImage = product.image;
    Object.assign(product, normalizeProductPayload(req.body));

    if (req.file) product.image = `/uploads/${req.file.filename}`;

    const updatedProduct = await product.save();

    if (req.file && previousImage && previousImage !== updatedProduct.image) {
      await deleteLocalImage(previousImage);
    }

    res.json(updatedProduct);
  } catch (error) {
    if (req.file) {
      const product = await Product.findById(req.params.id).catch(() => null);
      const newPath = `/uploads/${req.file.filename}`;
      if (!product || product.image !== newPath) await deleteLocalImage(newPath);
    }
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Producto no encontrado.');
    }

    await product.deleteOne();
    await deleteLocalImage(product.image);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
