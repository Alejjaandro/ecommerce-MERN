/* 
DOCUMENTATION IN https://zod.dev/?id=basic-usage
*/

// Zod is a schema declaration and validation library, 
// from a simple string to a complex nested object.
import { z } from 'zod';

// Creating an object schema.
export const registerValidator = z.object({

    // You can customize some common error messages when creating a string schema.
    name: z.string().nonempty({ message: 'Name is required' }),

    lastname: z.string().nonempty({ message: 'Lastname is required' }),
    
    email: z.string().nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
    
    username: z.string().nonempty({ message: 'Username is required' }),
    
    password: z.string().nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
});

export const loginValidator = z.object({

    email: z.string().nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),

    password: z.string().nonempty({ message: 'Password is required' })
});