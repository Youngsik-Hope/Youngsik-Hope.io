import React from 'react';
import { Link } from 'gatsby';
import ScrollAnimation from './ScrollAnimation';

const PostCard = ({ post }) => {
  const {
    title,
    slug,
    date,
    category,
    excerpt,
    tags,
    featuredImage,
  } = post;

  // slug가 없는 경우 처리
  if (!slug) {
    console.warn('Post is missing slug:', post);
    return null;
  }

  return (
    <ScrollAnimation>
      <article className="post-card hover-glow">
        <div className="post-card-content">
          <header>
            <h2 className="post-card-title">
              <Link to={slug} className="link-underline">
                {title}
              </Link>
            </h2>
            <div className="post-card-meta">
              <time dateTime={date}>{date}</time>
              {category && (
                <span className="post-card-category">{category}</span>
              )}
            </div>
          </header>
          {featuredImage && (
            <div className="post-card-image image-hover">
              <img
                src={featuredImage}
                alt={title}
                loading="lazy"
                width="400"
                height="225"
              />
            </div>
          )}
          <div className="post-card-excerpt">{excerpt}</div>
          {tags && tags.length > 0 && (
            <div className="post-card-tags">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag}`}
                  className="post-card-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </ScrollAnimation>
  );
};

export default PostCard; 