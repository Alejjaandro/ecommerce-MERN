import { createContext, useContext, useEffect, useState } from "react";
import axios from '../api/axios.js';

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

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

    // To check errors.
    const [errors, setErrors] = useState([]);

    // Use the info sent by the form in "/pages/Register.js" to make the post request.
    const register = async (user) => {
        try {
            // Check if the passwords match.
            if (user.password !== user.confirmPassword) {
                return setErrors(["Passwords don't match"]);
            }

            // Save the response sent after the post request.
            const res = await axios.post("/auth/register", user);

            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            // Save the error response send by backend in "/Back-End/middlewares/validator.js".
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const login = async (user) => {
        try {
            const res = await axios.post("/auth/login", user);

            setUser(res.data.user);
            setIsAuthenticated(true);

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
            console.log(error.response.data);
        }
    }

    // Remove the token from cookies.
    const logout = () => {

        Cookies.remove("token");

        setIsAuthenticated(false);
        setUser(null);
    }

    // Timeout so the errors don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Function to verify the token with the backend.
    async function verifyToken(token) {
        try {
            const response = await axios.get('/auth/verifyToken', {
                headers: { 'token': token }
            });

            if (response.status === 200) {
                // Token is valid and has not expired.
                setIsAuthenticated(true);
                setUser(response.data);
            } else {
                // Token is invalid.
                Cookies.remove('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            if (error) {
                // Token isn't valid or has expired.
                Cookies.remove('token');
                setIsAuthenticated(false);
                setUser(null);
                alert("Session Expired");
            }
        }
    }

    // This checks if the cookie token exists and it didn't expired,
    // while it exists the user will be authenticated.
    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            try {
                // We verify the token with the backend.
                verifyToken(token);

                const decodedToken = jwt_decode(token);

                // Verifies if the token expired:
                const currentTime = Date.now().valueOf() / 1000;
                if (decodedToken.exp < currentTime) {
                    // If the token expired:
                    Cookies.remove('token');
                    setIsAuthenticated(false);
                    setUser(null);
                }

            } catch (error) {
                console.log('Error decodifying the token: ', error);
            }
        // If the token doesn't exist:
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }

        // We verify the token every 30 min.
        setInterval(() => {
            verifyToken(token);
        }, 1800000);

    }, []);

    // All the components inside AuthContext will be able to access it values.
    return (
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            verifyToken,

            isAuthenticated,
            errors,
            user,
            setUser,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}