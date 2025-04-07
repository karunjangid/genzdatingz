import React, { useState } from 'react';
import './Registerpage.css';
import backgroundVideo from '../assets/BackgroundRegister.mp4';
import { loginWithGoogle, registerUser } from '../firebaseAuth';
import iconlogin from "../assets/iconlogin.png"
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !phoneNumber) {
      alert("All fields (username, email, password, and mobile number) are required.");
      return;
    }
    try {
      const user = await registerUser(email, password, username, phoneNumber);
      alert(`Welcome, ${username}! Your registration was successful.`);
      
      // Redirect to login page after alert
  navigate({LoginPage});
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const user = await loginWithGoogle();
      alert(`Welcome, ${user.displayName || user.email}!`);
    } catch (error) {
      alert('Google registration failed: ' + error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay-content">
        <h1 className="page-title">Register</h1>
        <div className="form-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="tel"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button onClick={handleRegister} className="form-button">Register</button>
          <button onClick={handleGoogleRegister} className="google-button">
            <img src={iconlogin} alt="Google" className="google-icon" />
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
