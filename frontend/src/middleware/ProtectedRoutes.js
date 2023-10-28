import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log("No token");
        return <Navigate to="/" replace />
    }

    return <Outlet />
}