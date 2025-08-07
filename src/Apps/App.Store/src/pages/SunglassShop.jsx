import React from "react";
import HeaderSection6 from "../components/header/HeaderSection6";
import BannerSection5 from "../components/banner/BannerSection5";
import PopularShades from "../components/product/PopularShades";
import CtaSection from "../components/cta/CtaSection";
import GlassSection from "../components/product/GlassSection";
import CtaSection2 from "../components/cta/CtaSection2";
import GlassSection2 from "../components/product/GlassSection-2";
import CtaSection3 from "../components/cta/CtaSection3";
import SunGlassSection from "../components/product/SunglassSection";
import OfferSection4 from "../components/offer/OfferSection4";
import BrandSection2 from "../components/brands/BrandSection2";
import BlogSection5 from "../components/blog/BlogSection5";
import FeatureSection from "../components/feature/FeatureSection";
import FooterSection4 from "../components/footer/FooterSection4";
import BottomMobileMenu from "../components/navigation/BottomMobileMenu";

const SunglassShop = () => {
  return (
    <main className="fz-5-body">
      <HeaderSection6 />
      <BannerSection5 />
      <PopularShades />
      <CtaSection />
      <GlassSection />
      <CtaSection2 />
      <GlassSection2 />
      <OfferSection4 />
      <SunGlassSection />
      <CtaSection3 />
      <SunGlassSection />
      <BrandSection2 />
      <BlogSection5 />
      <FeatureSection />
      <FooterSection4 />
      <BottomMobileMenu
        style="fz-5-mobile-menu"
        logo="assets/images/logo-5.png"
      />
    </main>
  );
};

export default SunglassShop;
