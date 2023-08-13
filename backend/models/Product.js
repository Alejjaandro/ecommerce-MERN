import mongoose from 'mongoose';

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
        
        price: {
            type: Number,
            required: true,
        },

        discountPercentage: {
            type: Number
        },

        rating: {
            type: Number
        },
        
        stock: {
            type: Number,
        },

        brand: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        thumbnail: {
            type: String,
            required: true
        },

        images: {
            type: Array
        }
    },

    {timestamps: true}
);

export default mongoose.model('Product', ProductSchema);