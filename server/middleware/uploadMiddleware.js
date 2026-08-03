const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const safeBaseName = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .slice(0, 50);

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeBaseName}${path
      .extname(file.originalname)
      .toLowerCase()}`;

    callback(null, uniqueName);
  }
});

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

function fileFilter(_req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    return callback(new Error('Formato no permitido. Usa JPG, PNG o WEBP.'));
  }

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
