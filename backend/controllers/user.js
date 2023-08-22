import User from '../models/User.js';

// ===== PUT to updated user data ===== //
export const updateUser = async (req, res) => {

    // We check if the body has a password & we encrypt it.
    if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password, 10);
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