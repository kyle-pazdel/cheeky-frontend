import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink> | <a href="#">Login</a> | <NavLink to="/signup">Signup</NavLink> |{" "}
        <a href="#">Sign Out</a>
      </nav>
    </header>
  );
}
