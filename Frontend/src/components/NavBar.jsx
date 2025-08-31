import React from "react";
import { Link, NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink  to="/">
          <h1>Cozy</h1>
        </NavLink>
      </div>
      <div className="nav-elements">
        <ul>
          <li>
            <Link className="list" to="/">Home</Link>
          </li>

          <li>
            <Link to="/journal">Journal</Link>
          </li>
          <li>
            <Link className="login-button" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
