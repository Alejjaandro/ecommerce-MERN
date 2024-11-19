import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.log("No token");
            navigate("/");
        }
    }, [token, navigate]);

    return <Outlet />;
}