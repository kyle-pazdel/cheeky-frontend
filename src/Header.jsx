import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [colorChange, setColorChange] = useState(false);
  const { height, width } = useWindowDimensions();

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

  const changeNavbarColor = () => {
    if (location.pathname !== "/") {
      setColorChange(true);
    } else if (window.scrollY >= height * 0.8 && location.pathname === "/") {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  const handleNavHome = () => {
    setColorChange(false);
    var nav = document.getElementById("navbarTogglerDemo02");
    var btn = document.getElementById("navbarBtn");
    nav.classList.remove("show");
    btn.classList.add("collapsed");
  };

  const handleNavOther = () => {
    setColorChange(true);
    var nav = document.getElementById("navbarTogglerDemo02");
    var btn = document.getElementById("navbarBtn");
    nav.classList.remove("show");
    btn.classList.add("collapsed");
  };

  window.addEventListener("scroll", changeNavbarColor);
  window.addEventListener("load", changeNavbarColor);

  return (
    <>
      <nav
        className={
          colorChange
            ? "navbar colorChange navbar-expand-sm navbar-dark fixed-top py-3"
            : "navbar color navbar-expand-sm navbar-dark fixed-top py-3"
        }
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top">
            Cheeky
          </a>
          <button
            className="navbar-toggler"
            id="navbarBtn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => handleNavHome()}>
                  Home
                </Link>
              </li>
              {localStorage.jwt === undefined ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={() => handleNavOther()}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" onClick={() => handleNavOther()}>
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
                        <Link className="dropdown-item" to="/me" onClick={() => handleNavOther()}>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-events" onClick={() => handleNavOther()}>
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
