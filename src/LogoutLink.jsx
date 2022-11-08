import axios from "axios";
import { Link } from "react-router-dom";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <div>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  );
}
