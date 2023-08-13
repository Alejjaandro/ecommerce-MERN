/* 
DOCUMENTATION IN https://zod.dev/?id=basic-usage
*/

// Zod is a schema declaration and validation library, 
// from a simple string to a complex nested object.
import { z } from 'zod';

// Creating an object schema.
export const registerValidator = z.object({

    // You can customize some common error messages when creating a string schema.
    username: z.string({required_error: 'Username is required'}),

    email: z.string({required_error: 'Email is required'})
    // Zod includes a handful of string-specific validations, like ".email()" or ".min()".
    //When using validation methods, you can pass in an additional argument to provide a custom error message.
    .email({message: 'Invalid email'}),

    password: z.string({required_error: 'Password is required'})
    .min(6, {message: 'Password must be at least 6 characters'}),

    username: z.string({required_error: 'Name is required'}),
    lastname: z.string({required_error: 'Lastname is required'})

});

export const loginValidator = z.object({
    
    email: z.string({required_error: 'Email is required'})
    .email({message: 'Invalid email'}),

    password: z.string({required_error: 'Password is required'})
    .min(6, {message: 'Wrong Password'})

});