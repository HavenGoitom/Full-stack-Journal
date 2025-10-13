import React from "react";

function EntryDetail({ entry }) {
  return (
    <div className="detail">
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
    </div>
  );
}

export default EntryDetail;
