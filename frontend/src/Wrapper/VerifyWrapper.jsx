import { Navigate } from "react-router-dom";
// import { useVerify } from "../hooks/useVerify";
import React from "react";

// import jwtDecode from "jwt-decode";
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
 





  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
