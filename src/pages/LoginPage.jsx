import React, { useState } from 'react';
import "./Loginpage.css";
import backgroundVideo from "../assets/BackgroundLogin.mp4";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { loginUser, resetPassword, loginWithGoogle, loginWithOTP } from "../firebaseAuth";
import iconlogin from "../assets/iconlogin.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigation hook

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const user = await loginUser(email, password); // Pass email and password
      alert(`Welcome back, ${user.username || user.email}!`);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset your password.");
      return;
    }
    try {
      await resetPassword(email);
      alert(`Password reset link sent to ${email}. Please check your inbox.`);
    } catch (error) {
      console.error("Error during password reset:", error.message);
      alert("Failed to send reset link. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      alert(`Welcome back, ${user.displayName || user.email}!`);

      // Redirect to dashboard after successful Google login
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during Google login:", error.message);
      alert("Google login failed. Please try again.");
    }
  };

  const handleOTPLogin = () => {
    navigate('/otp-login'); // Redirect to OTP login page
  };
  

  return (
    <div className="page-container">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay-container">
        <h1 className="page-title">Login</h1>
        <div className="form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button onClick={handleLogin} className="form-button">Login</button>
          <button onClick={handleResetPassword} className="reset-button">Forgot Password?</button>
          <button onClick={handleGoogleLogin} className="google-button">
            <img src={iconlogin} alt="Google" className="google-icon" />
            Login with Google
          </button>
          <button onClick={handleOTPLogin} className="otp-button">Login with OTP</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
