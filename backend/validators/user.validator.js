import { z } from 'zod';

export const updateUserValidator = z.object({

    name: z.string({ message: 'Name must be a String' })
    .refine(name => isNaN(Number(name)), {
        message: 'Name cannot be a numeric string',
    })
    .optional(),

    lastname: z.string({message: 'Lastname must be a String'})
    .refine(lastname => isNaN(Number(lastname)), {
        message: 'Lastname cannot be a numeric string',
    })
    .optional(),

    email: z.string()
    .email({ message: 'Invalid email' })
    .optional(),

    username: z.string({ message: 'Username must be a String' })
    .refine(username => isNaN(Number(username)), {
        message: 'Username cannot be a numeric string',
    })
    .optional(),

    password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .optional(),

    isAdmin: z.string()
    .optional()
    .transform(value => {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        throw new Error('isAdmin must be a boolean. Please select an option.');
    })
});