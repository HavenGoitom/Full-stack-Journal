import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddEntryForm } from "../components/AddEntryForm";
import JournalList from "../components/JournalList";
import EntryDetail from "../components/EntryDetail";
import { UpdateEntryForm } from "../components/UpdateEntryForm";
import { DeleteEntryButton } from "../components/DeleteEntryButton";

export function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("https://cozypages.onrender.com/journals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data.data || []);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  const handleAddEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  const handleUpdateEntry = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
    );
    setSelectedEntry(updatedEntry);
    setEditing(false);
  };

  const handleDeleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setSelectedEntry(null);
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
            editing ? (
              <UpdateEntryForm
                entry={selectedEntry}
                onUpdate={handleUpdateEntry}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <>
                <EntryDetail entry={selectedEntry} />
                <div className="entry-actions">
                  <button onClick={() => setEditing(true)}>Edit</button>
                  <DeleteEntryButton
                    entryId={selectedEntry.id}
                    onDelete={handleDeleteEntry}
                  />
                </div>
              </>
            )
          ) : (
            <p>Select a journal entry to view</p>
          )}
        </div>
      </div>
    </div>
  );
}
