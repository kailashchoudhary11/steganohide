import { NavLink } from "react-router-dom";
import { useState } from "react";
import '../css/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
    <div className="navbar-left">
    <img src="/public/logo.png" alt="Logo Image" class="logo-image" />
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