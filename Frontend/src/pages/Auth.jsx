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
        setMessage(" Signup successful! You can now sign in.");
      } else {
        // Sign In
        const res = await axios.post("https://cozypages.onrender.com/signin/", {
          username,
          password,
        });
        setMessage(` Welcome back, ${res.data.username || username}!`);
        console.log("Token:", res.data.token);
      }
    } catch (err) {
      setMessage(
        " Error: " + (err.response?.data?.error || "Something went wrong")
      );
    }
  };

  return (
    <div className="auth-page">
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 >{isSignup ? "Sign Up" : "Sign In"}</h2>
        {isSignup && (
          
          <>
            <lable>Email: </lable>
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
        <lable>Name: </lable>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <lable>Password: </lable>

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
