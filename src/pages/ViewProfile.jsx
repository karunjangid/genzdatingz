import React, { useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ViewProfile = ({ profilePicture }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        console.log("Logged-in User UID:", userId);

        const userRef = ref(database, `users/${userId}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            console.log("User Data Fetched:", snapshot.val());
            setUserData(snapshot.val());
          } else {
            alert("User data not found in the database.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          alert("An error occurred while loading your profile.");
        }
      } else {
        alert("You are not logged in. Redirecting to login...");
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available. Please check your database entry.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Display uploaded or placeholder profile picture */}
        <img
          src={profilePicture || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="profile-image"
        />
        <h1 className="profile-name">{userData.username}</h1>
        <p className="profile-detail"><strong>Email:</strong> {userData.email}</p>
        <p className="profile-detail"><strong>Mobile Number:</strong> {userData.phoneNumber}</p>
        <button
          className="edit-button"
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
