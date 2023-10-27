import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

/* 
Context provides a way to pass data through the component tree 
without having to pass props down manually at every level.
*/
export const AuthContext = createContext();

// useAuth lets you read and subscribe to context from your component.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Provider is a component that embraces other.
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Use the info sent by the form in "/pages/Register.js" to make the post request.
    const [registerErrors, setRegisterErrors] = useState([]);
    const register = async (user) => {
        try {
            // Check if the passwords match.
            if (user.password !== user.confirmPassword) {
                return setRegisterErrors(["Passwords don't match"]);
            }

            // Save the response sent after the post request.
            const response = await axios.post("/auth/register", user);

            setUser(response.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            // Save the error response send by backend in "/Back-End/middlewares/validator.js".
            setRegisterErrors(error.response.data.message);
        }
    }

    const [loginErrors, setLoginErrors] = useState([]);
    const login = async (user) => {
        try {
            const response = await axios.post("/auth/login", user);

            setUser(response.data.user);
            setIsAuthenticated(true);

        } catch (error) {
            setLoginErrors(error.response.data.message);
        }
    }

    // Remove the token from cookies.
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
        alert("You have been logged out");
        navigate('/');
    }

    // Timeout so the errors don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect(() => {
        if ((loginErrors.length > 0) || (registerErrors.length > 0)) {
            const timer = setTimeout(() => {
                setLoginErrors([]);
                setRegisterErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [loginErrors, registerErrors]);

    // Function to verify the token with the backend.
    // async function verifyToken(token) {
    //     try {
    //         if (token) {
    //             const response = await axios.get('/auth/verifyToken', {
    //                 headers: { 'token': token }
    //             });

    //             if (response.status === 200) {
    //                 // Token is valid and has not expired.
    //                 setIsAuthenticated(true);
    //                 setUser(response.data);
    //             } else {
    //                 // Token is invalid.
    //                 logout();
    //             }
    //         } else {
    //             // Token doesn't exist.
    //             logout();
    //         }
    //     } catch (error) {
    //         if (error) {
    //             // Token isn't valid or has expired.
    //             alert("Session Expired");
    //             logout();
    //         }
    //     }
    // }

    // Verify the token when the page loads.
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     console.log(token);
    //     if (token) {
    //         verifyToken(token);
    //     }
    // }, []);

    // If the user is logged in, verify the token every second.
    // useEffect(() => {
    //     if (user) {
    //         const intervalId = setInterval(() => {
    //             const token = Cookies.get('token');

    //             verifyToken(token);

    //             if (!token) {
    //                 logout();
    //             }
    //         }, 1000);
    //         // Clear the interval when the component unmounts.
    //         return () => clearInterval(intervalId);
    //     }
    // }, [user]);

    // All the components inside AuthContext will be able to access it values.
    return (
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            // verifyToken,

            isAuthenticated,
            user,
            setUser,
            setIsAuthenticated,

            loginErrors,
            registerErrors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}