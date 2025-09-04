import OverLayersContext from "../context/OverLayers";

import { useContext } from "react";

const useOverLayers = () => {
  return useContext(OverLayersContext);
};

export default useOverLayers;
