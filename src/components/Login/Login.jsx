
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (username && password) {
     
      const storedUser = localStorage.getItem("currentUser");

      if (storedUser) {
       
        navigate("/dashboard");
      } else {
        
        alert("No account found. Please sign up first.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Emergency Response System</h2>
        <h4>Responder Login</h4>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
