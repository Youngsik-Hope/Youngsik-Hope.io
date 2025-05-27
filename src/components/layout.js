/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import '../styles/layout.scss'

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="layout">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="site-title">
              Youngsik-Hope's Blog
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/categories" className="nav-link">Categories</Link>
              <Link to="/about" className="nav-link">About</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Youngsik-Hope. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
