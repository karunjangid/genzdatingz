import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; // Create a new Dashboard component
import './styles.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import OTPLogin from './pages/Otplogin';
import EditProfile from './pages/EditProfile';
import ViewProfile from './pages/ViewProfile';
import StartMatch from './pages/StartMatch';
import PaymentPage from './pages/PaymentPage';
import MatchCard from './pages/MatchCard';
import LoveCard from "./pages/LoveCard";

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-login" element={<OTPLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-match" element={<StartMatch setUserDetails={setUserDetails} />} />
        <Route path="/payment" element={<PaymentPage userDetails={userDetails} />} />
        <Route path="/love-card" element={<LoveCard userDetails={userDetails} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/match-card" element={<MatchCard userDetails={userDetails} />}/>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;