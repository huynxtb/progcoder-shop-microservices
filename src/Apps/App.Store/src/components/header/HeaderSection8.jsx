import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "../navigation/HeaderNav";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import SearchModal from "../modal/SearchModal";
import { FarzaaContext } from "../../context/FarzaaContext";
import RightSideBar from "../sidebar/RightSideBar";

const HeaderSection8 = () => {
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
    <header className="fz-header-section fz-1-header-section fz-7-header">
      <div className="top-header fz-7-top-header">
        <div className="container">
          <div className="row gy-3 align-items-center">
            <div className="col-lg-4 d-lg-block d-none">
              <span className="mail-address">
                <a href="mailto:info@webmail.com">
                  <i className="fa-regular fa-envelope-open"></i>
                  info@webmail.com
                </a>
              </span>
            </div>

            <div className="col-lg-4 col-md-6">
              <h6>SALE: 400+ products up to 70% off. Shop Now</h6>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="top-header-right-actions">
                <div className="top-header-socials">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>

                <select name="currency" id="top-header-currency-dropdown">
                  <option value="USD">USD</option>
                  <option value="Taka">Taka</option>
                  <option value="Euro">Euro</option>
                  <option value="Rupee">Rupee</option>
                </select>

                <select name="language" id="top-header-language-dropdown">
                  <option value="English">English</option>
                  <option value="Bangla">Bangla</option>
                  <option value="French">French</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fz-7-bottom-header to-be-fixed ${
          isHeaderFixed ? "fixed" : ""
        }`}
      >
        <div className="container">
          <div className="row g-0 align-items-center">
            <div className="col-5 header-nav-container d-lg-block d-none">
              <HeaderNav />
            </div>

            <div className="col-lg-2 col-md-6 col-9">
              <div className="fz-logo-container text-lg-center text-start ms-0 ms-lg-auto">
                <Link to="/">
                  <img
                    src="assets/images/logo-7-dark.png"
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
                      <i className="fa-regular fa-magnifying-glass"></i>
                    </a>
                  </li>
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

export default HeaderSection8;
