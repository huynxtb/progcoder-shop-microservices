import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderNav from "../navigation/HeaderNav";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const HeaderSection5 = () => {
  const { isHeaderFixed, handleCartShow } = useContext(FarzaaContext);
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
    <header className="fz-header-section fz-4-header-section">
      <div className="top-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <p>SALE: 400+ products up to 70% off. Shop Now</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`to-be-fixed ${isHeaderFixed ? "fixed" : ""}`}>
        <div className="middle-header" ref={actionsRef}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-4 col-lg-2">
                <div className="row align-items-center">
                  <div className="col-lg-12 col-6">
                    <div className="logo">
                      <Link to="/">
                        <img src="assets/images/logo-4.png" alt="" />
                      </Link>
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
              <div className="col-xxl-4 col-lg-5">
                <div className="header-search">
                  <form className={activeSearchbar ? "active" : ""}>
                    <select name="category" className="nice-select">
                      <option value="">Category</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                      <option value="4">Category 4</option>
                      <option value="5">Category 5</option>
                      <option value="6">Category 6</option>
                    </select>
                    <input type="search" name="keyword" />
                    <button>
                      <i className="fa-regular fa-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-xxl-4 col-lg-5">
                <ul
                  className={`header-action ${activeActions ? "active" : ""}`}
                >
                  <li>
                    <a role="button">
                      <span className="header-action-icon">
                        <img src="assets/images/header-icon-1.png" alt="Icon" />
                      </span>
                      <div className="header-action-txt">
                        <span>24/7 Hours</span>
                        <p>Call Support</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <Link to="/account">
                      <span className="header-action-icon">
                        <img src="assets/images/header-icon-2.png" alt="Icon" />
                      </span>
                      <div className="header-action-txt">
                        <span>Sign In</span>
                        <p>Account</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <a
                      role="button"
                      className="fz-header-cart-btn"
                      onClick={handleCartShow}
                    >
                      <span className="header-action-icon">
                        <img src="assets/images/header-icon-3.png" alt="Icon" />
                      </span>
                      <div className="header-action-txt">
                        <span>Add to cart</span>
                        <p>$784.00</p>
                      </div>
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
                <HeaderNav position="fz-4-menu" />
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-5">
                <p className="header-txt">
                  Enter code <span>SAVE20</span> at checkout and get 20% off
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection5;
