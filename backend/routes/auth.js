// router is an express middleware to handle routes.
import { Router } from "express";
const router = Router();

// Import Controllers
import {register, login} from '../controllers/auth.js';

// Import validators
import { validator } from "../middleware/validator.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";

// We create the endpoints. 
// First we validate the form imputs data, then we make the pretition.

router.post("/register", validator(registerValidator), register);
router.post("/login", validator(registerValidator), login);

export default router;