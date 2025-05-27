const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// GraphQL 스키마 커스터마이징 추가
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      title: String!
      date: Date! @dateformat
      template: String
      tags: [String]
      categories: [String]
      description: String
      thumbnail: File @fileByRelativePath
      comments_off: Boolean
      slug: String
      draft: Boolean
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date
              template
              tags
              categories
              description
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
              comments_off
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const tagTemplate = path.resolve(`./src/templates/topic.js`)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  // 태그와 카테고리 세트 생성
  const tagSet = new Set()
  const categorySet = new Set()

  // 포스트와 페이지 생성
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    // 태그와 카테고리 수집
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => tagSet.add(tag))
    }
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(category => categorySet.add(category))
    }

    // 페이지 생성 - 모든 포스트를 blog-post 템플릿으로 처리
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
        previous,
        next,
      },
    })
  })

  // 태그 페이지 생성
  Array.from(tagSet).forEach(tag => {
    createPage({
      path: `/topics/${tag}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })

  // 카테고리 페이지 생성
  Array.from(categorySet).forEach(category => {
    createPage({
      path: `/categories/${category}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    
    // slug 생성
    let slug = value
    if (node.frontmatter.slug) {
      slug = `/${node.frontmatter.slug}/`
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    // 추가 필드 생성 - template이 없으면 'blog-post'를 기본값으로 사용
    createNodeField({
      name: `template`,
      node,
      value: node.frontmatter.template || 'blog-post',
    })
  }
}