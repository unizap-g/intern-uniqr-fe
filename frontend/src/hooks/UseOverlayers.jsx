import OverLayersContext from "../context/OverLayers";

import { useContext } from "react";

const useOverlayers = () => {
  return useContext(OverLayersContext);
};

export default useOverlayers;
