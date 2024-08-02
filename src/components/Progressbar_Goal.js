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
          backgroundColor: "#17D6B5",
          height: "10px",
          borderRadius: "5px ",
          maxWidth: "215px",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
