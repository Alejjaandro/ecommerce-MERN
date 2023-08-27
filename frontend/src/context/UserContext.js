import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';
import { useAuth } from "./AuthContext.js";
import Cookies from 'js-cookie';

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
    const [success, setSuccess] = useState(undefined);
    const {setUser, setIsAuthenticated} = useAuth();

    // ===== GET user ===== //
    const getUser = async (userId) => {
        const response = await axios.get(`/users/find/${userId}`);
        setUser(response.data);
    }

    // ===== UPDATE user ===== //
    const updateUser = async (userId, data) => {
        try {
            const response = await axios.put(`/users/${userId}`, data);
            setSuccess(response.data);
        } catch (error) {
            setErrors(Object.values(error.response.data));
        }
    }

    // ===== DELETE user ===== //
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/users/${userId}`);

            setUser(null);
            setIsAuthenticated(false);
            Cookies.remove('token');

            alert(response.data);

        } catch (error) {
            console.log(error);
            setErrors(Object.values(error.response.data));
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

    // Timeout so the errors don't stay on screen undefinetly. 5000 ms = 5 sec.
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
            updateUser,
            deleteUser,
            getAllUsers,
            getUser,

            allUsers,
            errors,
            success
        }}>
            {children}
        </UserContext.Provider>
    )
};