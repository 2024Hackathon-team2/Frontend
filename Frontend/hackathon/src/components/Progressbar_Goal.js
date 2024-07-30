// src/ProgressBar.js
import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      style={{
        backgroundColor: "#CBC9D3",
        width: "215px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: "#4F82F7",
          height: "10px",
          borderRadius: "5px ",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
