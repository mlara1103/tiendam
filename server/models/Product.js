const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      trim: true,
      maxlength: [120, 'El título no puede superar los 120 caracteres.']
    },
    artist: {
      type: String,
      required: [true, 'El artista es obligatorio.'],
      trim: true,
      maxlength: [100, 'El artista no puede superar los 100 caracteres.']
    },
    genre: {
      type: String,
      required: [true, 'El género es obligatorio.'],
      trim: true,
      maxlength: [60, 'El género no puede superar los 60 caracteres.']
    },
    format: {
      type: String,
      enum: ['Vinilo', 'CD', 'Cassette'],
      default: 'Vinilo'
    },
    year: {
      type: Number,
      min: [1900, 'El año debe ser igual o posterior a 1900.'],
      max: [2100, 'El año no puede ser posterior a 2100.']
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio.'],
      min: [0, 'El precio no puede ser negativo.']
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio.'],
      min: [0, 'El stock no puede ser negativo.'],
      default: 0
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria.'],
      trim: true,
      maxlength: [1200, 'La descripción no puede superar los 1200 caracteres.']
    },
    image: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
