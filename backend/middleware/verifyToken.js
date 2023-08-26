import jwt from 'jsonwebtoken';

// Function to validate Token.
export const verifyToken = (req, res, next) => {
    try {
        // Extract the cookie "token".
        const token = req.cookies.token;

        if (!token) { return res.status(401).json({ message: "Unauthorized" }) }

        // Verify cookie token.
        jwt.verify(token, process.env.JWT_KEY, (error, user) => {
            if (error) { return res.status(403).json({ message: "Token is not valid!" }) };

            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
    }

}

// ===== ONLY FOR THE USER OR AN ADMIN ===== //
export const verifyUser = (req, res, next) => {

    // This verifies the token & checks if the user id of the DB and the one send by URL params match.
    // If they don't match sends an error.
    verifyToken(req, res, next, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not authorized.");
        }
    })
}

// ===== ONLY ADMIN ===== //
export const verifyAdmin = (req, res, next) => {

    // This verifies the token & checks if the user is admin.
    verifyToken(req, res, next, () => {

        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not an Admin.");
        }
    })
}