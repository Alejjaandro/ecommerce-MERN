const mongoose = require('mongoose');

// Create the model data for products.
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String,
            required: true
        },
        
        img: {
            type: String,
            required: true,
        },

        categories: {
            type: Array
        },

        color: {
            type: String
        },

        ram: {
            type: String
        },
        
        price: {
            type: Number,
            required: true,
        },

    },

    {timestamps: true}
);

module.exports = mongoose.model('Product', ProductSchema);