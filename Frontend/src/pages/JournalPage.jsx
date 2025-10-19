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
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  const token = localStorage.getItem("access");

  const localQuotes = [
    { content: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { content: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { content: "Act as if what you do makes a difference. It does.", author: "William James" },
    { content: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { content: "The best way out is always through.", author: "Robert Frost" },
    { content: "Failure is another steppingstone to greatness.", author: "Oprah Winfrey" },
    { content: "Great things never come from comfort zones.", author: "Roy T. Bennett" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Small steps in the right direction can turn out to be the biggest step of your life.", author: "Naeem Callaway" },
    { content: "Make each day your masterpiece.", author: "John Wooden" },
    { content: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
    { content: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" },
    { content: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
    { content: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { content: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { content: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
    { content: "What we think, we become.", author: "Buddha" },
  ];

  const fetchQuote = () => {
    setLoadingQuote(true);
    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setQuote(random);
    setLoadingQuote(false);
  };

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

  useEffect(() => {
    fetchEntries();
    fetchQuote();

    const interval = setInterval(fetchQuote, 15000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="main-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <AddEntryForm onAdd={handleAddEntry} />
          <JournalList entries={entries} onSelect={setSelectedEntry} />
        </div>

        {/* Right Panel */}
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
            <div className="quote-section">
              {loadingQuote ? (
                <p className="loading-text">Fetching an inspiring quote...</p>
              ) : (
                <>
                  <h2 className="quote-text">“{quote?.content}”</h2>
                  <p className="quote-author">— {quote?.author}</p>
                  <button className="refresh-quote" onClick={fetchQuote}>
                    Refresh Quote
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
