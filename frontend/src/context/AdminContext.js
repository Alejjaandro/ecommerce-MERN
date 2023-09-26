import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';
import { useProducts } from "./ProductsContext.js";
import { useAuth } from "./AuthContext.js";

export const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AuthProvider");
    }
    return context;
}

export const AdminProvider = ({ children }) => {

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const { getProducts } = useProducts();
    const { user: currentUser, logout } = useAuth();

    // ===== ADMIN GET user ===== //
    const [user, setUser] = useState([]);
    const adminGetUser = async (userId) => {
        try {
            const response = await axios.get(`/users/find/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    // ===== ADMIN UPDATE user ===== //
    const adminUpdateUser = async (userId, data) => {
        try {
            // We filter the data so we only send the keys that we want to update.
            const validKeys = ['name', 'lastname', 'email', 'username', 'password', 'isAdmin'];
            let filteredData = {};

            validKeys.forEach((key) => {
                if (key in data) {
                    filteredData[key] = data[key];
                }
            });
            data = filteredData;

            // Turn isAdmin into a boolean.
            if (data.isAdmin === 'false') data.isAdmin = false;
            if (data.isAdmin === 'true') data.isAdmin = true;
            if (typeof data.isAdmin != "boolean") return setErrors(["isAdmin must be a boolean. Please select an option."]);

            if (userId === currentUser._id) {
                const response = await axios.put(`/users/${userId}`, data);
                setSuccess([response.data.message]);
            }

            const response = await axios.put(`/users/adminUpdate/${userId}`, data);
            setSuccess([response.data.message]);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }

    // ===== ADMIN DELETE user ===== //
    const adminDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/users/${userId}`);
            // We update allUsers state so the user we deleted doesn't show up anymore.
            getAllUsers();

            // If the user we deleted is the current user, we logout.
            if (userId === currentUser._id) {
                alert("You deleted yourself");
                logout();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ===== GET ALL USERS ===== //
    const [allUsers, setAllUsers] = useState([]);
    const getAllUsers = async () => {
        try {
            const response = await axios.get('/users/');
            setAllUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ========== CREATE A PRODUCT ========== //
    const createProduct = async (data) => {
        try {
            // We filter the data so we only send the keys that we want to update.
            const validKeys = ['thumbnail', 'title', 'price', 'discountPercentage', 'category', 'brand', 'stock', 'description'];
            let filteredData = {};
            validKeys.forEach((key) => {
                if (key in data) {
                    filteredData[key] = data[key];
                }
            });
            data = filteredData;

            const response = await axios.post(`/products`, data);
            setSuccess(response.data.message);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    }

    // ========== MODIIFY A PRODUCT ========== //
    const updateProduct = async (productId, data) => {
        try {
            const validKeys = ['thumbnail', 'title', 'price', 'discountPercentage', 'category', 'brand', 'stock', 'description'];
            let filteredData = {};
            validKeys.forEach((key) => {
                if (key in data) {
                    filteredData[key] = data[key];
                }
            });
            data = filteredData;

            const response = await axios.put(`/products/${productId}`, data);
            setSuccess(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
            setErrors(error.response.data.message);
        }
    }

    // ========== DELETE A PRODUCT ========== //
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`/products/${productId}`);
            setSuccess(response.data.message);
            // We update the products after deleting.
            getProducts();
        } catch (error) {
            console.log(error);
            setErrors(Object.values(error.response.data));
        }
    }

    // ===== GET ALL CARTS ===== //
    const [allCarts, setAllCarts] = useState([]);
    const getAllCarts = async () => {
        try {
            // We send a petition to get the cart of the user.
            const res = await axios.get(`/carts/`);
            setAllCarts(res.data.carts);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    // ===== DELETE CART ===== //
    const adminDeleteCart = async (userId) => {
        try {
            await axios.delete(`/carts/${userId}`);
            // Update the allCarts.
            await getAllCarts();

        } catch (error) {
            console.log(error);
        }
    }

    // ===== GET ALL ORDERS ===== //
    const [allOrders, setAllOrders] = useState([]);
    const getAllOrders = async () => {
        try {
            const response = await axios.get('/orders/');
            setAllOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ===== DELETE ORDER ===== //
    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`/orders/${orderId}`);
            // We update allOrders.
            getAllOrders();
        } catch (error) {
            console.log(error);
        }
    }

    // Timeout so the messages don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect(() => {
        if (errors.length > 0 || success) {
            const timer = setTimeout(() => {
                setErrors([]);
                setSuccess(undefined);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors, success])

    return (
        <AdminContext.Provider value={{
            adminGetUser,
            user,
            setUser,

            adminUpdateUser,
            adminDeleteUser,
            getAllUsers,
            allUsers,

            createProduct,
            updateProduct,
            deleteProduct,

            getAllCarts,
            adminDeleteCart,
            allCarts,

            getAllOrders,
            deleteOrder,
            allOrders,

            errors,
            setErrors,
            success
        }}>
            {children}
        </AdminContext.Provider>
    )
};