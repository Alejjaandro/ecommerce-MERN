// router is an express middleware to handle routes.
const router = require('express').Router();

// Importing the model for user.
const User = require("../models/User");

// Importing bcrypt to encrypt passwords.
const bcrypt = require('bcrypt');

// We create the endpoints & send a response. 

// ===== REGISTER ===== //
// We use an async function to wait for the data before continuing with the code execution.

router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // Encripting the password received from body.
        password: await bcrypt.hash(req.body.password, 10)
    });

    // "try/catch" to avoid code interruption.
    try {

        // save new user in the DB.
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== LOGIN ===== //
router.post('/login', async (req, res) => {

    try {
        // Search for the user by its email. If its email doesn't exists, sends an error.
        const user = await User.findOne( { email: req.body.email } );

        if(!user) {
            return res.status(400).json({message: "This email doesn't exist"})
        }

        // We compare the password received from the body with the one in the database.
        // If doesn't match sends an error.
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if(!passwordMatch) {
            return res.status(400).json({message: 'Wrong password'})
        }

        res.status(200).json( {message:'Login successfull', user: user} );

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;