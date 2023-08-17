import Cart from '../models/Cart.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE & UPDATE Cart ===== //
export const createCart = async (req, res) => {

    // We extract what we need from req.
    const { userId, product, quantity } = req.body;

    try {
        // We search for a cart with the userId and we push into products array the new product and its quantity.
        // The option {upsert: true} tells mongoDB to create one if it didn't find one.
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: userId},
            { $push: { products: { product, quantity } } },
            { new: true, upsert: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Product added to Cart', updatedCart });

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
        const cart = await Cart.findById(req.params.userId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

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