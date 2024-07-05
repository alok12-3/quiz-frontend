import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">Quiz App</div>
        <ul className="nav-links">
          <li>
            <NavLink exact to="/teacher" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacher/quiz" activeClassName="active-link">
              Quiz
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacher/students" activeClassName="active-link">
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacher/bookmarks" activeClassName="active-link">
              Bookmarks
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
