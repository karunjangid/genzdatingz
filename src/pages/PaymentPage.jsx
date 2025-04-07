import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import logo from "../assets/logo.jpg"
import paymentVideo from "../assets/payment-background.mp4"

const PaymentPage = ({ userDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true); // Show spinner while initializing Razorpay

    const options = {
      key: "rzp_live_URSNEAcY2B1yTk", // Replace with your Razorpay API key
      amount: 900, // ₹1 in paise (special offer)
      currency: "INR",
      name: "Karma IT Solutions",
      description: "Love Match Payment",
      image: logo, // Replace with your logo URL
      handler: function (response) {
        setIsLoading(false);
        console.log("Payment Response: ", response); // Logs payment details for debugging
        alert("Payment Successful! 🎉");
        navigate("/love-card"); // Redirect to LoveCard page
      },
      prefill: {
        name: userDetails?.name || "User", // Prefill with user's name
        email: "user@example.com", // Replace with user's email
      },
      theme: {
        color: "#FF758C", // Customize Razorpay modal theme color
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false); // Stop spinner if modal is dismissed
          alert("Payment was cancelled. Please try again.");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    razorpay.on("payment.failed", function (response) {
      setIsLoading(false);
      console.error("Payment Failed: ", response.error);
      alert("Payment failed. Please try again.");
    });
  };

  return (
    <div className="payment-page">
              <video autoPlay loop muted>
        <source src={paymentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1>Complete Your Payment</h1>
      <p>Original Price: ₹499/-</p>
      <p>Discounted Price: ₹9/- (Limited Time Offer!)</p>
      <button onClick={handlePayment} className="pay-button" disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay ₹9/-"}
      </button>

      {isLoading && <div className="spinner"></div>}
    </div>
  );
};

export default PaymentPage;
