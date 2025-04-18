import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig"; // Adjust the import path as necessary
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fullpage-loader">
          <div className="spinner-grow text-primary" role="status"></div>
          {/* Your other spinners */}
        </div>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <img src="logo.png" alt="iDiscipline Logo" className="logo" />
            <h2>iDiscipline</h2>

            {loginError && (
              <div className="alert alert-danger text-center w-100 mt-2" role="alert">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
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
