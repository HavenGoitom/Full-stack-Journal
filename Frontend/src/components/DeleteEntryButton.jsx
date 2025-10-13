import React, { useState } from "react";
import axios from "axios";

export function DeleteEntryButton({ entryId, onDelete }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this journal?")) return;

    setLoading(true);
    try {
      await axios.delete(
        `https://cozypages.onrender.com/journals/${entryId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(entryId); 
    } catch (err) {
      console.error("Error deleting journal:", err);
      alert(err.response?.data?.detail || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="delete-button">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
