
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles, token }) => {
  const userToken = token || localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  // Render the child components
  return <Outlet />;
};

export default ProtectedRoute;
