import React, { useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig"; // Firebase Authentication and Database
import { ref, get, update } from "firebase/database"; // Firebase Realtime Database methods
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const EditProfile = ({ profilePicture, setProfilePicture }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [previewImage, setPreviewImage] = useState(profilePicture || ""); // Profile picture preview
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid; // Get UID of logged-in user
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
        } else {
          alert("User data not found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        alert("An error occurred while loading your profile.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Display preview in the form
        setProfilePicture(reader.result); // Pass the updated picture to ViewProfile
      };
      reader.readAsDataURL(file); // Convert the file to a Base64 string
    }
  };

  const handleSaveChanges = async () => {
    try {
      const userId = auth.currentUser?.uid;
      const userRef = ref(database, `users/${userId}`);

      await update(userRef, {
        username,
        email,
        phoneNumber,
      });

      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect to the View Profile page
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to save changes.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
        {/* Profile Picture Upload */}
        <div>
          <label htmlFor="profilePicture">Upload Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="profile-image-preview"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />
        <button className="save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
