import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Auth } from "./pages/Auth";
import { JournalPage } from "./pages/JournalPage";
import { NavBar } from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Auth onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/journal"
          element={
            isLoggedIn ? (
              <JournalPage />
            ) : (
              <div
                style={{
                  padding: "90px",
                  textAlign: "center",
                  backgroundColor: "#dbcab5ff",
                  height: "69.9vh",
                }}
              >
                <h2>Please log in to access your journals.</h2>
              </div>
            )
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        style={{ marginTop: "70px" }}
      />
    </Router>
  );
}
