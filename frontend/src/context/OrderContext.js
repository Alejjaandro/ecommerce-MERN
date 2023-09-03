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

    // Create Order
    const [order, setOrder] = useState();
    const createOrder = async (userId, order, cart) => {
        try {
            const response = await axios.post("/orders/", {userId, order, cart});
            console.log(response.data);
            setSuccess([response.data.message]);
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
            order,

            success,
        }}>
            {children}
        </OrderContext.Provider>
    )
};