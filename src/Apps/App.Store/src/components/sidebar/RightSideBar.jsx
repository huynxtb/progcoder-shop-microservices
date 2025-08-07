import { useContext } from "react";
import MobileMenuSection from "../mobile-menu/MobileMenuSection";
import { Link, useNavigate } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const RightSideBar = ({ showMenu }) => {
  const { isSidebarOpen, handleSidebarClose } = useContext(FarzaaContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to close the modal and navigate
  const closeAndNavigate = (path) => {
    handleSidebarClose();
    navigate(path);
  };
  return (
    <div
      className={`fz-offcanvas-main-nav-wrapper ${isSidebarOpen ? "open" : ""}`}
    >
      <button className="fz-button-close" onClick={handleSidebarClose}>
        <i className="fa-thin fa-xmark"></i>
      </button>
      <div className="fz-offcanvas-main-nav-wrapper-sections">
        <div
          className={`fz-offcanvas-main-nav-section ${showMenu ? "show" : ""}`}
        >
          <div
            className={`mobile-menu-updated ${
              isSidebarOpen ? "mean-container" : ""
            }`}
          >
            <MobileMenuSection navigate={closeAndNavigate} />
          </div>
        </div>
        <div className="fz-offcanvas-main-sideinfo-section">
          <div className="fz-offcanvas-main-sideinfo">
            <div className="fz-offcanvas-main-search mb-45">
              <form action="#">
                <input
                  type="search"
                  name="search"
                  placeholder="Search Product"
                  id="search-input"
                />
                <button type="submit">
                  <i className="fa-light fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <div className="fz-offcanvas-main-actions mb-15">
              <a role="button" onClick={() => closeAndNavigate("/cart")}>
                <span className="fz-off-actions-icon">
                  <i className="fa-thin fa-bag-shopping"></i>
                </span>
                <span className="fz-off-actions-text">
                  <span>View Cart</span>
                  <span>View Cart</span>
                </span>
              </a>
              <a role="button" onClick={() => closeAndNavigate("/wishlist")}>
                <i className="fa-thin fa-heart"></i>
                <span className="fz-off-actions-text">
                  <span>View Wishlist</span>
                  <span>View Wishlist</span>
                </span>
              </a>
            </div>

            <div className="fz-offcanvas-main-contacts">
              <h4 className="fz-offcanvas-main-contacts-title mb-30">
                Get In Touch
              </h4>

              <ul className="fz-offcanvas-main-contacts-list">
                <li>
                  <i className="fa-thin fa-location-dot"></i>
                  <span className="fz-offcanvas-main-contact-text">
                    989 Bel Meadow Drive Los Angeles, CA 90017
                  </span>
                </li>
                <li>
                  <i className="fa-thin fa-phone-flip"></i>
                  <span className="fz-offcanvas-main-contact-text">
                    <Link to="tel:(+1)909-407-2988">(+1) 909-407-2988</Link>{" "}
                    <br />
                    <Link to="tel:(+1)470-142-2412">(+1) 470-142-2412</Link>
                  </span>
                </li>

                <li>
                  <i className="fa-thin fa-clock"></i>
                  <span className="fz-offcanvas-main-contact-text">
                    Store Hours:
                    <br />
                    <span className="fz-opentime">Mon - Sat : 8am - 5pm</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="fz-offcanvas-main-socials mt-45">
              <Link to="#">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
