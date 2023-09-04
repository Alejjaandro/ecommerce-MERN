import { Router } from 'express';
const router = Router();

// Import Controllers
import {createOrder, updateOrder, deleteOrder, getUserOrder, getOrder, getAllOrders} from '../controllers/order.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.post("/", verifyUser, createOrder);
router.put("/:id", verifyUser, updateOrder);
router.delete("/:id", verifyUser, deleteOrder);
router.get("/find/:orderId", verifyUser, getOrder);
router.get("/find/:userId", verifyUser, getUserOrder);

router.get("/", verifyAdmin, getAllOrders);

export default router;