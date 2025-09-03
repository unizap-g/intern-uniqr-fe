// import { createContext } from "react";

// const NavbarContext = createContext();

// export default NavbarContext;

// context/NavbarContext.js
import { createContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        showSignoutModal,
        setShowSignoutModal,
        showProfileModal,
        setShowProfileModal,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
