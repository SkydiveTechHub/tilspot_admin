
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles, token }) => {
  const userToken = token || localStorage.getItem("token"); 
  const userRole = localStorage.getItem("role"); 
  console.log(roles, userRole, !roles.includes(userRole))

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  // Render the child components
  return <Outlet />;
};

export default ProtectedRoute;
