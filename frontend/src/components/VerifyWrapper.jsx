// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function VerifyWrapper({ children }) {
//   const token = localStorage.getItem("authToken");
//   const [isVerified, setIsVerified] = useState(null);

//   useEffect(() => {
//        const verifyToken=async ()=>{
//       try {
//         const res=await axios.get(`${URL}/user/userdata`,{
//           headers: {
//             "key": localStorage.getItem("uuidApiKey"),
//           },
//         });
//       const newTokenKey=res.headers["x-api-key"];
//       if(newTokenKey){
//         localStorage.setItem("uuidApiKey", newTokenKey);
//       }
//       setIsVerified(true);
//       } catch (error) {

//         localStorage.removeItem("uuidApiKey");
//         setIsVerified(false);
//         console.log(error);
//       }
//     }

//     if (token) verifyToken();
//     else setIsVerified(false);
//   }, []);

//   if (isVerified === null) return <p>Loading...</p>;
//   if (!isVerified) return <Navigate to="/login" replace />;

//   return children;
// }