// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Youngsik-Hope's Website", // 님의 블로그 제목으로 수정
    author: { name: 'Youngsik Won' }, // 님의 이름으로 수정
    pathPrefix: '/Youngsik-Hope.io', // ⭐️ 저장소 이름과 동일하게 설정 (앞에 / 붙임)
    siteUrl: 'https://Youngsik-Hope.github.io/Youngsik-Hope.io', // ⭐️ GitHub Pages 기본 URL 형태로 수정
    description:
      'Software engineer and open-source creator. This is my digital garden. - by Youngsik-Hope', // 님의 설명으로 수정
    feedUrl: 'https://Youngsik-Hope.github.io/rss.xml', // siteUrl에 맞춰 수정
    logo: 'https://Youngsik-Hope.github.io/logo.png', // 실제 로고 경로에 맞춰 수정 (static 폴더 기준)
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify', // Netlify 사용 시 유용, GitHub Pages만 사용 시 필수는 아님
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Youngsik-Hope's Website", // 님의 웹사이트 이름
        short_name: 'YSHope', // 또는 'Hope.dev' 등 원하는 짧은 이름
        description:
          'Software engineer and open source creator. This is my digital garden. - by Youngsik-Hope', // 님의 설명
        start_url: '/', // pathPrefix가 적용된 후의 루트
        background_color: 'white',
        // theme_color: '#959af8', // 원하는 테마 색상
        display: 'minimal-ui',
        icon: `static/logo.png`, // static 폴더에 logo.png 파일이 있어야 함
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'Youngsik Won' }, // 님의 이메일 또는 이름으로 수정
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30
                  sort: {frontmatter: {date: DESC}}
                  filter: {frontmatter: {template: {eq: "post"}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Youngsik-Hope's Website | RSS Feed", // RSS 피드 제목 수정
          },
        ],
      },
    },

    // ===================================================================================
    // Images, styles, and static
    // ===================================================================================

    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts', // Markdown 게시물이 있는 소스 이름
        path: `${__dirname}/content/`, // Markdown 게시물 폴더 경로 (프로젝트 루트/content/)
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets', // 이미지 등 정적 에셋 폴더 이름
        path: `${__dirname}/static/`, // static 폴더 경로 (프로젝트 루트/static/)
      },
    },
    'gatsby-plugin-image',

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              maxWidth: 590, // 본문 이미지 최대 너비
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs', // 코드 하이라이팅
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages', // 검색 인덱스 이름 (gatsby-source-filesystem의 name과 달라도 됨)
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY") # 날짜 형식은 원하시는 대로
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id', // 고유 식별자로 사용할 필드
        index: ['title', 'tags', 'body'], // 검색 대상 필드 (normalizer에서 body로 매핑)
        store: ['id', 'slug', 'title', 'tags', 'date'], // 검색 결과로 저장/보여줄 필드
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.frontmatter?.slug ? `/${node.frontmatter.slug}` : (node.fields?.slug || node.id), // slug 우선순위
            title: node.frontmatter?.title || '',
            body: node.rawMarkdownBody || '',
            tags: node.frontmatter?.tags || [],
            // categories: node.frontmatter?.categories || [], // 필요하다면 categories도 추가
            date: node.frontmatter?.date || '',
          })),
      },
    },
  ],
}