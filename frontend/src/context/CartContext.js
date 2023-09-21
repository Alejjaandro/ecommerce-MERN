import { createContext, useContext, useState, useEffect } from "react";

import axios from '../api/axios.js';
import { useAuth } from "./AuthContext";
import { useUser } from "../context/UserContext.js";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within an AuthProvider");
    }
    return context;
}

export const CartProvider = ({ children }) => {

    const [productsNumber, setProductsNumber] = useState(0);
    const [cart, setCart] = useState();

    // ===== GET USER CART ===== //
    const getCart = async (userId) => {
        // const response = await axios.get(`/users/find/${userId}`);
        // const user = response.data;

        try {
            // We send a petition to get the cart of the user.
            const res = await axios.get(`/carts/find/${userId}`);

            // We update ProductsNumber and CartProducts with the new info.
            setProductsNumber(res.data.products.length);
            setCart(res.data.products);

        } catch (error) {
            // If the cart is empty we set ProductsNumber to 0 and CartProducts to an empty array.
            if (error.response.status === 404) {
                setProductsNumber(0);
                setCart(null);
            }
            console.log(error.response.data);
        }
    }

    // ===== ADD TO CART ===== //
    const addToCart = async (userId, product, quantity, color, ram) => {

        try {
            // we send a post with the userId and the product with its features.
            const response = await axios.post(`/carts/${userId}`, {
                userId: userId,
                product: product,
                quantity: quantity || 1,
                color: color ? color : null,
                ram: ram ? ram : null
            });

            // // We update the user cart.
            setCart(response.data.newCart.products);
            setProductsNumber(response.data.newCart.products.length);

        } catch (error) {
            console.log(error);
        }
    }

    // ===== REMOVE PRODUCT FROM CART ===== //
    const deleteProduct = async (userId, productId) => {
        try {
            const response = await axios.delete(`/carts/${userId}/${productId}`);
            // // We update the user cart.
            setCart(response.data.updatedCart.products);
            setProductsNumber(response.data.updatedCart.products.length);
        } catch (error) {
            console.log(error);
        }
    }

    // ===== DELETE CART ===== //
    const deleteCart = async (userId) => {
        try {
            const response = await axios.delete(`/carts/${userId}`);
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    // All the components inside AuthContext will be able to access it values.
    return (
        <CartContext.Provider value={{
            productsNumber,
            cart,

            addToCart,
            getCart,
            deleteProduct,
            deleteCart
        }}>
            {children}
        </CartContext.Provider>
    )
}