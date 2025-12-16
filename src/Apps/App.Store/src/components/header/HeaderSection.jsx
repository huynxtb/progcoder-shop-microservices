import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";
import HeaderNav from "../navigation/HeaderNav";
import WishlistModal from "../modal/WishlistModal";
import CartModal from "../modal/CartModal";
import LanguageSwitcher from "../language/LanguageSwitcher";

const HeaderSection = () => {
  const { t } = useTranslation();
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
    <header className="fz-header-section fz-1-header-section">
      <div className="top-header">
        <div className="container">
          <div className="row gy-3 align-items-center">
            <div className="col-lg-4 d-lg-block d-none">
              <span className="mail-address">
                <a to="mailto:progcoder.com@gmail.com">
                  <i className="fa-regular fa-envelope-open"></i>
                  progcoder.com@gmail.com
                </a>
              </span>
            </div>

            <div className="col-lg-4 col-md-6">
              <h6>{t("header.topSale")}</h6>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="top-header-right-actions">
                <div className="top-header-socials">
                  <a to="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a to="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a to="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>

                <select name="currency" id="top-header-currency-dropdown">
                  <option value="USD">USD</option>
                  <option value="Taka">Taka</option>
                  <option value="Euro">Euro</option>
                  <option value="Rupee">Rupee</option>
                </select>

                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`bottom-header to-be-fixed ${isHeaderFixed ? "fixed" : ""}`}
      >
        <div className="container">
          <div className="row g-0 align-items-center">
            <div className="col-5 header-nav-container d-lg-block d-none">
              <HeaderNav position={""} />
            </div>

            <div className="col-lg-2 col-md-6 col-9">
              <div className="fz-logo-container text-lg-center text-start">
                <Link to="/">
                  <img
                    src="assets/images/logo/logo.png"
                    alt="logo"
                    className="fz-logo"
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-3">
              <div className="fz-header-right-content">
                <form
                  action="#"
                  className="bottom-header-search-form d-none d-sm-flex"
                >
                  <input
                    type="text"
                    name="search"
                    id="bottom-header-search-input"
                    placeholder={t("header.searchPlaceholder")}
                  />
                  <button type="submit">
                    <i className="fa-regular fa-magnifying-glass"></i>
                  </button>
                </form>

                <ul className="fz-header-right-actions d-flex align-items-center justify-content-end">
                  <li>
                    <button
                      className="fz-header-wishlist-btn d-none d-lg-block"
                      onClick={handleWishlistShow}
                    >
                      <i className="fa-light fa-heart"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      className="fz-header-cart-btn d-none d-lg-block"
                      onClick={handleCartShow}
                    >
                      <i className="fa-light fa-shopping-bag"></i>
                      <span className="count">{cartItemAmount}</span>
                    </button>
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
    </header>
  );
};

export default HeaderSection;
