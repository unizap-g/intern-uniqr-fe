import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check-auth");

        // update key if backend rotated it
        const newApiKey = res.headers["x-api-key"];
        if (newApiKey) {
          localStorage.setItem("uuidApiKey", newApiKey);
        }

        setIsAuth(res.data.success);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [localStorage.getItem("uuidApiKey")]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (isAuth === false) {
    localStorage.removeItem("uuidApiKey");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
