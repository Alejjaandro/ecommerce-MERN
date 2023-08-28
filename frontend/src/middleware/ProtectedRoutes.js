import { useAuth } from "../context/AuthContext.js";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {

    const { user, isAuthenticated } = useAuth();

    // Check if you are authenticated.
    if (!user || !isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}