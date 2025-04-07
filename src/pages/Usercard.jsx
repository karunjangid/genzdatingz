import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.profilePicture} alt={user.name} className="user-image" />
      <h3 className="user-name">{user.name}</h3>
      <p className="user-bio">{user.bio}</p>
      <button className="connect-button">Connect</button>
    </div>
  );
};

export default UserCard;
