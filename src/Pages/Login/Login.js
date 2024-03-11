// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../../Components/LoginComponent/LoginComponent';
import './LoginStyles.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/Home'); 
  };

  return (
    <div className="container">
      <div className="login-form">
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
