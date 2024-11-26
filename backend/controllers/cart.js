import Cart from '../models/Cart.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE & UPDATE Cart ===== //
export const createCart = async (req, res) => {

    // We extract what we need from req.
    const { userId } = req.params;
    const product = req.body;

    try {
        // We check if the user has a cart.
        let cartExist = await Cart.findOne({ _id: userId });
        if (!cartExist) {
            const newCart = await Cart.findOneAndUpdate(
                { _id: userId },
                {
                    $push: { products: product },
                    $inc: {
                        productsQuantity: product.quantity,
                        totalPrice: product.price * product.quantity
                    },
                },
                { new: true, upsert: true }
            );

            return res.status(200).json({ cart: newCart });
        } else {
            // We check if there is product with same properties in the cart.
            let sameProduct = cartExist.products.find(prod => (prod._id === product._id));

            if (sameProduct) {

                // We increase the quantity of the product.
                sameProduct.quantity += product.quantity;
                cartExist.productsQuantity += product.quantity;
                cartExist.totalPrice += product.price * product.quantity;

                // Mark the cart as modified to save the changes.
                cartExist.markModified('products');

                // Save the updated cart.
                const updatedCart = await cartExist.save();
                return res.status(200).json({ cart: updatedCart });

            } else {
                // If there is no product with same properties, we add the product to the cart.
                const updatedCart = await Cart.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: { products: product },
                        $inc: {
                            productsQuantity: product.quantity,
                            totalPrice: product.price * product.quantity
                        },
                    },
                    { new: true }
                );

                return res.status(200).json({ cart: updatedCart });
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== DELETE Product from Cart ===== //
export const deleteProduct = async (req, res) => {
    const { userId, productId } = req.params;
    const productToDelete = req.body;

    try {
        // Find the cart of the user.
        const cart = await Cart.findOne({ _id: userId });
        // Find the products of the cart with the same id as the product to be deleted.
        const products = cart.products.filter((product) => product._id === productId);

        // Search for the product with the same properties to be deleted.
        for (let product of products) {
            if (product.color === productToDelete.color && product.ram === productToDelete.ram) {
                // We use filter to create a new array without the product to be deleted.
                cart.products = cart.products.filter(
                    (prod) =>
                        prod._id !== product._id ||
                        prod.color !== product.color ||
                        prod.ram !== product.ram
                );

                // We decrease the quantity of the product.
                cart.productsQuantity -= product.quantity;

                // Save changes.
                const updatedCart = await cart.save();
                return res.status(200).json({ message: 'Product Deleted', cart: updatedCart });
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== DELETE User Cart ===== //
export const deleteCart = async (req, res) => {

    const { userId } = req.params;

    try {
        await Cart.findOneAndDelete({ _id: userId });
        return res.status(200).json({ message: 'Cart Deleted' });

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== GET User Cart ===== //
export const getUserCart = async (req, res) => {

    try {
        const cart = await Cart.findById(req.params.userId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ cart: cart });

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===== GET all Carts ===== //
export const getAllCarts = async (req, res) => {

    try {
        const carts = await Cart.find();
        return res.status(200).json(carts);

    } catch (error) {
        return res.status(500).json(error);
    }
};