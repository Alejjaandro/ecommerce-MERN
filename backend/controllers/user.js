import User from '../models/User.js';
import Cart from '../models/Cart.js';
import bcrypt from 'bcrypt';
import Order from '../models/Order.js';

// ===== GET user ===== //
export const getUser = async (req, res) => {

    try {
        // We find the user by its id.
        const user = await User.findById(req.params.userId);

        // In this case we don't want to show the password.
        const { password, ...noPassword } = user._doc;
        return res.status(200).json(noPassword);

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== PUT to updated user data ===== //
export const updateUser = async (req, res) => {

    const user = await User.findById(req.params.id);
    // We check if the body info it's the same that the one in the DB.
    if (req.body.email === user.email) {
        return res.status(400).json({ message: ['New Email cannot be the same as the old Email.'] });
    }
    if (req.body.username === user.username) {
        return res.status(400).json({ message: ['New Username cannot be the same as the old Username.'] });
    }
    if (req.body.password) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            return res.status(400).json({ message: ['New Password cannot be the same as the old Password.'] });
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
    }

    // We find the user by its id and we set all the values that contains the body to modify.
    // The $set operator replaces the value of a field with the specified value.
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        return res.status(200).json({ message: 'User info Updated', updatedUser: updatedUser });

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== DELETE to delete user ===== //
export const deleteUser = async (req, res) => {

    try {
        // Delete the user's cart
        await Cart.findOneAndDelete({ _id: req.params.id });
        // Delete all orders that contain the userId.
        await Order.deleteMany({ userId: req.params.id });

        // // We find the user by its id and we delete it.
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json('User Deleted');

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== GET all users ===== //
export const getAllUsers = async (req, res) => {

    try {
        // We find all users.
        const users = await User.find();
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== PUT for ADMIN Updates ===== //
// In the admin form, we have the previous info of the user, so if we don't want to change it
// we just send it back to the backend and we don't change it.
export const adminUpdateUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);
        if (req.body.password) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                return res.status(400).json({ message: ['New Password cannot be the same as the old Password.'] });
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true })

        const { password, ...noPasswordUpdatedUser } = updatedUser._doc;
        return res.status(200).json({ message: 'User info Updated', updatedUser: noPasswordUpdatedUser });

    } catch (error) {
        return res.status(500).json(error);
    }
};