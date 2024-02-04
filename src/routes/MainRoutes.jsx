import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";
import MainPage from "../pages/home/MainPage";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/login/LoginPage";

export default function MainRoutes() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('adminAccess');
        if (user) {
            navigate("/");
        } else {
            navigate("/register");
        }
    }, [navigate]);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<MainPage />} />
            </Route>
        </Routes>
    );
}

