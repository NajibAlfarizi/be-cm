import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductsByCategory, getProductsByName, getProductsByPriceRange, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { uploads } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllProducts)
router.get('/:id', getProductById);
router.get('/:name', getProductsByName);
router.get('/category/:category', getProductsByCategory);
router.get('/price/:price', getProductsByPriceRange);
router.post('/', protect, admin, uploads.single("gambar"), createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router;