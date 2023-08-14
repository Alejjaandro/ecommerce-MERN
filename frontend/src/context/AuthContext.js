
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

// We import "js-cookie" to read cookies from Front-End.
import Cookies from "js-cookie";

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
            // Save the response sent after the post request.
            const res = await axios.post("http://localhost:4000/api/auth/register", user);
            console.log(res.data);

            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // Save the error response send by backend in "/Back-End/middlewares/validator.js".
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const login = async (user) => {
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", user);
            console.log(res.data);

            Cookies.set('token', res.data.token);

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

    // Remove the cookie with the token that grant access.
    const logout = () => {
        Cookies.remove('token');
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
    }, [errors])

    // To save the cookie even when refreshing the client.
    // useEffect(() => {
    //     async function checkLogin() {
    //         // Extract cookie token.
    //         const cookies = Cookies.get();

    //         if (!cookies.token) {
    //             setIsAuthenticated(false);
    //             return setUser(null);
    //         }

    //         try {
    //             // Verify cookie token with backend.
    //             const res = await axios.get(`/verify`);
    //             if (!res.data) {
    //                 setIsAuthenticated(false);
    //                 return;
    //             }

    //             setIsAuthenticated(true);
    //             setUser(res.data);

    //         } catch (error) {
    //             setIsAuthenticated(false);
    //             setUser(null);
    //         }

    //     }

    //     checkLogin();
    // }, [])


    // All the components inside AuthContext will be able to access it values.
    return (
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            isAuthenticated,
            errors,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}