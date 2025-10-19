import React from "react";
import "../styles/JournalDetail.css";

function EntryDetail({ entry }) {
  return (
    <div className="detail">
      <h2>{entry.title}</h2>
      <p>{entry.created_at}</p>
      <p>{entry.content}</p>
    </div>
  );
}

export default EntryDetail;
