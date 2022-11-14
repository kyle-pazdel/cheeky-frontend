import axios from "axios";
import { Link } from "react-router-dom";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_admin");
    window.location.href = "/";
  };

  return (
    <a href="#" className="nav-link" onClick={handleClick}>
      Logout
    </a>
  );
}
