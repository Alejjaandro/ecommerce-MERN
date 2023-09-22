import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoutes() {

    const token = Cookies.get("token");
    if (!token) {
        return <Navigate to="/" replace />
    }

    const decodedToken = jwt_decode(token);
    if (!decodedToken.isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}