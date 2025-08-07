import React from 'react'
import HeaderSection3 from '../components/header/HeaderSection3'
import FooterSection2 from '../components/footer/FooterSection2'
import JewelleryShopMain from '../components/main/JewelleryShopMain'
import RightSideBar from '../components/sidebar/RightSideBar'

const JewelleryShop = () => {
  return (
    <>
        <HeaderSection3/>
        <JewelleryShopMain/>
        <RightSideBar/>
        <FooterSection2/>
    </>
  )
}

export default JewelleryShop