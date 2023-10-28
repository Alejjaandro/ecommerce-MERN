// Importing the model for user.
import User from '../models/User.js';

// Importing bcrypt to encrypt passwords.
import bcrypt from 'bcrypt';

// Importing jsonwebtoken to provide a token for security.
import jwt from 'jsonwebtoken';


// ===== REGISTER ===== //
// We use an async function to wait for the data before continuing with the code execution.

export const register = async (req, res, next) => {
    // Extract the info from the body.
    const { name, lastname, username, email, password } = req.body;

    // "try/catch" to avoid code interruption.
    try {

        // Check if the email is already registered.
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.status(400).json({message: ['This email already exists']});
        }

        const newUser = new User({
            name,
            lastname,
            username,
            email,
            // Encripting the password received from body.
            password: await bcrypt.hash(password, 10),
        });
        // save new user in the DB.
        const savedUser = await newUser.save();

        // Create a security Token without the password.
        const { password: savedPassword, ...userWithoutPassword } = savedUser.toObject();
        const accessToken = jwt.sign(
            userWithoutPassword,
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
        
        return res.cookie('token', accessToken, { httpOnly: false })
        .status(200)
        .json({ message: ['Login successfull'], user: userWithoutPassword, token: accessToken });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// ===== LOGIN ===== //
export const login = async (req, res) => {

    try {
        // Search for the user by its email. If its email doesn't exists, sends an error.
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: ["This email doesn't exist"] })
        }

        // We compare the password received from the body with the one in the database.
        // If doesn't match sends an error.
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: ['Wrong password'] })
        }

        // Create a security Token without the password.
        const { password, ...userWithoutPassword } = user.toObject();
        const accessToken = jwt.sign(
            userWithoutPassword,
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            message: ['Login successfull'], 
            user: userWithoutPassword, 
            token: accessToken 
        });

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ----- LOGOUT ----- //
export const logout = async (req, res) => {

    // We clear the token to logout
    return res.clearCookie('token')
        .status(200)
        .json({ message: ["Successfully Logout"] });
};

// ----- VERIFY TOKEN ----- //
export const verifyToken = async (req, res) => {

    try {
        const token = req.headers['token'];

        if (!token) {
            return res.status(403).send({ message: ['No token provided.'] });
        }

        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.status(500).send({ message: ['Token expired.'] });
            }
            // If the token is valid, returns the info.
            return res.status(200).send(decoded);
        });

    } catch (error) {
        console.log(error);
    }
};