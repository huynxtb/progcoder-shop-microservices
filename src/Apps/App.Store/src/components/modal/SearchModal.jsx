import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const SearchModal = () => {
  const { searchModalOpen, toggleCloseSearch } = useContext(FarzaaContext);
  return (
    <>
      <div
        className={`fz-cbsearchbar fz-cb-sidebar-area ${
          searchModalOpen ? "fz-cb-searchbar-opened" : ""
        }`}
      >
        <button
          className="fz-cbsearchbar__close"
          role="button"
          onClick={toggleCloseSearch}
        >
          <i className="fa-light fa-xmark"></i>
        </button>
        <div className="search-wrap text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 pt-100 pb-100">
                <h2 className="fz-cbsearchbar__title">
                  What Product Are You Looking For?
                </h2>
                <div className="fz-cbsearchbar__form">
                  <form action="#">
                    <input
                      type="search"
                      name="s"
                      placeholder="Search Product"
                    />
                    <button
                      className="fz-cbsearchbar__search-btn"
                      type="submit"
                    >
                      <i className="fa-light fa-magnifying-glass"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${searchModalOpen ? "open" : ""}`}
        role="button"
        onClick={toggleCloseSearch}
      ></div>
    </>
  );
};

export default SearchModal;
