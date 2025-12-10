import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import HeaderNav from "../navigation/HeaderNav";
import HeaderRightContent from "./HeaderRightContent";
import LanguageSwitcher from "../language/LanguageSwitcher";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";
import { useKeycloak } from "../../contexts/KeycloakContext";

const HeaderSection2 = () => {
  const { t } = useTranslation();
  const { isHeaderFixed } = useContext(FarzaaContext);
  const { authenticated, login, logout, getUserInfo } = useKeycloak();
  
  // Get user info if authenticated
  const userInfo = authenticated ? getUserInfo() : null;
  const userName = userInfo?.name || userInfo?.username || userInfo?.email || 'User';
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
              <h6>{t("header.shopEvents", "Shop events & save up to 65% off!")}</h6>
            </div>

            <div className="col-md-4 col-6 col-xxs-12">
              <div className="top-header-right-actions">
                {authenticated ? (
                  <>
                    <span style={{ 
                      marginRight: '15px', 
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      verticalAlign: 'middle'
                    }}>
                      <i className="fa-light fa-user" style={{ marginRight: '5px' }}></i>
                      <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {userName}
                      </span>
                    </span>
                    <Link 
                      to="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      style={{ 
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        marginRight: '15px'
                      }}
                    >
                      <i className="fa-light fa-sign-out"></i> {t("common.logout", "Logout")}
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      login();
                    }}
                    style={{ 
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      marginRight: '15px'
                    }}
                  >
                    <i className="fa-light fa-sign-in"></i> {t("common.login", "Login")}
                  </Link>
                )}

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
