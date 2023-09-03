import Order from '../models/Order.js';

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Order ===== //
export const createOrder = async (req, res) => {
    const { userId, order, cart } = req.body;
    try {
        const newOrder = new Order({
            userId: userId,
            products: cart,
            orderInfo: order
        });

        const savedOrder = await newOrder.save();

        return res.status(200).json({ message: 'Order Created', newOrder: savedOrder });
    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== UPDATE Order ===== //
export const updateOrder = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== DELETE Order ===== //
export const deleteOrder = async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json('Order Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET User Order ===== //
export const getUserOrder = async (req, res) => {

    try {
        const orders = await Order.findOne({ userId: req.params.userId });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
};

// ===== GET all Orders ===== //
export const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
};