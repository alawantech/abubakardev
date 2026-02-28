import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt, FaTh, FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const SchoolHeader = () => {
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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="logo-with-tag">
                            <img src="/logo2.png" alt="ZedroTech Logo" className="header-logo" />
                        </div>
                    </Link>
                </div>

                <nav className="desktop-nav">
                    <ul className="nav-list">
                        {navLinks.map((link, index) => (
                            <React.Fragment key={link.path}>
                                <li>
                                    <Link
                                        to={link.path}
                                        className={location.pathname === link.path ? 'active' : ''}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                                {index === 0 && (
                                    <li className="nav-courses-item">
                                        <Link to="/courses" className="courses-button nav-courses-btn">
                                            <FaTh className="btn-icon" />
                                            <span>All Courses</span>
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>

                <div className="header-right">
                    {currentUser ? (
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
                    ) : (
                        <Link to="/login" className="login-pill">
                            <FaUser className="btn-icon" />
                            <span>Login</span>
                        </Link>
                    )}

                    <Link to="/courses" className="courses-button mobile-courses-btn">
                        <FaTh className="btn-icon" />
                        <span>All Courses</span>
                    </Link>

                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                            {currentUser ? (
                                <>
                                    <li>
                                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                            Student Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="mobile-logout">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}

export default SchoolHeader
