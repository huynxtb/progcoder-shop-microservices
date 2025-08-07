import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "../navigation/HeaderNav";
import { FarzaaContext } from "../../context/FarzaaContext";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import SearchModal from "../modal/SearchModal";
import RightSideBar from "../sidebar/RightSideBar";

const HeaderSection7 = () => {
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
    toggleOpenSearch,
    handleSidebarOpen,
  } = useContext(FarzaaContext);
  return (
    <header
      className={`fz-header-section fz-6-header to-be-fixed ${
        isHeaderFixed ? "fixed" : ""
      }`}
    >
      <div className="container">
        <div className="row g-0 align-items-center">
          <div className="col-5 header-nav-container d-lg-block d-none">
            <HeaderNav position="" />
          </div>

          <div className="col-lg-2 col-md-6 col-9">
            <div className="fz-logo-container text-lg-center text-start ms-0 ms-lg-auto">
              <Link to="/">
                <img
                  src="assets/images/logo-6.png"
                  alt="logo"
                  className="fz-logo"
                />
              </Link>
            </div>
          </div>

          <div className="col-lg-5 col-md-6 col-3">
            <div className="fz-header-right-content">
              <ul className="fz-header-right-actions d-flex align-items-center justify-content-end">
                <li>
                  <a
                    role="button"
                    className="fz-header-search-btn fz-2-search-btn d-none d-lg-block"
                    onClick={toggleOpenSearch}
                  >
                    <i className="fa-light fa-magnifying-glass"></i>
                  </a>
                </li>
                <li>
                  <Link
                    to="/account"
                    className="fz-header-user-btn d-none d-lg-block"
                  >
                    <i className="fa-light fa-user"></i>
                  </Link>
                </li>
                <li>
                  <a
                    role="button"
                    className="fz-header-wishlist-btn d-none d-lg-block"
                    onClick={handleWishlistShow}
                  >
                    <i className="fa-light fa-heart"></i>
                  </a>
                </li>
                <li>
                  <a
                    role="button"
                    className="fz-header-cart-btn d-none d-lg-block"
                    onClick={handleCartShow}
                  >
                    <i className="fa-light fa-shopping-bag"></i>
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
      <SearchModal />
      <RightSideBar />
    </header>
  );
};

export default HeaderSection7;
