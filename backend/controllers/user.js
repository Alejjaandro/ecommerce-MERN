import User from '../models/User.js';
import bcrypt from 'bcrypt';

// ===== GET user ===== //
export const getUser = async (req, res) => {

    try {
        // We find the user by its id.
        const user = await User.findById(req.params.id);

        // In case we don't want to show the password.
        const { password, ...noPassword } = user._doc;

        res.status(200).json(noPassword);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== PUT to updated user data ===== //
export const updateUser = async (req, res) => {

    const user = await User.findById(req.params.id);

    // We check if the body info it's the same that the one in the DB.
    if (req.body.email === user.email) {
        return res.status(400).json({ error: 'New Email cannot be the same as the old Email.' });
    }
    if (req.body.username === user.username) {
        return res.status(400).json({ error: 'New Username cannot be the same as the old Username.' });
    }
    if (req.body.password) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            return res.status(400).json({ error: 'New Password cannot be the same as the old Password.' });
        } else {
            req.body.password = bcrypt.hash(req.body.password, 10);
        }
    }

    // We find the user by its id and we set all the values that contains the body to modify.
    // The $set operator replaces the value of a field with the specified value.
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE to delete user ===== //
export const deleteUser = async (req, res) => {

    try {
        // We find the user by its id and we delete it.
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json('User Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET all users ===== //
export const getAllUsers = async (req, res) => {

    try {
        // We find all users.
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);
    }
};