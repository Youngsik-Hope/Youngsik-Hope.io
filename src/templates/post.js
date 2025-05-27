import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { formatDate } from '../utils/helpers'

const PostTemplate = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const post = data.markdownRemark
  const { title, date, tags, categories, description, thumbnail } = post.frontmatter
  const image = thumbnail ? getImage(post.frontmatter.thumbnail) : null

  return (
    <Layout>
      <SEO
        title={title}
        description={description || post.excerpt}
        image={thumbnail}
        article
      />
      <article className="post-template">
        <header className="post-header">
          {image && (
            <div className="post-thumbnail">
              <GatsbyImage image={image} alt={title} />
            </div>
          )}
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            <time dateTime={date}>{formatDate(date)}</time>
            {tags && tags.length > 0 && (
              <div className="post-tags">
                {tags.map(tag => (
                  <Link key={tag} to={`/topics/${tag}/`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            {categories && categories.length > 0 && (
              <div className="post-categories">
                {categories.map(category => (
                  <Link key={category} to={`/categories/${category}/`} className="category">
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <nav className="post-navigation">
          {previous && (
            <Link to={previous.fields.slug} className="prev-post">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} className="next-post">
              {next.frontmatter.title} →
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        tags
        categories
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

export default PostTemplate 