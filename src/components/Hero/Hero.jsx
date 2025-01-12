import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-content">
        <div className="flag-strip"></div>
        <h1 className="hero-title">
          Empowering Rural Women with
          <span className="hero-title-highlight"> Financial Wisdom</span>
        </h1>
        <p className="hero-subtitle">
          Your AI-powered companion for a brighter, more prosperous future
        </p>
        <div className="cta-container">
          <button className="cta-button">
            Start Your Journey
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="cta-shine"></div>
        </div>
        <div className="achievement-pills">
          <div className="pill">
            <span className="pill-icon">🎯</span>
            <span>10,000+ Users</span>
          </div>
          <div className="pill">
            <span className="pill-icon">💪</span>
            <span>500+ Success Stories</span>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="hero-image-background"></div>
        <div className="hero-image-wrapper">
          <img
            src="/images/Heropic.jpg"
            alt="Rural women using Dhana Sakhi app"
            className="hero-image"
          />
          <div className="floating-card top">
            <div className="card-icon">💰</div>
            <div className="card-text">
              <span className="card-label">Total Savings</span>
              <span className="card-value">₹10Cr+</span>
            </div>
          </div>
          <div className="floating-card bottom">
            <div className="card-icon">🌟</div>
            <div className="card-text">
              <span className="card-label">Community Rating</span>
              <span className="card-value">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
