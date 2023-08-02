// router is an express middleware to handle routes.
const router = require('express').Router();

// We create some endpoints for user that send a response. 

router.get('/usertest', (req, res) => {
    res.send("User test successfull");
});

router.post('/userpost', (req, res) => {
    const username = req.body.username;

    res.send(username);
});

module.exports = router;