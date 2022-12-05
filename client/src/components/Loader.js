import React from "react";

export const Loader = () => {
  return (
    <div className="product-container">
      <div className="container">
        {/* <img src={placeholder || data.img} alt={data.name} onError={onErrorImage} /> */}

        <div className="skeleton-image skeleton"></div>

        <div className="name-container">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>

        <div className="date-container">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  );
};
