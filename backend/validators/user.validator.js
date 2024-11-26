import { z } from 'zod';

export const updateUserValidator = z.object({

    name: z.string({ message: 'Name must be a String' })
    .refine(name => isNaN(Number(name)), {message: 'Name cannot be a numeric string'})
    .refine(name => !/\d/.test(name), {message: "Name must not contain a number"})
    .optional(),

    lastname: z.string({message: 'Lastname must be a String'})
    .refine(lastname => isNaN(Number(lastname)), {message: 'Lastname cannot be a numeric string'})
    .refine(name => !/\d/.test(name), {message: "Lastname must not contain a number"})
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
});