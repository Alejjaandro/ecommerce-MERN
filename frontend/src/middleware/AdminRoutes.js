import { useAuth } from "../context/AuthContext.js";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoutes() {

    const { user } = useAuth();

    // Check if you are authenticated.
    if (!user || !user.isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}