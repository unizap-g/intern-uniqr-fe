// import { createContext } from "react";
// import { useState } from "react";

// const IsLoginContext = createContext();


// export default IsLoginContext


import { createContext, useState } from "react";

const IsLoginContext = createContext();

export const IsLoginProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <IsLoginContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginContext;