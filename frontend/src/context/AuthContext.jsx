import { createContext,useContext,useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Default to 'login'
  const [activeComp, setActiveComp] = useState("login");
  return (
    <AuthContext.Provider value={{ activeComp, setActiveComp }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};

export  {AuthContext, useAuth};
