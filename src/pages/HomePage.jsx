import React from 'react';
import './Homepage.css';
import backgroundVideo from '../assets/BackgroundHome.mp4';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Background Video */}
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      {/* Overlay Content */}
      <div className="home-overlay-content">
        <h1 className="homepage-title typing-effect">Welcome to Gen-Z Datingz</h1>
        <p className="homepage-subtitle fade-in">
          Find connections that truly match your vibe. Let the future of dating begin!
        </p>

        {/* Buttons */}
        <div className="button-container">
          <a href="/login" className="homepage-button neon-hover">Log In</a>
          <a href="/register" className="homepage-button register-button neon-hover">Register</a>
          <a href="/start-match" className="homepage-button start-match-button neon-hover">Start Match</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
