import React from 'react'
import CakeHeaderWrapper from '../components/wrapper/CakeHeaderWrapper'
import FooterSection3 from '../components/footer/FooterSection3'
import CakeShopMain from '../components/main/CakeShopMain'
import RightSideBar from '../components/sidebar/RightSideBar'

const CakeShop = () => {
  return (
    <>
        <CakeHeaderWrapper/>
        <CakeShopMain/>
        <RightSideBar/>
        <FooterSection3/>
    </>
  )
}

export default CakeShop