import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">Quiz App</div>
        <ul className="nav-links">
          <li>
            <NavLink exact to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" activeClassName="active-link">
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" activeClassName="active-link">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" activeClassName="active-link">
              History
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
