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

    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();

    // ===== CREATE ORDER ===== //
    const createOrder = async (userId, order, cart) => {

        if (order.sameAsCustomer === false) {
            if (
                (!order.billingName || order.billingName === "") ||
                (!order.billingAddress || order.billingAddress === "") ||
                (!order.billingCountry || order.billingCountry === "") ||
                (!order.billingState || order.billingState === "") ||
                (!order.billingCity || order.billingCity === "") ||
                (!order.billingZipcode || order.billingZipcode === "")
                ) {
                return setErrors(["Click on the checkbox to use the same information for billing or fill billing info."])
            }
        }

        try {
            const response = await axios.post("/orders/", { userId, order, cart });
            setSuccess([response.data.message]);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }

    // ===== GET USER ORDERS ===== //
    const [orders, setOrders] = useState([]);
    const getUserOrders = async (userId) => {
        try {
            const response = await axios.get(`/orders/find/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ===== GET SINGLE ORDER ===== //
    const [order, setOrder] = useState();
    const getOrder = async (orderId) => {
        try {
            const response = await axios.get(`orders/findOrder/${orderId}`);
            setOrder(response.data);
        } catch (error) {
            console.log(error);;
        }
    }

    // ===== DELETE ORDER ===== //
    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(`/orders/${orderId}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);;
        }
    }

    // Timeout so the messages don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect(() => {
        if (errors && errors.length > 0 || success) {
            const timer = setTimeout(() => {
                setErrors(undefined);
                setSuccess(undefined);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors, success])

    return (
        <OrderContext.Provider value={{
            createOrder,
            getUserOrders,
            orders,
            getOrder,
            order,
            deleteOrder,

            success,
            errors
        }}>
            {children}
        </OrderContext.Provider>
    )
};