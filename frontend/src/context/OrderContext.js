import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';

export const OrderContext = createContext();

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an AuthProvider");
    }
    return context;
}

export const OrderProvider = ({ children }) => {

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);

    // ===== CREATE ORDER ===== //
    const createOrder = async (userId, order, cart) => {
        try {
            const response = await axios.post("/orders/", {userId, order, cart});
            console.log(response.data);
            setSuccess([response.data.message]);
        } catch (error) {
            console.log(error);;
        }
    }

    // ===== GET USER ORDERS ===== //
    const [orders, setOrders] = useState();
    const getOrders = async (userId) => {
        try {
            const response = await axios.get(`orders/find/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.log(error);;
        }
    }

    // ===== GET SINGLE ORDER ===== //
    const [order, setOrder] = useState();
    const getOrder = async (orderId) => {
        try {
            const response = await axios.get(`orders/find/${orderId}`);
            setOrder(response.data);
        } catch (error) {
            console.log(error);;
        }
    }

    // ===== DELETE ORDER ===== //
    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`orders/${orderId}`);
            console.log(response.data);        
        } catch (error) {
            console.log(error);;
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
        <OrderContext.Provider value={{
            createOrder,
            getOrders,
            orders,
            getOrder,
            order,
            deleteOrder,

            success,
        }}>
            {children}
        </OrderContext.Provider>
    )
};