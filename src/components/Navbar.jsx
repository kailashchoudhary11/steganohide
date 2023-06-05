import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to=".">Home</NavLink>
      <NavLink to="hide">Hide</NavLink>
      <NavLink to="reveal">Reveal</NavLink>
    </nav>
  );
}
