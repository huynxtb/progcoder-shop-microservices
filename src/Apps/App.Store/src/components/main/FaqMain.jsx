import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import FaqAccordionSection from '../accordion/FaqAccordionSection'

const FaqMain = () => {
  return (
    <>
        <BreadcrumbSection title={"FAQ Page"} current={"FAQ"}/>
        <FaqAccordionSection/>
    </>
  )
}

export default FaqMain