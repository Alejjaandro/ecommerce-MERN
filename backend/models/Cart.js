import mongoose from 'mongoose';

// Create the model data for cart. We stablish the _id as the userId.
const CartSchema = new mongoose.Schema(
    {   
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Products is an array that contains a productId & quantity.
        products: [
            {
                _id: false,
                productId: {
                    type: String
                },

                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],

    },

    { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);