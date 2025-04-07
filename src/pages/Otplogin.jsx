import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase Auth instance
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './OTPLogin.css'; // Add custom styles

const OTPLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  // Initialize Recaptcha
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified');
        },
      },
      auth
    );
  };

  const handleSendOTP = async () => {
    if (!phone) {
      alert('Please enter a valid phone number!');
      return;
    }
    try {
      setupRecaptcha(); // Setup Recaptcha
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation); // Store confirmation for verification step
      alert('OTP sent to your phone number!');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || !confirmationResult) {
      alert('Please enter the OTP sent to your phone!');
      return;
    }
    try {
      const userCredential = await confirmationResult.confirm(otp);
      setIsVerified(true);
      alert(`Welcome, ${userCredential.user.phoneNumber}!`);
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-login-container">
      <h1>OTP Login</h1>
      <div className="otp-form">
        {!isVerified ? (
          <>
            <input
              type="text"
              placeholder="Enter phone number (e.g., +1234567890)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="otp-input"
            />
            <button onClick={handleSendOTP} className="otp-button">
              Send OTP
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />
            <button onClick={handleVerifyOTP} className="otp-button">
              Verify OTP
            </button>
          </>
        ) : (
          <h2>Login Successful! 🎉</h2>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OTPLogin;
