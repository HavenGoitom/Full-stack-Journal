import React, { useState } from "react";
import axios from "axios";

export function UpdateEntryForm({ entry, onUpdate, onCancel }) {
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.put(
        `https://cozypages.onrender.com/journals/${entry.id}/update/`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(res.data.data); 
    } catch (err) {
      console.error("Error updating journal:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Update Journal</h3>
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
        placeholder="Content"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>
        Cancel
      </button>
    </form>
  );
}
