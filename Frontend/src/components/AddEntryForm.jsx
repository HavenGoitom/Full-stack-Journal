import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddJournal.css";

export function AddEntryForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.warning("Please fill in both fields.", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://cozypages.onrender.com/journals/",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newEntry = res.data.data;
      onAdd(newEntry);
      setTitle("");
      setContent("");
      toast.success("Journal added successfully!", { position: "top-center" });
    } catch (err) {
      console.error("Error adding journal:", err);
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2>Add Your Journal</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          disabled={loading}
          className="title-input"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          disabled={loading}
          className="content-input"
        />
        <button className="add-button" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        style={{ marginTop: "70px" }}
      />
    </>
  );
}
