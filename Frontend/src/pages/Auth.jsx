import React, { useState } from "react";
import axios from "axios";

export function Auth() {
  const [isSignup, setIsSignup] = useState(true); // toggle between signup/signin
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Sign Up
        const res = await axios.post("https://cozypages.onrender.com/signup/", {
          email,
          username,
          password,
        });
        setMessage("✅ Signup successful! You can now sign in.");
      } else {
        // Sign In
        const res = await axios.post("https://cozypages.onrender.com/signin/", {
          username,
          password,
        });
        setMessage(`✅ Welcome back, ${res.data.username || username}!`);
        console.log("Token:", res.data.token); // save to localStorage if needed
      }
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>

      <p>{message}</p>

      <button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: "10px" }}>
        {isSignup ? "Already have an account? Sign In" : "Don’t have an account? Sign Up"}
      </button>
    </div>
  );
}
