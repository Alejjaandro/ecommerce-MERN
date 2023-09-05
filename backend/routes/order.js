import { Router } from 'express';
const router = Router();

// Import Controllers
import {createOrder, updateOrder, deleteOrder, getUserOrder, getOrder, getAllOrders} from '../controllers/order.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.post("/", verifyUser, createOrder);
router.put("/:orderId", verifyUser, updateOrder);
router.delete("/:orderId", verifyUser, deleteOrder);
router.get("/findOrder/:orderId", verifyUser, getOrder);
router.get("/find/:userId", verifyUser, getUserOrder);

router.get("/", verifyAdmin, getAllOrders);

export default router;