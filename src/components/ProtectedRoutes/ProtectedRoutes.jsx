// components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../Data/Users/Users";

const PrivateRoute = () => {
    const { currentUser } = useUser();

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
