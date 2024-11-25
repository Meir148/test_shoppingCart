import express from 'express';
import { getAllTheProducts, getOneProduct, update } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get("/", getAllTheProducts);
router.get("/:id", getOneProduct);
router.put("/:id", authenticate , update);

export { router as productRoutes };
