import { useContext } from "react";
import NavbarContext from "../context/NavbarContext";

const useNavbar = () => {
    return useContext(NavbarContext);
}
export { useNavbar };