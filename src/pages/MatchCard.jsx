import React from "react";
import "./MatchCard.css";

const MatchCard = ({ userDetails }) => {
  if (!userDetails) {
    return (
      <div className="loading-message">
        No user details available. Please go back and submit your information again.
      </div>
    );
  }

  return (
    <div className="match-card">
      <h1>Congratulations! 🎉</h1>
      <div className="user-data">
        <h2>Your Details:</h2>
        <img src={userDetails.image} alt="Your Profile" className="profile-image" />
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Age:</strong> {userDetails.age}</p>
        <p><strong>Interested In:</strong> {userDetails.interestedIn}</p>
        <p><strong>Instagram:</strong> {userDetails.instagram}</p>
      </div>
      <div className="matched-account">
        <h2>Your Match:</h2>
        <p><strong>Name:</strong> Emily</p>
        <p><strong>Instagram:</strong> @emilyvibes</p>
      </div>
    </div>
  );
};

export default MatchCard;
