import { useContext } from "react";
import { VerifyContext } from "../context/VerifyContext";


function useVerify() {
  return useContext(VerifyContext);
}
export {useVerify}
