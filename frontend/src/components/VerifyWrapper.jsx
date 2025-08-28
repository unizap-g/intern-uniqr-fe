
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function VerifyWrapper({ children }) {
    const URL = import.meta.env.VITE_API_URL;
  const uuidApiKey = localStorage.getItem("uuidApiKey");
  const uId = localStorage.getItem("uId");
  const verify = async () => {
    try {
      const res = await axios.post(
        `${URL}/auth/exchange-tokens`,
        {
          uuidApiKey,
          uId
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  if (uuidApiKey) {
    verify();
  }
  if (!uuidApiKey) {
    return <Navigate to="/" replace />;
  }
  return children;
}
