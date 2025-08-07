import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderNav from "../navigation/HeaderNav";
import { Link } from "react-router-dom";
import CartModal from "../modal/CartModal";
import WishlistModal from "../modal/WishlistModal";
import { FarzaaContext } from "../../context/FarzaaContext";
import CustomFlagDropdown from "../utils/CustomFlagDropdown";

const HeaderSection6 = () => {
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
  } = useContext(FarzaaContext);
  const [activeActions, setActiveActions] = useState(false);
  const [activeSearchbar, setActiveSearchbar] = useState(false);

  const toggleActions = () => {
    setActiveActions(!activeActions);
    if (activeSearchbar) {
      setActiveSearchbar(false);
    } else {
      return;
    }
  };
  const toggleSearchbar = () => {
    setActiveSearchbar(!activeSearchbar);
    if (activeActions) {
      setActiveActions(false);
    } else {
      return;
    }
  };
  // Refs for the elements you want to track clicks outside of
  const actionsRef = useRef(null);

  // Function to handle clicks outside of the actions element
  const handleClickOutside = (event) => {
    if (actionsRef.current && !actionsRef.current.contains(event.target)) {
      setActiveActions(false);
    }
    if (actionsRef.current && !actionsRef.current.contains(event.target)) {
      setActiveSearchbar(false);
    }
  };

  // Effect to add event listener when component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <header className="fz-header-section fz-5-header-section">
      <div className="top-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <p>SALE: 400+ products up to 70% off. Shop Now</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`to-be-fixed ${isHeaderFixed ? "fixed" : ""}`}
        ref={actionsRef}
      >
        <div className="middle-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-4">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-6">
                    <div className="logo">
                      <Link to="/">
                        <img src="assets/images/logo-5.png" alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-9 d-xl-block d-none">
                    <div className="fz-5-header-txt">
                      <ul className="d-flex">
                        <li>
                          Call us{" "}
                          <a href="callto:(800)846-9915">(800) 846-9915</a>
                        </li>
                        <li>Mon-Fri 9AM - 5PM EST</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-6 d-lg-none">
                    <div className="d-flex gap-4 justify-content-end">
                      <button id="openSearch" onClick={toggleSearchbar}>
                        <i className="fa-regular fa-magnifying-glass"></i>
                      </button>
                      <button id="openInfo" onClick={toggleActions}>
                        <i className="fa-regular fa-grid-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-lg-4">
                <div className="header-search">
                  <form className={activeSearchbar ? "active" : ""}>
                    <input type="search" name="keyword" />
                    <button>
                      <i className="fa-regular fa-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <ul
                  className={`header-action ${activeActions ? "active" : ""}`}
                >
                  <li>
                    <Link to="/account">
                      <i className="fa-regular fa-user-vneck me-2"></i> Sign In
                      & Sign Up
                    </Link>
                  </li>
                  <li>
                    <a
                      role="button"
                      className="fz-header-wishlist-btn"
                      onClick={handleWishlistShow}
                    >
                      <i className="fa-regular fa-heart"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      className="fz-header-cart-btn"
                      onClick={handleCartShow}
                    >
                      <span className="badge">{cartItemAmount}</span>
                      <i className="fa-regular fa-cart-shopping"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-header d-lg-block d-none">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-9 col-xl-8 col-lg-7 header-nav-container">
                <HeaderNav position="fz-4-menu" downArrow />
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-5">
                <div className="select-lang d-flex gap-5 justify-content-end align-items-center">
                  <a href="#" className="order-track">
                    Track Order
                  </a>
                  <CustomFlagDropdown />
                </div>
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

export default HeaderSection6;
