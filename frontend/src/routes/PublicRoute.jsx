import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <Navigate to="/tasks" /> : children;
};

export default PublicRoute;
