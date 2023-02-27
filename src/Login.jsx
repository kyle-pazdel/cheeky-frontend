import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = {
      email: email,
      password: password,
    };
    axios
      .post("/login", params)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        {
          response.data.is_admin === true ? localStorage.Storage.setItem("is_admin", response.data.is_admin) : null;
        }
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div
      id="login"
      className="top-buff card shadow mb-4 container d-flex flex-column align-items-center p-5"
      style={{ maxWidth: "40rem" }}
    >
      <p className="m-3 fs-5 fw-semibold card-title">Login</p>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Email
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button className="btn btn-dark" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
