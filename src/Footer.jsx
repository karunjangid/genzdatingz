import React from 'react';
import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-logo">
          <h1>Gen-Z Datingz</h1>
          <p className="footer-tagline">Find your vibe, match your tribe.</p>
        </div>
        <form className="footer-subscribe">
          <label htmlFor="email" className="subscribe-label">Stay Updated:</label>
          <div className="subscribe-input-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </div>
        </form>
        <div className="footer-socials">
          <a href="" target="_blank" rel="">
            <FaFacebook className="social-icon" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 Gen-Z Datingz. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
