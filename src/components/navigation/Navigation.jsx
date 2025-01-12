import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/auth');
  };

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="flag-strip"></div>
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">💰</div>
          <span className="logo-text">Dhana Sakhi</span>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              Home
            </Link>
            
            <div 
              className={`services-dropdown ${isServicesOpen ? 'active' : ''}`}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="services-trigger">
                Services
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className="services-content">
                <Link to="/ai-coach" className="service-item" onClick={closeMenu}>
                  <span className="service-icon">🤖</span>
                  <div className="service-info">
                    <span className="service-title">AI Coach</span>
                    <span className="service-desc">Personal financial guidance</span>
                  </div>
                </Link>
                <Link to="/budget" className="service-item" onClick={closeMenu}>
                  <span className="service-icon">📊</span>
                  <div className="service-info">
                    <span className="service-title">Budget</span>
                    <span className="service-desc">Track your expenses</span>
                  </div>
                </Link>
                <Link to="/learn" className="service-item" onClick={closeMenu}>
                  <span className="service-icon">📚</span>
                  <div className="service-info">
                    <span className="service-title">Learn</span>
                    <span className="service-desc">Financial education</span>
                  </div>
                </Link>
                <Link to="/save-together" className="service-item" onClick={closeMenu}>
                  <span className="service-icon">🤝</span>
                  <div className="service-info">
                    <span className="service-title">Save Together</span>
                    <span className="service-desc">Community savings</span>
                  </div>
                </Link>
              </div>
            </div>

            <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>
              About
            </Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>
              Contact
            </Link>
          </div>

          <div className="nav-auth">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="auth-button logout">
                Logout
              </button>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth?mode=login" className="auth-button login" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/auth?mode=signup" className="auth-button signup" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
