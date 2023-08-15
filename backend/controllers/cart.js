import Cart from '../models/Cart.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Cart ===== //
export const createCart = async (req, res) => {

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();

        res.status(200).json(savedCart);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== UPDATE Cart ===== //
export const updateCart = async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE Cart ===== //
export const deleteCart = async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json('Cart Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET User Cart ===== //
export const getUserCart = async (req, res) => {

    try {
        const cart = await Cart.find({ userId: req.params.userId });

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET all Carts ===== //
export const getAllCarts = async (req, res) => {

    try {
        const carts = await Cart.find();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json(error);
    }
};