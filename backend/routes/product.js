import { Router } from 'express';
const router = Router();

// Import Controllers
import {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts} from '../controllers/product.js';
import { verifyAdmin } from '../middleware/verifyToken.js';
import { validator } from '../middleware/validator.js';
import { productValidator } from '../validators/productValidator.js';

// We create the endpoints. 

router.post("/", verifyAdmin, validator(productValidator), createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

router.get("/find/:id", getProduct);
router.get("/", getAllProducts);

export default router;