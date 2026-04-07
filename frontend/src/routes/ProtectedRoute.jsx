import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggeIn = localStorage.getItem("token");
  return isLoggeIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
