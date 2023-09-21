import mongoose from 'mongoose';

// Create the model data for cart.
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        products: {
            type: Array,
            required: true
        },

        orderInfo: {
            type: Object,
            required: true,
        },

        status: {
            type: String,
            default: "Pending"
        }

    },

    {timestamps: true}
);

export default mongoose.model('Order', OrderSchema);