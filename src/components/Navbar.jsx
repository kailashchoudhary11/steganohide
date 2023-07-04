import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/public/logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="navbar-right">
        <NavLink to=".">Home</NavLink>
        <NavLink to="hide">Hide</NavLink>
        <NavLink to="reveal">Reveal</NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
