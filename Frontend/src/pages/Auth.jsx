import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Auth({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // --- SIGN UP ---
        const res = await axios.post(
          "https://cozypages.onrender.com/signup/",
          { email, username, password },
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Signup successful! You can now sign in.");
        setIsSignup(false);
      } else {
        // --- SIGN IN ---
        const res = await axios.post(
          "https://cozypages.onrender.com/signin/",
          { username, password },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        toast.success(`Welcome back, ${username}!`);
        onLoginSuccess?.();

        setTimeout(() => {
          navigate("/journal");
        }, 200); 
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {isSignup && (
          <>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}

        <label>Name:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="signup-button" type="submit" disabled={loading}>
          {loading
            ? isSignup
              ? "Signing Up..."
              : "Signing In..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          style={{ cursor: "pointer", color: "#555", marginTop: "12px" }}
        >
          {isSignup
            ? "Already have an account? Sign In"
            : "Don’t have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}
