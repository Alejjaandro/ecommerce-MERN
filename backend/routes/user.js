const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const User = require('../models/User');

const router = require('express').Router();

// ===== PUT to updated user data ===== //
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

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
});

// ===== DELETE to delete user ===== //
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        // We find the user by its id and we delete it.
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json('User Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;