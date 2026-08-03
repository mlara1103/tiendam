const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDatabase = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    title: 'Midnight Signals',
    artist: 'The North Lines',
    genre: 'Indie Rock',
    format: 'Vinilo',
    year: 2024,
    price: 24990,
    stock: 8,
    featured: true,
    description: 'Edición en vinilo de 180 gramos con una mezcla cálida, guitarras expansivas y una presentación minimalista.'
  },
  {
    title: 'Neon Transit',
    artist: 'Satellite Youth',
    genre: 'Synthpop',
    format: 'Vinilo',
    year: 2023,
    price: 22990,
    stock: 5,
    featured: true,
    description: 'Un recorrido nocturno de sintetizadores brillantes, bajos definidos y coros memorables.'
  },
  {
    title: 'Quiet Architecture',
    artist: 'Mika Rowan',
    genre: 'Jazz',
    format: 'CD',
    year: 2022,
    price: 14990,
    stock: 12,
    description: 'Jazz contemporáneo íntimo, con piano, contrabajo y arreglos delicados para una escucha detallada.'
  },
  {
    title: 'Coastal Static',
    artist: 'Blue Frequency',
    genre: 'Alternative',
    format: 'Cassette',
    year: 2021,
    price: 11990,
    stock: 4,
    description: 'Cassette de edición limitada, con texturas lo-fi y melodías inspiradas en carreteras costeras.'
  },
  {
    title: 'After the Last Train',
    artist: 'City Platform',
    genre: 'Post Rock',
    format: 'Vinilo',
    year: 2020,
    price: 26990,
    stock: 7,
    description: 'Composiciones instrumentales de desarrollo lento, crescendos amplios y una producción cinematográfica.'
  },
  {
    title: 'Golden Room Sessions',
    artist: 'The Paper Suns',
    genre: 'Soul',
    format: 'CD',
    year: 2019,
    price: 13990,
    stock: 10,
    description: 'Sesiones en vivo con voces orgánicas, metales suaves y una interpretación cercana.'
  }
];

async function seed() {
  try {
    await connectDatabase();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Productos de ejemplo cargados correctamente.');
  } catch (error) {
    console.error(`Error al cargar datos: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
