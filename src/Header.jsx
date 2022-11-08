import { NavLink } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        {localStorage.jwt === undefined ? (
          <>
            <NavLink to="/login">Login</NavLink> | <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <LogoutLink />
        )}
      </nav>
    </header>
  );
}
