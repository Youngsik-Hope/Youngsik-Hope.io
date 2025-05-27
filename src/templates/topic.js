import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { formatDate } from '../utils/helpers'

const TopicTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO
        title={`#${tag} - Youngsik-Hope's Blog`}
        description={`Posts tagged with #${tag}`}
      />
      <div className="topic-template">
        <header className="topic-header">
          <h1 className="topic-title">#{tag}</h1>
          <p className="topic-description">
            {posts.length} post{posts.length === 1 ? '' : 's'} tagged with #{tag}
          </p>
        </header>

        <div className="topic-posts">
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
                </div>
              </article>
            )
          })}
        </div>

        <div className="topic-footer">
          <Link to="/topics/" className="back-to-topics">
            ← All Topics
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TopicByTag($tag: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          tags: { in: [$tag] }
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

export default TopicTemplate 