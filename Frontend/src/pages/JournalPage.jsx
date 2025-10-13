import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddEntryForm } from "../components/AddEntryForm";
import JournalList from "../components/JournalList";
import EntryDetail from "../components/EntryDetail";

export function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("https://cozypages.onrender.com/journals/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(res.data.data || []);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  const handleAddEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="app">
      <h1>📝 My Journal</h1>
      <div className="main-layout">
        <div className="left-panel">
          <AddEntryForm onAdd={handleAddEntry} />
          <JournalList entries={entries} onSelect={setSelectedEntry} />
        </div>
        <div className="right-panel">
          {selectedEntry ? (
            <EntryDetail entry={selectedEntry} />
          ) : (
            <p>Select a journal entry to view</p>
          )}
        </div>
      </div>
    </div>
  );
}
