import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Function to validate Token.
const verifyToken = (req, res, next) => {

    // // We extract the token saved on the header.
    // const headerToken = req.headers.token;

    // if (!headerToken) {
    //     return res.status(400).json({ messsage: 'No token. Denied Access.' });
    // }

    // // We verify the token
    // jwt.verify(headerToken, process.env.JWT_KEY, (error, user) => {

    //     if (error) {
    //         return res.status(400).json({ messsage: 'Invalid Token.' });
    //     }

    //     // We save the decodified user in req.
    //     req.user = user;

    //     next();
    // })

    // Extract the cookie "token".
    const { token } = req.cookies;

    if (!token) { res.status(401).json({ message: "Unauthorized" }) }

    // Verify cookie token.
    jwt.verify(token, process.env.JWT_KEY, async (error, user) => {
        if (error) { return res.status(401).json({ message: "Unauthorized" }) }

        const userFound = await User.findById(user.id);

        if (!userFound) { res.status(401).json({ message: "Unauthorized" }) }

        // We save the decodified user in req.
        req.user = user;

        next();
    });

}

// ===== ONLY FOR THE USER OR AN ADMIN ===== //
const verifyTokenAndAuthorization = (req, res, next) => {

    // This verifies the token & checks if the user id of the DB and the one send by URL params match.
    // If they don't match sends an error.
    verifyToken(req, res, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not authorized.")
        }
    })
}

// ===== ONLY ADMIN ===== //
const verifyTokenAndAdmin = (req, res, next) => {

    // This verifies the token & checks if the user is admin.
    verifyToken(req, res, () => {

        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not authorized.")
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };