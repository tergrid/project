import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "./Login.css"; // Import the external CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="page-wrapper">
      {/* Background Image */}
      <img
        src="https://royaltyfreefootages.com/upload/video/Zodiac%20wheel,%20Zodiac%20wheel%20png,%20Zodiac%20wheel%20png%20image,%20Zodiac%20wheel%20transparent%20png%20images%20download_1658935859.png"
        alt="Astro Illustration"
        className="astro-image"
      />

      {/* Form Section */}
      <div className="form-wrapper">
        <h1 className="title">Welcome!</h1>
        <p>Please enter your details</p>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-wrapper">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="link-wrapper">
            <a href="/change-password">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Log In"}
          </button>
        </form>

        {/* Google Login Button */}
        <button className="google-button">
          <FaGoogle /> Log In with Google
        </button>

        {/* Sign-up Link */}
        <div className="center-link-wrapper">
          <span>Don't have an account?&nbsp;</span>
          <a href="/create-account">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
