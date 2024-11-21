import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminRoutes() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("You need to login first");
            navigate("/");
        }
    }, [token, navigate]);

    if (token) {
        const decodedToken = jwtDecode(token);
        if (!decodedToken.isAdmin) {
            alert("You are not an admin");
            navigate("/");
        }
    }

    return <Outlet />
}