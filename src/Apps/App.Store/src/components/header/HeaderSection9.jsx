import React, { useContext } from "react";
import HeaderNav from "../navigation/HeaderNav";
import { Link } from "react-router-dom";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import { FarzaaContext } from "../../context/FarzaaContext";
import RightSideBar from "../sidebar/RightSideBar";

const HeaderSection9 = () => {
  const {
    isHeaderFixed,
    handleWishlistShow,
    handleCartShow,
    cartItemAmount,
    wishlist,
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
    handleRemoveItemWishlist,
    handleSidebarOpen,
  } = useContext(FarzaaContext);
  return (
    <header className="fz-header-section fz-1-header-section fz-8-header">
      <div
        className={`fz-8-bottom-header to-be-fixed ${
          isHeaderFixed ? "fixed" : ""
        }`}
      >
        <div className="row g-0 align-items-center">
          <div className="col-lg-2 col-md-6 col-9">
            <div className="fz-logo-container ms-0">
              <Link to="/">
                <img
                  src="assets/images/logo-8.png"
                  alt="logo"
                  className="fz-logo"
                />
              </Link>
            </div>
          </div>

          <div className="col-8 header-nav-container d-lg-block d-none">
            <HeaderNav position="justify-content-center" />
          </div>

          <div className="col-lg-2 col-md-6 col-3">
            <div className="fz-header-right-content">
              <ul className="fz-header-right-actions d-flex align-items-center justify-content-end">
                <li>
                  <Link
                    to="/account"
                    className="fz-header-user-btn d-none d-lg-block"
                  >
                    <i className="fa-regular fa-user"></i>
                  </Link>
                </li>
                <li>
                  <a
                    role="button"
                    className="fz-header-wishlist-btn d-none d-lg-block"
                    onClick={handleWishlistShow}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </a>
                </li>
                <li>
                  <a
                    role="button"
                    className="fz-header-cart-btn d-none d-lg-block"
                    onClick={handleCartShow}
                  >
                    <i className="fa-regular fa-shopping-bag"></i>
                    <span className="count">{cartItemAmount}</span>
                  </a>
                </li>
                <li className="d-block d-lg-none">
                  <a
                    role="button"
                    className="fz-hamburger"
                    onClick={handleSidebarOpen}
                  >
                    <i className="fa-light fa-bars-sort"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WishlistModal
        wishlistArray={wishlist}
        removeItem={handleRemoveItemWishlist}
      />
      <CartModal
        cartArray={cartItems}
        remove={handleRemoveItem}
        quantity={handleQuantityChange}
      />
      <RightSideBar />
    </header>
  );
};

export default HeaderSection9;
