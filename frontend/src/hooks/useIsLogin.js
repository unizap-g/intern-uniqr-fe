import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import IsLoginContext from "../context/isLoginContext";

const useIsLogin = () => {
  return useContext(IsLoginContext);
};

export { useIsLogin };
