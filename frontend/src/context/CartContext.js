import { createContext, useContext, useEffect, useState } from "react";

import axios from '../api/axios.js';
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const CartProvider = ({ children }) => {

    const { user } = useAuth();
    const [errors, setErrors] = useState([]);

    const [productsNumber, setProductsNumber] = useState(0);
    const [cartProducts, setCartProducts] = useState();

    const addToCart = async (userId, product, quantity) => {

        if (user) {
            // console.log(product);

                try {
                    const res = await axios.post(`/carts/${userId}`, {
                        userId: userId,
                        product: product,
                        quantity: quantity || 1
                    });

                    console.log(res.data);

                    setProductsNumber(productsNumber + 1);

                } catch (error) {
                    console.log(error);
                }

        } else {
            console.log("You need to be logged");
        }

    }

    const getCart = async (userId) => {
        try {
            const res = await axios.get(`/carts/find/${userId}`);

            setProductsNumber(res.data.products.length);
            setCartProducts(res.data.products);

        } catch (error) {
            console.log(error);
        }
    }

    // Timeout so the errors don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])



    // All the components inside AuthContext will be able to access it values.
    return (
        <CartContext.Provider value={{
            addToCart,
            getCart,
            productsNumber,
            cartProducts,
            errors
        }}>
            {children}
        </CartContext.Provider>
    )
}