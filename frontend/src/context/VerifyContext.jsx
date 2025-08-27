import { createContext, useState } from "react";

// Create context
const VerifyContext = createContext();

// Provider component
function VerifyProvider({ children }) {
  const [userData, setUserData] = useState("null");

  //   const login = (userData) => setUser(userData);
  //   const logout = () => setUser(null);

  return (
    <VerifyContext.Provider value={{ userData,  setUserData }}>
      {children}
    </VerifyContext.Provider>
  );
}

export { VerifyContext, VerifyProvider };
