import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import profileIcon from '../assets/logo.jpg'; // Logo for the app
import videoBackground from '../assets/backgroundicon.mp4'; // Futuristic video background
import { getUserProfile, fetchMatches } from '../api'; // Mock API for user and matches
import Footer from '../Footer'

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [matches, setMatches] = useState([]);

  // Fetch user data and matches on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(); // Get logged-in user's profile
        const userMatches = await fetchMatches(); // Get user matches
        setUsername(userProfile.username);
        setMatches(userMatches);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <nav className="navbar">
  <div className="logo-container">
    <img src={profileIcon} alt="Gen-Z Datingz Logo" className="logo" />
    <h1 className="logo-text">Gen-Z Datingz</h1>
  </div>
  <ul className="nav-links">
    <li className="nav-item">Home</li>
    <li className="nav-item">Messages</li>
    <li className="nav-item">Matches</li>
    <li className="nav-item">Settings</li>
    <li className="nav-item profile-dropdown">
      <span className="profile-label">Profile</span>
      <ul className="dropdown-menu">
        <a href="/profile"><li>View Profile</li></a>
        <a href="/profile/edit"><li>Edit Profile</li></a>
        <a href="/login" style={{textDecoration:"none"}}><li >Logout</li></a>
      </ul>
    </li>
  </ul>
</nav>




<div className="welcome-message">
  <h1 className="welcome-title">
    Welcome, <span className="username">{username || 'User'}</span>!
  </h1>
  <p className="welcome-subtitle">Let’s explore your matches and make meaningful connections.</p>
</div>

      {/* Matches Section */}
      <div className="matches-section">
  <h2 className="matches-title">Your Perfect Matches</h2>
  <div className="matches-container">
    {matches.map((match) => (
      <div key={match.id} className="match-card">
        <div className="match-overlay">
          <img src={match.profilePicture} alt={match.name} className="match-image" />
          <h3 className="match-name">{match.name}</h3>
          <p className="match-bio">{match.bio || 'Let’s make a connection!'}</p>
          <button className="connect-button">Connect</button>
        </div>
      </div>
    ))}
  </div>
</div>



<Footer />
    </div>
  );
};

export default Dashboard;
