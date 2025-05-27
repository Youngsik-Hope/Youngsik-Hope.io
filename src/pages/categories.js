import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import '../styles/categories.scss'

const CategoriesPage = ({ data }) => {
  const categories = data.allMarkdownRemark.group

  return (
    <Layout>
      <SEO
        title="Categories - Youngsik-Hope's Blog"
        description="Browse posts by category"
      />
      <div className="categories-page">
        <header className="page-header">
          <h1 className="page-title">Categories</h1>
          <p className="page-description">
            Browse all posts by category
          </p>
        </header>

        <div className="categories-list">
          {categories.map(category => (
            <article key={category.fieldValue} className="category-card">
              <h2 className="category-card-title">
                <Link to={`/categories/${category.fieldValue}/`}>
                  {category.fieldValue}
                </Link>
              </h2>
              <p className="category-card-count">
                {category.totalCount} post{category.totalCount === 1 ? '' : 's'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      group(field: { frontmatter: { categories: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

export default CategoriesPage 