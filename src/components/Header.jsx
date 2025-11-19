import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentUser, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="left-group">
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/logo2.png" alt="AbubakarDev Logo" style={{height: '32px'}} />
            </Link>
          </div>
        </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
              <li><Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
              <li><Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
              <li className="courses-li">
                <Link 
                  to="/courses" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="all-courses-btn" style={{
                    width: '146px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '32px',
                    padding: '0',
                    background: '#118aef',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: '500',
                    position: 'relative',
                    margin: '8px 0'
                  }}>
                    <span>All courses</span>
                  </span>
                </Link>
              </li>
              <li><Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link></li>
              <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
              
              {/* Auth-based navigation */}
              {currentUser ? (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="dashboard-link"
                    >
                      📚 My Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleSignOut}
                      className="logout-btn"
                      style={{
                        background: '#118aef',
                        color: 'white',
                        border: 'none',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                  <li>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        background: '#118aef',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="fas fa-user" style={{marginRight: '8px'}}></i>
                      Login
                    </Link>
                  </li>
              )}
            </ul>
          </nav>
          <div className="right-group">
            <Link 
              to="/courses" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="all-courses-btn" style={{
                width: '146px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '32px',
                padding: '0',
                background: '#118aef',
                color: '#fff',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: '500',
                position: 'relative',
                margin: '8px 0'
              }}>
                <span>All courses</span>
              </span>
            </Link>
          </div>
        </div>
    </header>
  )
}

export default Header