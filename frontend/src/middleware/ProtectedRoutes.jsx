import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('You need to be logged in to access this page.');
            navigate("/");
        }
    }, [token, navigate]);

    return <Outlet />;
}