import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an AuthProvider");
    }
    return context;
}

export const UserProvider = ({ children }) => {

    const [errors, setErrors] = useState([]);

    const updateUser = async (userId, data) => {
        try {
            await axios.put(`/users/${userId}`, data);
        } catch (error) {
            setErrors(Object.values(error.response.data));
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

    return (
        <UserContext.Provider value={{
            updateUser,
            errors
        }}>
            {children}
        </UserContext.Provider>
    )
};