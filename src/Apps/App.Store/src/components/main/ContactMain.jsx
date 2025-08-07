import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import ContactSection from '../contact/ContactSection'
import LocationSection from '../map/LocationSection'

const ContactMain = () => {
  return (
    <>
        <BreadcrumbSection title={"Contact Page"} current={"Contact"}/>
        <ContactSection/>
        <LocationSection/>
    </>
  )
}

export default ContactMain