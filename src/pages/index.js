import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import DachshundAnimation from '../components/DachshundAnimation';
import PostCard from '../components/PostCard';
import '../styles/dachshund-animation.scss';
import '../styles/post-card.scss';
import '../styles/index.scss';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="home-container">
        <section className="hero-section">
          <DachshundAnimation />
        </section>
        <section className="posts-section">
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          title
          date
          categories
          tags
          thumbnail {
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
`;

export default IndexPage;
