const multer = require('multer');

function notFound(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, _req, res, _next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message || 'Ocurrió un error inesperado.';

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Producto no encontrado.';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(' ');
  }

  if (error instanceof multer.MulterError) {
    statusCode = 400;
    message = error.code === 'LIMIT_FILE_SIZE'
      ? 'La imagen supera el máximo de 5 MB.'
      : `Error al subir la imagen: ${error.message}`;
  }

  if (message.includes('Formato no permitido')) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
}

module.exports = { notFound, errorHandler };
