import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes() {
    const { token } = useAuth();
    console.log(token);
    
    if (!token) {
        console.log("No token");
        return <Navigate to="/" replace />
    }

    return <Outlet />
}