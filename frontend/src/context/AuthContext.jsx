import { createContext,useState } from "react";

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

export default AuthContext;
