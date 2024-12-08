import React from "react";
import { ClipLoader } from "react-spinners";

function Loader({ color = "#2563eb", size = 50 }) {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color={color} size={size} />
    </div>
  );
}

export default Loader;
