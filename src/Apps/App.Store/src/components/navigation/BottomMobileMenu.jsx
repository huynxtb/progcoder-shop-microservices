import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenuSidebar from "./MobileMenuSidebar";

const BottomMobileMenu = ({ style, logo }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const openMenu = () => {
    setActiveSidebar(true);
  };
  const closeMenu = () => {
    setActiveSidebar(false);
  };
  return (
    <div className={`fz-4-mobile-menu ${style} d-lg-none`}>
      <ul className="fz-4-app-menu">
        <li>
          <Link to="/" className="active">
            <span className="icon">
              <i className="fa-light fa-home"></i>
            </span>
            <span className="txt">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <span className="icon">
              <i className="fa-light fa-shop"></i>
            </span>
            <span className="txt">Shop</span>
          </Link>
        </li>
        <li>
          <Link to="/checkout">
            <span className="icon">
              <i className="fa-light fa-credit-card-alt"></i>
            </span>
            <span className="txt">Checkout</span>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <span className="icon">
              <i className="fa-light fa-cart-shopping"></i>
            </span>
            <span className="txt">Cart</span>
          </Link>
        </li>
        <li>
          <a role="button" className="open-main-menu" onClick={openMenu}>
            <span className="icon">
              <i className="fa-light fa-grid-2"></i>
            </span>
            <span className="txt">Menu</span>
          </a>
        </li>
      </ul>
      <div
        className={`app-menu-overlay ${activeSidebar ? "active" : ""}`}
        role="button"
        onClick={closeMenu}
      ></div>
      <div className={`main-menu ${activeSidebar ? "active" : ""}`}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <MobileMenuSidebar />
      </div>
    </div>
  );
};

export default BottomMobileMenu;
