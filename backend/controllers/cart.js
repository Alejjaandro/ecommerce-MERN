import Cart from '../models/Cart.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE & UPDATE Cart ===== //
export const createCart = async (req, res) => {

    // We extract what we need from req.
    const { userId, product, quantity } = req.body;
    let { color, ram } = req.body;

    // To avoid letting the fields empty if the user doesn't choose.
    color ? color = color : color = "Not Choosen";
    ram ? ram = ram : ram = "Not Choosen";

    console.log(userId, product._id, quantity);
    
    try {
        // We check if the product already exists in the cart.
        const productExists = await Cart.findOne({ _id: userId, 'products.product._id': product._id });

        if (productExists) {
            // If it does, update its quantity using $inc.
            await Cart.findOneAndUpdate(
                { _id: userId, 'products.product._id': product._id },
                { $inc: { 'products.$.quantity': quantity } }
            );
            
        } else {

            // We search for a cart with the userId and we push into products array the new product and its features.
            // The option {upsert: true} tells mongoDB to create one if it didn't find one.
            const updatedCart = await Cart.findOneAndUpdate(
                { _id: userId},
                { $push: { products: { product, quantity, color, ram } } },
                { new: true, upsert: true }
            );
    
            if (!updatedCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
        }

        res.status(200).json({ message: 'Product added to Cart' });

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE Product from Cart ===== //
export const deleteProduct = async (req, res) => {
    // We extract what we need from params
    const { userId, productId } = req.params;

    try {
        // Find users cart.
        const cart = await Cart.findOne({ _id: userId });
        // Filter the products array in the cart to keep all except the one we want to remove.
        cart.products = cart.products.filter((product) => product.product._id !== productId);
        // Save changes.
        await cart.save();
        res.status(200).json({ message: 'Product Deleted' });

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE Product from Cart ===== //
export const deleteCart = async (req, res) => {

    const { userId } = req.params;

    try {
        await Cart.findOneAndDelete({ _id: userId });
        res.status(200).json({ message: 'Cart Deleted' });

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