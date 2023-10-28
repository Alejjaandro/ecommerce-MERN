import { createContext, useContext, useState } from "react";

import axios from '../api/axios.js';

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
        try {
            // We send a petition to get the cart of the user.
            const response = await axios.get(`/carts/find/${userId}`);

            // We update ProductsNumber and CartProducts with the new info.
            setCart(response.data.cart.products);
            setProductsNumber(response.data.cart.productsQuantity);
        } catch (error) {
            // If the cart is empty we set ProductsNumber to 0 and CartProducts to an empty array.
            if (error.response.status === 404) {
                setProductsNumber(0);
                setCart(null);
            }
        }
    }

    // ===== ADD TO CART ===== //
    const addToCart = async (userId, product) => {

        try {
            // we send a post with the userId and the product with its features.
            const response = await axios.post(`/carts/${userId}`, {
                _id: product._id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: product.quantity,
                color: product.color,
                ram: product.ram
            });

            // // We update the user cart.
            setCart(response.data.cart.products);
            setProductsNumber(response.data.cart.productsQuantity);

        } catch (error) {
            console.log(error);
        }
    }

    // ===== REMOVE PRODUCT FROM CART ===== //
    const deleteProduct = async (userId, product) => {
        try {
            const response = await axios.delete(`/carts/${userId}/${product._id}`, { 
                data: product
            });
            // // We update the user cart.
            setCart(response.data.cart.products);
            setProductsNumber(response.data.cart.productsQuantity);
        } catch (error) {
            console.log(error);
        }
    }

    // ===== DELETE CART ===== //
    const deleteCart = async (userId) => {
        try {
            const response = await axios.delete(`/carts/${userId}`);
            console.log(response.data.message);
            // // We update the user cart.
            setCart(null);
            setProductsNumber(0);
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