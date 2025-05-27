import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { formatDate } from '../utils/helpers'

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO
        title={`${category} - Youngsik-Hope's Blog`}
        description={`Posts in category: ${category}`}
      />
      <div className="category-template">
        <header className="category-header">
          <h1 className="category-title">{category}</h1>
          <p className="category-description">
            {posts.length} post{posts.length === 1 ? '' : 's'} in {category}
          </p>
        </header>

        <div className="category-posts">
          {posts.map(({ node }) => {
            const { title, date, description, thumbnail } = node.frontmatter
            const image = thumbnail ? getImage(node.frontmatter.thumbnail) : null

            return (
              <article key={node.fields.slug} className="post-card">
                {image && (
                  <Link to={node.fields.slug} className="post-card-image">
                    <GatsbyImage image={image} alt={title} />
                  </Link>
                )}
                <div className="post-card-content">
                  <header>
                    <h2 className="post-card-title">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h2>
                    <time className="post-card-date" dateTime={date}>
                      {formatDate(date)}
                    </time>
                  </header>
                  {description && (
                    <p className="post-card-description">{description}</p>
                  )}
                  {node.frontmatter.tags && (
                    <div className="post-card-tags">
                      {node.frontmatter.tags.map(tag => (
                        <Link key={tag} to={`/topics/${tag}/`} className="tag">
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className="category-footer">
          <Link to="/categories/" className="back-to-categories">
            ← All Categories
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CategoryBySlug($category: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { in: [$category] }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 600
                  height: 300
                )
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate 