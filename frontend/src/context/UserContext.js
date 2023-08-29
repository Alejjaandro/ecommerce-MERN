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
    const [success, setSuccess] = useState([]);
    const [user, setUser] = useState([]);

    const {setIsAuthenticated} = useAuth();

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
        try {
            const response = await axios.put(`/users/${userId}`, data);
            console.log(response.data);
        } catch (error) {
            setErrors(Object.values(error.response.data));
        }
    }

    // ===== ADMIN UPDATE user ===== //
    const adminUpdateUser = async (userId, data) => {
        try {
            const response = await axios.put(`/users/adminUpdate/${userId}`, data);
            setSuccess(Object.values(response.data));
        } catch (error) {
            setErrors(Object.values(error.response.data));
        }
    }

    // ===== DELETE user ===== //
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/users/${userId}`);

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
            updateUser,
            adminUpdateUser,
            deleteUser,
            getAllUsers,
            getUser,
            
            user,
            setUser,
            allUsers,
            errors,
            success
        }}>
            {children}
        </UserContext.Provider>
    )
};