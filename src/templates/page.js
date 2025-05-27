import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const { title, description, thumbnail } = page.frontmatter
  const image = thumbnail ? getImage(page.frontmatter.thumbnail) : null

  return (
    <Layout>
      <SEO
        title={title}
        description={description || page.excerpt}
        image={thumbnail}
      />
      <article className="page-template">
        <header className="page-header">
          {image && (
            <div className="page-thumbnail">
              <GatsbyImage image={image} alt={title} />
            </div>
          )}
          <h1 className="page-title">{title}</h1>
        </header>

        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default PageTemplate 