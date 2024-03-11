import React, { useState } from 'react';
import './LoginComponent.css'; // Ensure this CSS file exists and is correctly styled
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginComponent = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios(
      {
        method: "POST",
        url: `http://localhost:8080/api/auth/login`,
        data: {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password
        },
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/home")
      }
    }).catch((err) => {
      console.log(err);
      return false;
    })


  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
