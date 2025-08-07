import React, { useEffect, useRef, useState } from "react";
import ProductSidebar from "./ProductSidebar";
import ProductArea from "./ProductArea";

const ShopAreaSection2 = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const filterBtnRef = useRef(null); // Create a ref for the filter button

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      filterBtnRef.current &&
      !filterBtnRef.current.contains(event.target) // Ensure the click target is not the filter button
    ) {
      // Clicked outside of the sidebar, close it
      setActiveSidebar(false);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="shop-area shop-area-2 pt-120">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xxl-3 col-lg-3">
            <ProductSidebar active={activeSidebar} sidebarRef={sidebarRef} />
          </div>
          <div className="col-xl-9 col-lg-9">
            <ProductArea
              toggleFilter={toggleSidebar}
              sidebarRef={filterBtnRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAreaSection2;
