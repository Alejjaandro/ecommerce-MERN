import { createContext, useContext, useState } from "react";

import axios from '../api/axios.js';

export const AdminEditCartContext = createContext();

export const useAdminEditCart = () => {
    const context = useContext(AdminEditCartContext);
    if (!context) {
        throw new Error("useAdminCart must be used within an AuthProvider");
    }
    return context;
}

export const AdminEditCartProvider = ({ children }) => {

    const [userProductsNumber, setUserProductsNumber] = useState(0);
    const [userCart, setUserCart] = useState();

    // ===== GET USER CART ===== //
    const getUserCart = async (userId) => {
        try {
            // We send a petition to get the cart of the user.
            const response = await axios.get(`/carts/find/${userId}`);

            // We update ProductsNumber and CartProducts with the new info.
            setUserCart(response.data.cart.products);
            setUserProductsNumber(response.data.cart.productsQuantity);

        } catch (error) {
            // If the cart is empty we set ProductsNumber to 0 and CartProducts to an empty array.
            if (error.response.status === 404) {
                setUserProductsNumber(0);
                setUserCart(null);
            }
        }
    }

    // ===== ADD TO CART ===== //
    const adminAddToCart = async (userId, product) => {

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
            setUserCart(response.data.cart.products);
            setUserProductsNumber(response.data.cart.productsQuantity);

        } catch (error) {
            console.log(error);
        }
    }

    // ===== REMOVE PRODUCT FROM CART ===== //
    const adminDeleteProduct = async (userId, product) => {
        try {
            const response = await axios.delete(`/carts/${userId}/${product._id}`, { 
                data: product
            });
            // // We update the user cart.
            setUserCart(response.data.cart.products);
            setUserProductsNumber(response.data.cart.productsQuantity);
        } catch (error) {
            console.log(error);
        }
    }

    // ===== DELETE CART ===== //
    const adminDeleteCart = async (userId) => {
        try {
            const response = await axios.delete(`/carts/${userId}`);
            console.log(response.data.message);
            // // We update the user cart.
            setUserCart(null);
            setUserProductsNumber(0);
        } catch (error) {
            console.log(error);
        }
    }

    // All the components inside AuthContext will be able to access it values.
    return (
        <AdminEditCartContext.Provider value={{
            userProductsNumber,
            userCart,

            adminAddToCart,
            getUserCart,
            adminDeleteProduct,
            adminDeleteCart
        }}>
            {children}
        </AdminEditCartContext.Provider>
    )
}