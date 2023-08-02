const mongoose = require('mongoose');

// Create the model data for cart.
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        products: [
            {
                productId: {
                    type: String
                },
                
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],

        ammount: {
            type: Number,
            required: true
        },

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

module.exports = mongoose.model('Order', OrderSchema);