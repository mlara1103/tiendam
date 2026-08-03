const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    console.error(`No fue posible conectar con MongoDB: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDatabase;
