import { z } from 'zod';

export const productValidator = z.object({

    thumbnail: z.string({
        invalid_type_error: "Thumbnail must be a string"
    }).refine(thumbnail => isNaN(Number(thumbnail)), {
        message: "Thumbnail must not be a numeric string"
    }).optional(),

    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: "Title must be a string"
    }).refine(title => isNaN(Number(title)), {
        message: "Title must not be a numeric string"
    }),
    
    price: z.number({
        required_error: 'Price is required',
        invalid_type_error: "Price must be a number"
    }),
    
    discountPercentage: z.number({
        invalid_type_error: "Discount % must be a string number"
    }).optional(),

    category: z.string({
        invalid_type_error: "Category must be a string",
        required_error: 'Category is required'
    }).refine(category => isNaN(Number(category)), {
        message: "Category must not be a numeric string"
    }),
    
    brand: z.string({
        invalid_type_error: "Brand must be a string",
        required_error: 'Brand is required'
    }).refine(brand => isNaN(Number(brand)), {
        message: "Brand must not be a numeric string"
    }),

    stock: z.number({
        required_error: 'A Stock number is required',
        invalid_type_error: "Stock must be a string number"
    }),

    description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: 'Description is required'
    }).refine(description => isNaN(Number(description)), 
    {message: "Description must not be a numeric string"})
});