import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';
import { useAuth } from "./AuthContext.js";

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
    const [success, setSuccess] = useState([]);
    const {setUser} = useAuth();

    // ===== GET user ===== //
    const getUser = async (userId) => {
        try {            
            const response = await axios.get(`/users/find/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    // ===== UPDATE user ===== //
    const updateUser = async (userId, data) => {
        // Only allow the following fields to be updated.
        const validKeys = ['image', 'name', 'lastname', 'email', 'username', 'password'];
        let filteredData = {};
        validKeys.forEach((key) => {
            if (key in data) {
                filteredData[key] = data[key];
            }
        });
        data = filteredData;

        try {
            // Error if the fields are empty.
            if (Object.keys(data).length === 0) {
                return setErrors(['You must fill at least one field to update.']);
            } else {
                const response = await axios.put(`/users/${userId}`, data);
                setSuccess([response.data.message]);
                localStorage.setItem('token', response.data.newToken);
                getUser(userId);
            }
    
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    }

    // ===== DELETE user ===== //
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/users/${userId}`);

        } catch (error) {
            setErrors(error.response);
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
        <UserContext.Provider value={{
            getUser,
            updateUser,
            deleteUser,
            
            setUser,
            errors,
            success
        }}>
            {children}
        </UserContext.Provider>
    )
};