import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartMatch.css";
import SmartMatchVideo from "../assets/SmartMatchVideo.mp4"; // Import your video file

const StartMatch = ({ setUserDetails }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!image || !name || !age || !interestedIn || !instagram) {
      alert("Please fill out all fields.");
      return;
    }

    setUserDetails({
      image,
      name,
      age,
      interestedIn,
      instagram,
    });

    navigate("/payment");
  };

  return (
    <div className="start-match-page">
      {/* Background Video */}
      <video autoPlay loop muted>
        <source src={SmartMatchVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form className="start-match-form" onSubmit={(e) => e.preventDefault()}>
        <label>We Want Your Details For Perfect Match</label>
        {image && <img src={image} alt="Preview" className="image-preview" />}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Your Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select value={interestedIn} onChange={(e) => setInterestedIn(e.target.value)}>
          <option value="">Interested In</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>
        <input
          type="text"
          placeholder="Instagram Handle"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StartMatch;
