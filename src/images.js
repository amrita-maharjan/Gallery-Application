import React from "react";
import "./App.css";

const Images = ({ image, onClick }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="img-wrapper" onClick={onClick}>
        <img
          src={image.src.medium}
          alt={image.alt || "Image"}
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default Images;
