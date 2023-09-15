import { z } from 'zod';

export const productValidator = z.object({

    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: "Title must be a string"
    }),

    description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: 'Description is required'
    }),

    price: z.number({
        invalid_type_error: "Price must be a number",
        required_error: 'Price is required'
    }).transform(parseFloat),

    stock: z.number({
        invalid_type_error: "Stock must be a number",
        required_error: 'A Stock number is required'
    }).transform(parseFloat),
    
    brand: z.string({
        invalid_type_error: "Brand must be a string",
        required_error: 'Brand is required'
    }),
    
    category: z.string({
        invalid_type_error: "Category must be a string",
        required_error: 'Category is required'
    }),
    
    thumbnail: z.string({
        invalid_type_error: "Thumbnail must be a string",
        required_error: 'Thumbnail is required'
    }),
    
    discountPercentage: z.number({
        invalid_type_error: "Discount % must be a number"
    }).transform(parseFloat).optional(),

    // We let "images" be any value and use .transform() to make sure that the value is an array.
    images: z.any().transform(value => Array.isArray(value) ? value : [value]).optional()
});