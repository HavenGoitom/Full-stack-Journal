import React from "react";
import "../styles/JournalList.css";

function JournalList({ entries, onSelect }) {
  return (
    <div className="your-journals">
      <h2>Your Journals</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <h3>{entry.title}</h3>
          
          <div className="actions">
            <button onClick={() => onSelect(entry)}>View</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JournalList;
