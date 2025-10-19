import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function DeleteEntryButton({ entryId, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const token = localStorage.getItem("access");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://cozypages.onrender.com/journals/${entryId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Journal deleted successfully!");
      onDelete(entryId);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to delete journal");
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <>
      <button onClick={() => setConfirm(true)} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>

      {confirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this journal?</p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button onClick={handleDelete} style={{ cursor: "pointer" }}>
                Yes
              </button>
              <button
                onClick={() => setConfirm(false)}
                style={{ cursor: "pointer" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
