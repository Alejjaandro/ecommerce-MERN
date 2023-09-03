import mongoose from 'mongoose';

// Create the model data for cart.
const OrderSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        products: [],

        address: {
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