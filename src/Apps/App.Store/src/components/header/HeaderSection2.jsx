import React, { useContext } from "react";
import HeaderNav from "../navigation/HeaderNav";
import HeaderRightContent from "./HeaderRightContent";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const HeaderSection2 = () => {
  const { isHeaderFixed } = useContext(FarzaaContext);
  return (
    <header className="fz-header-section fz-1-header-section inner-page-header">
      <div className="top-header">
        <div className="container">
          <div className="row gy-3 align-items-center">
            <div className="col-4 d-none d-md-block">
              <span className="mail-address">
                <Link to="mailto:info@webmail.com">
                  <i
                    className="fa-regular fa-envelope-open"
                    style={{ paddingRight: 5 }}
                  ></i>
                  info@webmail.com
                </Link>
              </span>
            </div>

            <div className="col-md-4 col-6 col-xxs-12">
              <h6>Shop events & save up to 65% off!</h6>
            </div>

            <div className="col-md-4 col-6 col-xxs-12">
              <div className="top-header-right-actions">
                <Link to="account">
                  <i className="fa-light fa-user"></i> Sign up
                </Link>

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
        className={`bottom-header to-be-fixed ${isHeaderFixed ? "fixed" : ""}`}
      >
        <div className="container">
          <div className="row g-0 align-items-center">
            <div className="col-lg-3 col-md-6 col-9">
              <div className="fz-logo-container">
                <Link to="/">
                  <img
                    src="assets/images/logo-1.png"
                    alt="logo"
                    className="fz-logo"
                  />
                </Link>
              </div>
            </div>

            <div className="col-6 header-nav-container d-lg-block d-none">
              <HeaderNav position={"justify-content-center"} />
            </div>

            <div className="col-lg-3 col-md-6 col-3">
              <HeaderRightContent />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection2;
