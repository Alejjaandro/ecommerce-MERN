import { Router } from 'express';
const router = Router();

// Import Controllers
import { updateUser, adminUpdateUser, deleteUser, getUser, getAllUsers} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

// Import validators
import { validator } from "../middleware/validator.js";
import { updateUserValidator } from "../validators/user.validator.js";
import { adminUpdateUserValidator } from "../validators/adminUpdateUser.validator.js";

// We create the endpoints. 
router.get("/find/:userId", verifyUser, getUser);
router.put("/:userId",verifyUser, validator(updateUserValidator), updateUser);
router.delete("/:userId", verifyUser, deleteUser);

router.get("/", verifyAdmin, getAllUsers);
router.put("/adminUpdate/:userId", verifyAdmin, validator(adminUpdateUserValidator), adminUpdateUser);

export default router;