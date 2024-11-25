import express from 'express';
import { getAllTheProducts, getOneProduct, update } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get("/", authenticate, getAllTheProducts);

router.get("/:id", authenticate, getOneProduct);

router.put("/:id", authenticate, update);

export { router as productRoutes };
