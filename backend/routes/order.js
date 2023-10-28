import { Router } from 'express';
const router = Router();

// Import Controllers
import {createOrder, updateOrder, deleteOrder, getUserOrder, getOrder, getAllOrders} from '../controllers/order.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';
import { validator } from '../middleware/validator.js';
import { userOrderValidator } from '../validators/order.validator.js';

// We create the endpoints. 

router.get("/findOrder/:orderId", verifyUser, getOrder);
router.get("/find/:userId", verifyUser, getUserOrder);

router.post("/:userId", verifyUser, validator(userOrderValidator), createOrder);
router.put("/:orderId", verifyUser, updateOrder);
router.delete("/:orderId", verifyUser, deleteOrder);

router.get("/", verifyAdmin, getAllOrders);

export default router;