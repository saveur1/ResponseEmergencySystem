
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "responder",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
      });

    
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

   
    console.log("Registering user:", formData);

    
    const user = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      profileImageUrl: imagePreview, 
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-card middle_card_width">
        <figure className="login_icon">
            <img src="/icon.png" alt="Emergency Response" width={ 300 } height={ 200 } />
        </figure>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="responder">First Responder</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <figure className="image_signup">
            <div className="profile-image-preview">
                {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" />
                ) : (
                    <div className="image-placeholder">
                    <span>Profile Image</span>
                    </div>
                )}
                </div>
                <div className="profile-image-section">
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <label htmlFor="profileImage" className="upload-btn">
                Choose Image
                </label>
            </div>
          </figure>

          <button type="submit" className="signup-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
