import React from 'react'
import BannerSection from '../banner/BannerSection'
import CategorySection from '../category/CategorySection'
import CollectionSection from '../collection/CollectionSection'
import SubscriptionSection from '../subscription/SubscriptionSection'
import FeaturedProducts from '../featured/FeaturedProducts'
import FeaturedSection from '../featured/FeaturedSection'
import OfferSection from '../offer/OfferSection'
import ModernDoorSection from '../sliders/ModernDoorSection'
import BlogSection from '../blog/BlogSection'
import BrandSection from '../sliders/BrandSection'
import GallerySection from '../gallery/GallerySection'


const DoorShopMain = () => {
  return (
    <main>
        <BannerSection/>
        <CategorySection/>
        <CollectionSection/>
        <SubscriptionSection/>
        <FeaturedProducts/>
        <FeaturedSection/>
        <OfferSection/>
        <ModernDoorSection/>
        <BlogSection/>
        <BrandSection/>
        <GallerySection/>
    </main>
  )
}

export default DoorShopMain