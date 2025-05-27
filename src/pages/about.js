import React from "react"
import AboutPage from "../components/about/aboutPage"
import AboutGrid from "../components/about/aboutGrid"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import AboutExtra from "../components/about/aboutExtra"
import AboutHeader from "../components/about/aboutHeader"

const About = () => {
  return (
    <Layout>
      <SEO title="About" />
      <AboutHeader></AboutHeader>
      <AboutPage></AboutPage>
      <AboutGrid></AboutGrid>
      <AboutExtra></AboutExtra>
    </Layout>
  )
}

export default About
