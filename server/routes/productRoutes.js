const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts).post(upload.single('image'), createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

module.exports = router;
