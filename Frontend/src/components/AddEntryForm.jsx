import React, { useState } from "react";
import axios from "axios";

export function AddEntryForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://cozypages.onrender.com/journals/", {
        title,
        content,
      });

      const newEntry = response.data;

      if (onAdd) {
        onAdd(newEntry);
      }

      // reset form
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Journal</h2>
      {error && <p className="error">{error}</p>}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        disabled={loading}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        disabled={loading}
      />
      <button className="add-button" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

