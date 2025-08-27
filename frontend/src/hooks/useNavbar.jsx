import { useContext } from "react";
import NavbarContext from "../context/Navbarcontext";

const useNavbar = () => {
    return useContext(NavbarContext);
}
export { useNavbar };