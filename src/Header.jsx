import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useState, useEffect } from "react";

export function Header(props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={
          props.colorChange
            ? "navbar colorChange navbar-expand-lg navbar-dark fixed-top py-3"
            : "navbar color navbar-expand-lg navbar-dark fixed-top py-3"
        }
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top">
            Cheeky
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={props.onNavHome}>
                  Home
                </Link>
              </li>
              {localStorage.jwt === undefined ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={props.onNavOther}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" onClick={props.onNavOther}>
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <LogoutLink />
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      My Account
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item" to="/me" onClick={props.onNavOther}>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-events" onClick={props.onNavOther}>
                          My Bookings
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
