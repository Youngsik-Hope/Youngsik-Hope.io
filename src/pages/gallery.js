import React from "react"
import Gallery from "../components/gallery-page"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const GalleryPage = () => {
  return (
    <Layout>
      <SEO title="Gallery" />
      <Gallery></Gallery>
    </Layout>
  )
}

export default GalleryPage
