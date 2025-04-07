import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import logo from "../assets/logo.jpg";
import paymentVideo from "../assets/payment-background.mp4";

const PaymentPage = ({ userDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
  };

  const handlePayment = () => {
    setIsLoading(true);

    const options = {
      key: "rzp_live_URSNEAcY2B1yTk", // Replace with your Razorpay API key
      amount: 100,
      currency: "INR",
      name: "Karma IT Solutions",
      description: "Love Match Payment",
      image: logo,
      handler: function (response) {
        setIsLoading(false);
        console.log("Payment Response: ", response);
        showAlert("Payment Successful! 🎉");
      
        // Fallback navigation
        try {
          navigate("/love-card");
        } catch (error) {
          console.error("Navigation failed, redirecting manually", error);
          window.location.href = "/love-card";
        }
      },
      
      
      prefill: {
        name: userDetails?.name || "User",
        email: "user@example.com",
      },
      theme: {
        color: "#FF758C",
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
          showAlert("Payment was cancelled. Please try again.");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    razorpay.on("payment.failed", function (response) {
      setIsLoading(false);
      console.error("Payment Failed: ", response.error);
      showAlert("Payment failed. Please try again.");
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

      {/* Stylish Alert */}
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default PaymentPage;
