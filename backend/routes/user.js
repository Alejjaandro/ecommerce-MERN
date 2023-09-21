import { Router } from 'express';
const router = Router();

// Import Controllers
import { updateUser, adminUpdateUser, deleteUser, getUser, getAllUsers} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// Import validators
import { validator } from "../middleware/validator.js";
import { updateUserValidator } from "../validators/user.validator.js";

// We create the endpoints. 
router.get("/find/:userId", verifyUser, getUser);
router.put("/:id",verifyUser, validator(updateUserValidator), updateUser);
router.delete("/:id", verifyUser, deleteUser);

router.get("/", verifyAdmin, getAllUsers);
router.put("/adminUpdate/:userId", verifyAdmin, adminUpdateUser);

export default router;