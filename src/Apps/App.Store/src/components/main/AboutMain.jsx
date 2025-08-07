import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import StorySection from '../story/StorySection'
import TeamSection from '../team/TeamSection'
import StoreSection from '../store/StoreSection'


const AboutMain = () => (
    <>
        <BreadcrumbSection title={"About Us"} current={"About"} />
        <StorySection/>
        <TeamSection/>
        <StoreSection/>
    </>
)

export default AboutMain