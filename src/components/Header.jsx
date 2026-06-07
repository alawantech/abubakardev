import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt, FaTh, FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentUser, signOut } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 20)
      } else {
        setIsScrolled(true)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsMobileMenuOpen(false)
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const goToBook = () => {
    setIsMobileMenuOpen(false)
    navigate('/book')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo2.png" alt="ZedroTech Logo" className="header-logo" />
          </Link>
        </div>

        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          <div className="header-cta-group">
            <button
              type="button"
              className="header-book-btn"
              onClick={goToBook}
              aria-label="Book a free 15-minute call"
            >
              <FaPhoneAlt className="header-btn-icon" />
              <span>Book a free call</span>
            </button>
          </div>

          {currentUser && (
            <div className="auth-group">
              <Link to="/dashboard" className="dashboard-pill">
                <FaUser className="btn-icon" />
                <span>Dashboard</span>
              </Link>
              <button onClick={handleSignOut} className="logout-pill" title="Logout">
                <FaSignOutAlt className="btn-icon" />
                <span>Logout</span>
              </button>
            </div>
          )}

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="mobile-cta-row">
                <button
                  type="button"
                  className="mobile-book-btn"
                  onClick={goToBook}
                >
                  <FaPhoneAlt />
                  <span>Book a free call</span>
                </button>
              </li>
              {currentUser && (
                <>
                  <li>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="mobile-logout">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
