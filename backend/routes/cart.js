import { Router } from 'express';
const router = Router();

// Import Controllers
import {createCart, deleteProduct, deleteCart, getUserCart, getAllCarts} from '../controllers/cart.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.get("/find/:userId", verifyUser, getUserCart);

router.post("/:userId", verifyUser, createCart);

router.delete("/:userId/:productId", verifyUser, deleteProduct);

router.delete("/:userId", verifyUser, deleteCart);

router.get("/", verifyAdmin, getAllCarts);

// router.put("/:id", verifyUser, updateCart);

export default router;