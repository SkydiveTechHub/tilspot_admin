
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const userToken =  localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 
  const userData = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation()


  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (!roles.includes(userRole)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the child components
  return <Outlet />;
};

export default ProtectedRoute;
