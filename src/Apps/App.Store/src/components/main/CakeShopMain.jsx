import React from 'react'
import CategorySection3 from '../category/CategorySection3'
import LayerCakeSlider from '../sliders/LayerCakeSlider'
import OfferSection2 from '../offer/OfferSection2'
import PoundCakeSlider from '../sliders/PoundCakeSlider'
import VideoSection from '../video/VideoSection'
import CupCakeSlider from '../sliders/CupCakeSlider'
import ClientSlider from '../sliders/ClientSlider'
import HotSellingCakeSection from '../product/HotSellingCakeSection'
import VerticalTestimonialSlider from '../sliders/VerticalTestimonialSlider'
import BlogSection3 from '../blog/BlogSection3'
import FeaturedSection2 from '../featured/FeaturedSection2'


const CakeShopMain = () => {
  return (
    <main>
      <CategorySection3/>
      <LayerCakeSlider/>
      <OfferSection2/>
      <PoundCakeSlider/>
      <VideoSection/>
      <CupCakeSlider/>
      <ClientSlider/>
      <HotSellingCakeSection/>
      <VerticalTestimonialSlider/>
      <BlogSection3/>
      <FeaturedSection2/>
    </main>
  )
}

export default CakeShopMain