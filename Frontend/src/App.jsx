import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {Auth} from "./pages/Auth";
import {JournalPage} from "./pages/JournalPage";
import {NavBar} from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}
