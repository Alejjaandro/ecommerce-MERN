import { useAuth } from "../context/AuthContext.js";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {

    const { isAuthenticated } = useAuth();

    // Check if you are authenticated.
    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}