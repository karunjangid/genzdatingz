import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../api";
import "./LoveCard.css";
import lovebackground from "../assets/love-background.mp4"
import Girl1 from "../assets/Girl1.png"
import Girl2 from "../assets/Girl2.png"
import Girl3 from "../assets/Girl3.png"
import Girl4 from "../assets/Girl4.png"
import Girl5 from "../assets/Girl5.png"
import Girl6 from "../assets/Girl6.png"
import Girl7 from "../assets/Girl7.png"
import Girl8 from "../assets/Girl8.png"
import Girl9 from "../assets/Girl9.png"
import Girl10 from "../assets/Girl10.png"
import Boy1 from "../assets/Boy1.png"
import Boy2 from "../assets/Boy2.png"
import Boy3 from "../assets/Boy3.png"
import Boy4 from "../assets/Boy4.png"
import Boy5 from "../assets/Boy5.png"
import Boy6 from "../assets/Boy6.png"
import Boy7 from "../assets/Boy7.png"
import Boy8 from "../assets/Boy8.png"
import Boy9 from "../assets/Boy9.png"
import Boy10 from "../assets/Boy10.png"

const LoveCard = ({ userDetails }) => {
  const [loading, setLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to StartMatch if userDetails is missing
    if (!userDetails) {
      navigate("/start-match");
      return;
    }

    // Simulate loading and generate a random matched user
    setTimeout(() => {
      setLoading(false);

      // Get matches from API
      const matches = getMatches(userDetails.interestedIn);
      
      // Filter out current user from potential matches
      const filteredMatches = matches.filter(match => 
        match.instagram !== userDetails.instagram
      );
      if (filteredMatches.length > 0) {
        const randomMatch = filteredMatches[Math.floor(Math.random() * filteredMatches.length)];
        setMatchedUser(randomMatch);
      } else {
        // Fallback to default matches if no filtered matches available
        const defaultMatches = getMatches(userDetails.interestedIn);
        if (defaultMatches.length > 0) {
          setMatchedUser(defaultMatches[Math.floor(Math.random() * defaultMatches.length)]);
        } else {
          // If still no matches, show a message
          setMatchedUser({
            name: "No matches found",
            age: "",
            instagram: "",
            profileImage: ""
          });
        }
      }
    }, 3000); // Simulate a 3-second delay
  }, [userDetails, navigate]);

  if (!userDetails) {
    return null; // Prevent rendering if userDetails is missing
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Creating Your Perfect Match...</h1>
        <p>Just a moment of love!</p>
      </div>
    );
  }

  return (
    <div className="love-card-container">
            <video autoPlay loop muted>
        <source src={lovebackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>🌹 Your Love Connection 🌹</h1>
      <div className="love-card">
        {/* User Details */}
        <div className="user-details">
          <h2>Your Details</h2>
          <img src={userDetails.image} alt="Your Profile" className="profile-image" />
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Interested In:</strong> {userDetails.interestedIn}</p>
          <p><strong>Instagram:</strong> {userDetails.instagram}</p>
        </div>

        {/* Matched Partner Details */}
        {matchedUser && (
          <div className="matched-user">
            <h2>Your Match</h2>
            <img src={
              matchedUser.profileImage === "Boy1" ? Boy1 :
              matchedUser.profileImage === "Boy2" ? Boy2 :
              matchedUser.profileImage === "Boy3" ? Boy3 :
              matchedUser.profileImage === "Boy4" ? Boy4 :
              matchedUser.profileImage === "Boy5" ? Boy5 :
              matchedUser.profileImage === "Boy6" ? Boy6 :
              matchedUser.profileImage === "Boy7" ? Boy7 :
              matchedUser.profileImage === "Boy8" ? Boy8 :
              matchedUser.profileImage === "Boy9" ? Boy9 :
              matchedUser.profileImage === "Boy10" ? Boy10 :
              matchedUser.profileImage === "Girl1" ? Girl1 :
              matchedUser.profileImage === "Girl2" ? Girl2 :
              matchedUser.profileImage === "Girl3" ? Girl3 :
              matchedUser.profileImage === "Girl4" ? Girl4 :
              matchedUser.profileImage === "Girl5" ? Girl5 :
              matchedUser.profileImage === "Girl6" ? Girl6 :
              matchedUser.profileImage === "Girl7" ? Girl7 :
              matchedUser.profileImage === "Girl8" ? Girl8 :
              matchedUser.profileImage === "Girl9" ? Girl9 :
              matchedUser.profileImage === "Girl10" ? Girl10 :
              matchedUser.image
            } alt="Matched Profile" className="profile-image" />
            <p><strong>Name:</strong> {matchedUser.name}</p>
            <p><strong>Age:</strong> {matchedUser.age}</p>
            <p><strong>Instagram:</strong> {matchedUser.instagram}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveCard;
