import mongoose from 'mongoose';

// Create the model data for cart. We stablish the _id as the userId.
const CartSchema = new mongoose.Schema(
    {   
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        // Products is an array.
        products: [],

        productsQuantity: {
            type: Number,
            default: 0
        }
    },

    { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);