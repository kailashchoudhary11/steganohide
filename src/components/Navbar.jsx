import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import LogoImage from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to=".">
          <img src={LogoImage} alt="Logo" className="logo-image" />
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to=".">Home</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="hide">Hide</NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="reveal">Reveal</NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
