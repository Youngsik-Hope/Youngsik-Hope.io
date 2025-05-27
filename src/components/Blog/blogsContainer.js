import React from "react"
import Input from "../Atoms/input"
import Fade from "react-reveal/Fade"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const BlogsContainer = ({ data }) => {
  // 데이터 유효성 검사
  if (!data || !Array.isArray(data)) {
    console.warn('Invalid blog data:', data);
    return null;
  }

  const posts = data.map(item => {
    if (!item?.node?.frontmatter || !item?.node?.fields?.slug) {
      console.warn('Invalid blog post data:', item);
      return null;
    }

    return {
      featuredImage: item.node.frontmatter.featuredimage,
      title: item.node.frontmatter.title,
      description: item.node.frontmatter.description,
      slug: item.node.fields.slug,
      date: item.node.frontmatter.date,
      tags: item.node.frontmatter.tags || [],
    }
  }).filter(Boolean); // null 값 제거

  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-10 px-8 text-center">
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-8 text-black">
      <Fade bottom cascade>
        <div className="grid grid-cols-3 gap-4 xxs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={post.slug} className="blog-card">
              <div className="overflow-hidden rounded-xl xxs:w-full">
                <Link
                  to={post.slug}
                  className="block"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {post.featuredImage && (
                    <GatsbyImage
                      image={getImage(post.featuredImage)}
                      alt={post.title}
                      placeholder="blurred"
                      layout="constrained"
                      formats={["auto", "webp", "avif"]}
                      quality={90}
                      className="blog-image"
                      aspectRatio={16 / 9}
                    />
                  )}
                </Link>
              </div>
              <div className="m-6">
                <Link
                  to={post.slug}
                  className="block"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <h2 className="text-2xl font-semibold mt-2 mb-4 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                {post.date && (
                  <time className="text-sm text-gray-600 block mb-2">
                    {post.date}
                  </time>
                )}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/tags/${tag}`}
                        className="text-xs bg-gray-100 hover:bg-primary hover:text-white px-2 py-1 rounded transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Fade>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-black">
          STAY AHEAD OF THE CURVE
        </h2>
        <h3 className="text-lg mt-2 text-gray-600">
          Subscribe to our newsletter, we will only send the good stuff!
        </h3>
        <div className="mt-10 flex flex-col items-center justify-center">
          <Input 
            type="email"
            placeholder="Enter your email"
            className="max-w-md w-full"
          />
          <button
            type="button"
            className="mt-4 transition-all duration-300 ease-in-out inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-black hover:text-white rounded-lg border border-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Join The List
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogsContainer
