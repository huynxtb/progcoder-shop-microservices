import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "../navigation/HeaderNav";
import { FarzaaContext } from "../../context/FarzaaContext";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import RightSideBar from "../sidebar/RightSideBar";

const HeaderSection10 = () => {
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
    <header className="fz-header-section fz-1-header-section fz-9-header">
      <div
        className={`bottom-header to-be-fixed ${isHeaderFixed ? "fixed" : ""}`}
      >
        <div className="fz-header-padding">
          <div className="row g-0 align-items-center">
            <div className="col-lg-2 col-md-6 col-9">
              <div className="fz-logo-container text-lg-center text-start">
                <Link to="/">
                  <img
                    src="assets/images/logo-9.png"
                    alt="logo"
                    className="fz-logo"
                  />
                </Link>
              </div>
            </div>

            <div className="col-5 header-nav-container d-lg-block d-none">
              <nav className="fz-header-nav" id="fz_header_nav">
                <HeaderNav position="" />
              </nav>
            </div>

            <div className="col-lg-5 col-md-6 col-3">
              <div className="fz-header-right-content">
                <ul className="fz-header-right-actions d-flex align-items-center justify-content-end">
                  <li>
                    <button
                      className="fz-header-wishlist-btn d-none d-lg-block"
                      onClick={handleWishlistShow}
                    >
                      <span className="position-relative">
                        <i className="fa-solid fa-heart"></i>
                      </span>
                      <span className="d-none d-xl-inline">Wishlist</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="fz-header-cart-btn d-none d-lg-block"
                      onClick={handleCartShow}
                    >
                      <span className="position-relative">
                        <i className="fa-solid fa-cart-arrow-down"></i>
                        <span className="count">{cartItemAmount}</span>
                      </span>
                      <span className="d-none d-xl-inline">My Bag</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="fz-header-9-menu-btn fz-hamburger"
                      onClick={handleSidebarOpen}
                    >
                      <i className="fa-light fa-bars-sort"></i>
                    </button>
                  </li>
                </ul>
              </div>
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

export default HeaderSection10;
