import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../Components/LoginComponent/LoginComponent';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/Home'); 
  };

  return (
    <div>
      <h1>Welcome to Notes Mangement System</h1>
      <LoginComponent onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
