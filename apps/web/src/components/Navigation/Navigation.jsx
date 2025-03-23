// src/components/Navigation/Navigation.jsx (updated)
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
    
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
      
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <Link to="/dashboard">Emergency Response System</Link>
      </div>

      <div className="nav-links">
        <Link to="/dashboard" className="nav-item">
          Dashboard
        </Link>
        <div className="user-profile">
          <div className="profile-image">
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={user.fullName} />
            ) : (
              <div className="profile-initials">
                {user.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="profile-dropdown">
            <div className="user-name">{user.fullName}</div>
            <div className="user-role">{user.role}</div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={() => navigate("/profile")}>
              My Profile
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
