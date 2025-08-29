import React, { useState, useEffect } from "react";
import axios from "axios";
import {AddEntryForm} from "../components/AddEntryForm";
import JournalList from "../components/JournalList";
import EntryDetail from "../components/EntryDetail";

const API_URL = "http://localhost:8000/api/entries/";

export function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get(API_URL);
    setEntries(res.data);
  };

  const handleAddEntry = async (newEntry) => {
    const res = await axios.post(API_URL, newEntry);
    setEntries([...entries, res.data]);
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
