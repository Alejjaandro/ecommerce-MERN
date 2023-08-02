const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const User = require('../models/User');

const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {

        req.body.password = bcrypt.hash(req.body.password, 10);
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new: true})

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json(error);
    }

});


module.exports = router;