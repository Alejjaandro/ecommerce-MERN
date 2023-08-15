import { Router } from 'express';
const router = Router();

// Import Controllers
import { updateUser, deleteUser, getUser, getAllUsers} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// We create the endpoints. 

router.put("/:id",verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/find/:userId", verifyUser, getUser);

router.get("/", verifyAdmin, getAllUsers);

export default router;