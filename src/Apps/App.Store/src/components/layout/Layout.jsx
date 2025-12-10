import React from "react";
import HeaderSection from "../header/HeaderSection2";
import FooterSection from "../footer/FooterSection";
import RightSideBar from "../sidebar/RightSideBar";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderSection />
      {children}
      <RightSideBar />
      <FooterSection logo="assets/images/logo-1.png" />
    </>
  );
};

export default Layout;
