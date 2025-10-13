import React from "react";
import { Link, NavLink } from "react-router-dom";

export function NavBar({ isLoggedIn, onLogout }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink to="/">
          <h1>Cozy</h1>
        </NavLink>
      </div>
      <div className="nav-elements">
        <ul>
          <li>
            <Link className="list" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>

          {isLoggedIn ? (
            <li>
              <button className="login-button" onClick={onLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link className="login-button" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
