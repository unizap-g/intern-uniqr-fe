
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyWrapper({ children }) {
  // You may want to move this to an env file or context
  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const uuidApiKey = localStorage.getItem("uuidApiKey");
        const uId = localStorage.getItem("uId");

        if (!uuidApiKey || !uId) {
          setIsVerified(false);
          setLoading(false);
          return;
        }

        const res = await axios.get(`${URL}/user/userdata`, {
          headers: {
            "x-api-key": uuidApiKey,
          },
        });

        if (res.data) {
          // If server sent new API key, update localStorage
          const newApiKey = res.headers["x-api-key"];
          if (newApiKey) {
            localStorage.setItem("uuidApiKey", newApiKey);
          }

          // If userId returned, ensure it's updated

          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch {
        setError("Verification failed. Please login again.");
        localStorage.removeItem("uuidApiKey");
        localStorage.removeItem("uId");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
    // Only run on mount or if URL changes
  }, [URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-gray-700 font-medium">Verifying...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">{error}</h2>
          <a href="/login" className="text-purple-600 hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  if (isVerified === false) {
    return <Navigate to="/login" replace />;
  }

  // If verified, render children
  return children;
}
