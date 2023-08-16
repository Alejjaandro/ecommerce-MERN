import { Router } from 'express';
const router = Router();

// Import Controllers
import {createCart, deleteCart, getUserCart, getAllCarts} from '../controllers/cart.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.post("/:id", verifyUser, createCart);
router.delete("/:id", verifyUser, deleteCart);
router.get("/find/:userId", verifyUser, getUserCart);

router.get("/", verifyAdmin, getAllCarts);

// router.put("/:id", verifyUser, updateCart);

export default router;