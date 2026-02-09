import React from "react";

const AdPlaceholder = ({ width = "100%", height = "300px", label = "Ad Space" }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#f9f9f9",
        border: "1px dashed #bbb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#888",
        textAlign: "center",
        padding: "10px",
      }}
    >
      {label} ({width} × {height})
    </div>
  );
};

export default AdPlaceholder;
