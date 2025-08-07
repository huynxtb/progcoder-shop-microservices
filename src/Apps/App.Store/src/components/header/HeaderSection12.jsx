import React, { useContext } from "react";
import HeaderNav from "../navigation/HeaderNav";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import RightSideBar from "../sidebar/RightSideBar";

const HeaderSection12 = () => {
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
    wishlistItemAmount,
  } = useContext(FarzaaContext);
  return (
    <header
      className={`fz-header-section fz-2-header-section fz-11-header to-be-fixed ${
        isHeaderFixed ? "fixed" : ""
      }`}
    >
      <div className="row m-0 align-items-center justify-content-around">
        <div className="col-lg-4 col-md-6 col-xl-3 col-9">
          <div className="fz-header-left-content d-flex align-items-center">
            <div className="fz-logo-container fz-11-header-logo-container m-0">
              <a
                role="button"
                className="fz-hamburger border-0"
                onClick={handleSidebarOpen}
              >
                <img
                  src="assets/images/menubar-logo.png"
                  alt="logo"
                  className="fz-logo"
                />
              </a>
            </div>

            <div className="fz-category-area">
              <Link to="/" className="fz-category-btn">
                <img
                  src="assets/images/logo-11.png"
                  alt="logo"
                  className="fz-logo"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-6 header-nav-container order-3 order-lg-2 col-xl-5">
          <HeaderNav position="fz-11-header-list-container" />
        </div>

        <div className="col-lg-2 col-md-6 col-3 order-2 order-lg-3 col-xl-4">
          <div className="fz-header-right-content fz-11-right-content">
            <form
              action="#"
              className="bottom-header-search-form fz-11-header-form d-none d-xl-flex border"
            >
              <input
                type="text"
                name="search"
                id="bottom-header-search-input"
                placeholder="Search your product"
                className="fz-11-header-input px-3"
              />
              <button type="submit">
                <i className="fa-regular fa-magnifying-glass fz-11-search-logo"></i>
              </button>
            </form>
            <ul className="fz-header-right-actions fz-11-header-right-icon-container">
              <li>
                <a href="account.html" className="d-none d-lg-block">
                  <i className="fa-light fa-user"></i>
                </a>
              </li>
              <li>
                <a
                  role="button"
                  className="fz-header-cart-btn d-none d-lg-block"
                  onClick={handleWishlistShow}
                >
                  <i className="fa-light fa-heart"></i>
                  <span className="count">{wishlistItemAmount}</span>
                </a>
              </li>
              <li>
                <a
                  role="button"
                  className="fz-header-cart-btn d-none d-lg-block"
                  onClick={handleCartShow}
                >
                  <i className="fa-light fa-bag-shopping"></i>
                  <span className="count">{cartItemAmount}</span>
                </a>
              </li>

              <li>
                <a
                  role="button"
                  className="fz-hamburger d-block d-lg-none"
                  onClick={handleSidebarOpen}
                >
                  <i className="fa-light fa-bars-sort"></i>
                </a>
              </li>
            </ul>
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

export default HeaderSection12;
