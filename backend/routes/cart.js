import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../middleware/verifyToken.js';

import Cart from '../models/Cart.js';

import { Router } from 'express';
const router = Router();

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Cart ===== //
router.post('/', verifyToken, async (req, res) => {

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();

        res.status(200).json(savedCart);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== UPDATE Cart ===== //
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== DELETE Cart ===== //
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json('Cart Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET User Cart ===== //
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const cart = await Cart.findOne({ userId: req.params.userId });

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET all Carts ===== //
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const carts = await Cart.find();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json(error);
    }
});


export default router;