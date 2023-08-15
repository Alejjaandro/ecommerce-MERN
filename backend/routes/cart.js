import { Router } from 'express';
const router = Router();

// Import Controllers
import {createCart, updateCart, deleteCart, getUserCart, getAllCarts} from '../controllers/cart.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.post("/", verifyUser, createCart);
router.put("/:id", verifyUser, updateCart);
router.delete("/:id", verifyUser, deleteCart);
router.get("/find/:userId", verifyUser, getUserCart);

router.get("/", verifyAdmin, getAllCarts);

export default router;