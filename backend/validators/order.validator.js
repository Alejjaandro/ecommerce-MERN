import { z } from 'zod';

export const userOrderValidator = z.object({

    order: z.object({

        //  ===== USER INFO ===== //
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        })
        .refine(name => isNaN(Number(name)), {message: "Name must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Name must not contain a number"}),


        lastname: z.string({ 
            required_error: "Lastname is required",
            invalid_type_error: "Lastname must be a string" 
        })
        .refine(lastname => isNaN(Number(lastname)), {message: "Lastname must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Lastname must not contain a number"}),

        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        })
        .email({ message: "Not a valid email" }),

        address: z.string({ 
            required_error: "Address is required",
            invalid_type_error: "Address must be a string"
        })
        .refine(address => isNaN(Number(address)), {message: "Address must not be a numeric string"}),

        country: z.string({ 
            required_error: "Country is required",
            invalid_type_error: "Country must be a string"
        })
        .refine(country => isNaN(Number(country)), {message: "Country must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Country must not contain a number"}),

        city: z.string({ 
            required_error: "City is required",
            invalid_type_error: "City must be a string"
        })
        .refine(city => isNaN(Number(city)), {message: "City must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "City must not contain a number"}),

        state: z.string({ 
            required_error: "State is required",
            invalid_type_error: "State must be a string"
        })
        .refine(state => isNaN(Number(state)), {message: "State must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "State must not contain a number"}),

        zipcode: z.number({
            required_error: "Zip Code is required",
            invalid_type_error: "Zip Code must be a number"
        }),

        cardNumber: z.number({
            required_error: "Card Number is required",
            invalid_type_error: "Card Number must be a number"
        })
        .refine(cardNumber => {
            const digitLength = cardNumber.toString().length;
            return digitLength >= 16 && digitLength <= 18;
        }, { message: "Card Number must be between 16 and 18 digits" }),

        cvc: z.number({
            required_error: "CVC is required",
            invalid_type_error: "CVC must be a number"
        })
        .refine(cvc => {
            const digitLength = cvc.toString().length;
            return digitLength === 3;
        }, { message: "CVC must be 3 digits" }),

        expirationDate: z.string({
            required_error: "Expiration Date is required",
        })
        .refine(expirationDate => /^(\d{2})\/(\d{4})$/.test(expirationDate), { message: "Expiration Date must be in MM/YYYY format" }),
        
        //  ===== BILLING ADDRESS ===== //
        billingName: z.string({ 
            invalid_type_error: "Billing Name must be a string"
        })
        .refine(billingName => isNaN(Number(billingName)), {message: "Billing Name must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Billing Name must not contain a number"})
        .optional(),

        billingAddress: z.string({ 
            invalid_type_error: "Billing Address must be a string"
        })
        .refine(billingAddress => isNaN(Number(billingAddress)), {message: "Billing Address must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Billing Addres must not contain a number"})
        .optional(),

        billingCountry: z.string({ 
            invalid_type_error: "Billing Country must be a string"
        })
        .refine(billingCountry => isNaN(Number(billingCountry)), {message: "Billing Country must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Billing Country must not contain a number"})
        .optional(),

        billingCity: z.string({ 
            invalid_type_error: "Billing City must be a string"
        })
        .refine(billingCity => isNaN(Number(billingCity)), {message: "Billing City must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Billing City must not contain a number"})
        .optional(),

        billingState: z.string({
            invalid_type_error: "Billing State must be a string"
        })
        .refine(billingState => isNaN(Number(billingState)), {message: "Billing State must not be a numeric string"})
        .refine(name => !/\d/.test(name), {message: "Billing State must not contain a number"})
        .optional(),

        billingZipcode: z.number({
            invalid_type_error: "Billing Zip Code must be a number"
        })
        .optional(),

    }),
});