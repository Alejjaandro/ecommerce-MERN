// router is an express middleware to handle routes.
import { Router } from "express";
const router = Router();

import jwt from 'jsonwebtoken';

// Import Controllers
import { register, login } from '../controllers/auth.js';

// Import validators
import { validator } from "../middleware/validator.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";

// We create the endpoints. 
// First we validate the form imputs data, then we make the pretition.

router.post("/register", validator(registerValidator), register);
router.post("/login", validator(loginValidator), login);

// Function to verify the cookie token. We send it in the Headers.
router.get('/verifyToken', (req, res) => {
    
    try {
        const token = req.headers['token'];

        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
    
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // If the token is valid, returns the info.
            res.status(200).send(decoded);
        });

    } catch (error) {
        console.log(error);
    }
});

export default router;