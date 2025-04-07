import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const correctEmail = "do";
  const correctPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === correctEmail && password.trim() === correctPassword) {
      setLoading(true);
      setLoginError(false);

      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false);
      }, 1500);
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fullpage-loader">
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
          <div className="spinner-grow text-info" role="status"></div>
          <div className="spinner-grow text-light" role="status"></div>
          <div className="spinner-grow text-dark" role="status"></div>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <img src="logo.png" alt="iDiscipline Logo" className="logo" />
            <h2>iDiscipline</h2>

            {loginError && (
              <div className="alert alert-danger text-center w-100 mt-2" role="alert">
                Invalid email or password
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
              <input
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
      )}
    </>
  );
}

export default Login;

