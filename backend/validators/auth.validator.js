/* 
DOCUMENTATION IN https://zod.dev/?id=basic-usage
*/

// Zod is a schema declaration and validation library, 
// from a simple string to a complex nested object.
import { z } from 'zod';

// Creating an object schema.
export const registerValidator = z.object({

    // You can customize some common error messages when creating a string schema.
    name: z.string({required_error: "Name is required"})
    .refine(name => isNaN(Number(name)), {message: "Name must not be a numeric string"}),

    lastname: z.string({required_error: "Lastname is required" })
    .refine(lastname => isNaN(Number(lastname)), {message: "Lastname must not be a numeric string"}),
    
    email: z.string({required_error: "Email is required" })
    .email({ message: 'Invalid email' }),
    
    username: z.string({required_error: "Username is required" })
    .refine(username => isNaN(Number(username)), {message: "Username must not be a numeric string"}),
    
    password: z.string({required_error: "Password is required" })
    .min(6, { message: 'Password must be at least 6 characters' })
});

export const loginValidator = z.object({

    email: z.string({required_error: "Email is required"})
    .email({ message: 'Invalid email' }),

    password: z.string({required_error: "Password is required"})
});