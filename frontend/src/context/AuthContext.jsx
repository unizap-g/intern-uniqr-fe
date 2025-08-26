import { createContext } from "react";

const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   // Default to 'login'
//   const [activeComp, setActiveComp] = useState("login");
//   const [prevComp, setPrevComp] = useState("login");
//   return (
//     <AuthContext.Provider value={{ activeComp, setActiveComp, prevComp, setPrevComp }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export default AuthContext;
