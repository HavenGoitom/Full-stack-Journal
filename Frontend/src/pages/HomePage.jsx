import React from "react";

export function HomePage() {
  return (
    <div className="homepage">
      <h2>
        <span className="welcome">
          Welcome,
          <br />
        </span>{" "}
        You’re in a Place to write your ideas thoughts or stories
      </h2>
      <div className="home-bottom">
        <div>
          <h3>
            <span>📝</span><br/>
            Add Journals
          </h3>
        </div>
        <div>
          <h3>
            <span>👀</span><br/>view your Journals
          </h3>
        </div>
        <div>
          <h3>
            <span>🤖</span><br/>
            Ai revise
          </h3>
        </div>
      </div>
    </div>
  );
}
