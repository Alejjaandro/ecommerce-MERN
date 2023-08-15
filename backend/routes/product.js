import { Router } from 'express';
const router = Router();

// Import Controllers
import {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts} from '../controllers/product.js';
import { verifyAdmin } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

router.get("/find/:userId", getProduct);
router.get("/", getAllProducts);

export default router;