import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoveCard.css";
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
import lovebackground from "../assets/love-background.mp4"

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

      // Expanded partner profiles (10 boys and 10 girls)
      const boysProfiles = [
        { name: "Aarav", age: 26, instagram: "@aarav_love", profileImage: Boy1 },
        { name: "Karan", age: 28, instagram: "@karan_vibes", profileImage: Boy2 },
        { name: "Rohan", age: 24, instagram: "@rohan_hunk", profileImage: Boy3 },
        { name: "Aditya", age: 23, instagram: "@aditya_charm", profileImage: Boy4 },
        { name: "Virat", age: 27, instagram: "@virat_stylish", profileImage: Boy5 },
        { name: "Arjun", age: 25, instagram: "@arjun_hero", profileImage: Boy6 },
        { name: "Kabir", age: 26, instagram: "@kabir_vibes", profileImage: Boy7 },
        { name: "Rahul", age: 24, instagram: "@rahul_rockstar", profileImage:Boy8  },
        { name: "Siddharth", age: 23, instagram: "@siddharth_lover", profileImage:Boy9 },
        { name: "Raj", age: 22, instagram: "@raj_cool", profileImage: Boy10 },
      ];

      const girlsProfiles = [
        { name: "Emily", age: 24, instagram: "@emily_vibes", profileImage: Girl1 },
        { name: "Sophia", age: 25, instagram: "@sophia_dreams", profileImage: Girl2 },
        { name: "Olivia", age: 23, instagram: "@olivia_star", profileImage: Girl3 },
        { name: "Isabella", age: 24, instagram: "@isabella_grace", profileImage: Girl4 },
        { name: "Mia", age: 22, instagram: "@mia_darling", profileImage: Girl5 },
        { name: "Zara", age: 25, instagram: "@zara_sassy", profileImage: Girl6 },
        { name: "Ava", age: 23, instagram: "@ava_glow", profileImage: Girl7 },
        { name: "Lily", age: 26, instagram: "@lily_flower", profileImage: Girl8 },
        { name: "Ella", age: 22, instagram: "@ella_sparkles", profileImage: Girl9 },
        { name: "Scarlett", age: 24, instagram: "@scarlett_fierce", profileImage: Girl10 },
      ];

      // Randomly select a match based on user preferences
      const matches = userDetails.interestedIn === "Boys" ? boysProfiles : girlsProfiles;
      const randomMatch = matches[Math.floor(Math.random() * matches.length)];
      setMatchedUser(randomMatch);
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
            <img src={matchedUser.profileImage} alt="Matched Profile" className="profile-image" />
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
