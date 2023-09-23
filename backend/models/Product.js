import mongoose from 'mongoose';

// Create the model data for products.
const ProductSchema = new mongoose.Schema(
    {
        thumbnail: {
            type: String,
        },

        title: {
            type: String,
            required: true,
            unique: true
        },

        price: {
            type: Number,
            required: true,
        },
        
        discountPercentage: {
            type: Number
        },
                
        category: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },
        
        stock: {
            type: Number,
        },
        
        description: {
            type: String,
            required: true
        },
    },

    {timestamps: true}
);

export default mongoose.model('Product', ProductSchema);