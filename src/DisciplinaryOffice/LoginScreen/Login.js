import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Ensure you have styles for layout

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const correctEmail = "do";
  const correctPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    if (email.trim() === correctEmail && password.trim() === correctPassword) {
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="logo.png" alt="iDiscipline Logo" className="logo" />
        <h2>iDiscipline</h2>
        <form onSubmit={handleSubmit}>
          <input
            key="email-input"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            key="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
