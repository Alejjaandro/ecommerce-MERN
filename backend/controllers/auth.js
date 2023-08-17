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
            return res.status(400).json(['This email already exists']);
        }
    
        const newUser = new User({
            name,
            lastname,
            username,
            email,
            // Encripting the password received from body.
            password: await bcrypt.hash(password, 10)
        });

        // save new user in the DB.
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

        next();

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// ===== LOGIN ===== //
export const login = async (req, res) => {

    try {
        // Search for the user by its email. If its email doesn't exists, sends an error.
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "This email doesn't exist" })
        }

        // We compare the password received from the body with the one in the database.
        // If doesn't match sends an error.
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        // Create a security Token.
        const accessToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );
        
        return res.cookie('token', accessToken, {httpOnly : false})
        .status(200)
        .json({ message: 'Login successfull', user: user, token: accessToken });

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// ----- LOGOUT ----- //
export const logout = async (req, res) => {

    // We clear the token to logout
    return res.clearCookie('token')
    .status(200)
    .json({message: "Successfully Logout"});
};