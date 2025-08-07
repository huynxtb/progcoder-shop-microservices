import React from "react";
import HeaderSection from "../components/header/HeaderSection";
import FooterSection from "../components/footer/FooterSection";
import DoorShopMain from "../components/main/DoorShopMain";
import RightSideBar from "../components/sidebar/RightSideBar";

const HomePage1 = () => {
  return (
    <div className="fz-1-body">
      <HeaderSection />
      <DoorShopMain />
      <RightSideBar />
      <FooterSection logo="assets/images/logo-1.png" />
    </div>
  );
};

export default HomePage1;
