// router is an express middleware to handle routes.
import { Router } from "express";
const router = Router();

import jwt from 'jsonwebtoken';

// Import Controllers
import { register, login, verifyToken } from '../controllers/auth.js';

// Import validators
import { validator } from "../middleware/validator.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";

// We create the endpoints. 
// First we validate the form imputs data, then we make the pretition.

router.post("/register", validator(registerValidator), register);
router.post("/login", validator(loginValidator), login);

router.get('/verifyToken', verifyToken);

export default router;