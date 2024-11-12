import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log("No token");
        return <Navigate to="/" replace />
    }

    return <Outlet />
}