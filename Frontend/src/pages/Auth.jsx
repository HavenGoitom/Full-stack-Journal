import React, { useState } from "react";
import axios from "axios";

export function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      if (isSignup) {
        // --- SIGN UP ---
        const res = await axios.post(
          "https://cozypages.onrender.com/signup/",
          {
            email,
            username,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Signup response:", res.data);
        setMessage("Signup successful! You can now sign in.");
        setIsSignup(false);
      } else {
        // --- SIGN IN ---
        const res = await axios.post(
          "https://cozypages.onrender.com/signin/",
          {
            username,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        console.log("Signin response:", res.data);
        setMessage(` Welcome back, ${username}!`);
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data);
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Something went wrong";
      setMessage(" Error: " + errorMsg);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {isSignup && (
          <>
            Email:
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}
        <br />
        Name:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className="signup-button" type="submit">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
        <p>{message}</p>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don’t have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}
