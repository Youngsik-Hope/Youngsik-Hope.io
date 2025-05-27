import React from "react"
import BlogHeader from "../components/Blog/blogHeader"
import BlogsContainer from "../components/Blog/blogsContainer"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const Blog = ({ data }) => {
  const posts = data?.allMarkdownRemark?.edges || [];
  const HeaderPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <Layout>
      <SEO title="Blog" />
      {HeaderPost && <BlogHeader post={HeaderPost} />}
      <BlogsContainer data={otherPosts} />
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            featuredimage {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  height: 400
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`
