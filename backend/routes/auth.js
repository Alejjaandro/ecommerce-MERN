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


router.get('/verify', (req, res) => {
    try {
        // Extract the cookie "token".
        const token = req.cookies.token;

        if (!token) { res.status(401).json({ message: "Unauthorized" }) }

        // Verify cookie token.
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) { res.status(403).json({ message: "Token is not valid!" }) };

            req.user = user;
            res.status(200).json({ message: "Verified", user: user })
        });

    } catch (error) {
        console.log(error);
    }

});

export default router;