import React from "react";
import { Link } from "react-router-dom";
const ErrorMain = () => {
  return (
    <div className="container">
      <div className="error-content">
        <img
          src="assets/images/404-image.png"
          alt="error-img"
          width={600}
          height={400}
        />
        <h2 className="error-text">No Page Found!</h2>
        <Link to="/" className="fz-1-banner-btn update-cart-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorMain;
