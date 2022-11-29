import axios from "axios";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleIsAdminChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
      password_confirmation: passwordConfirmation,
      is_admin: isAdmin,
    };
    axios
      .post("/users.json", params)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        {
          response.data.is_admin === true ? localStorage.Storage.setItem("is_admin", response.data.is_admin) : null;
        }
        event.target.reset();
        {
          isAdmin === true ? (window.location.href = "/add-performer") : (window.location.href = "/");
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div
      id="signup"
      className="top-buff card shadow container mb-4 d-flex flex-column align-items-center p-5"
      style={{ maxWidth: "40rem" }}
    >
      <h1>Signup</h1>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} action="/photos" method="post" enctype="multipart/form-data">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            First Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Last Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          ></input>
        </div>
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
          <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
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
            onChange={handlePasswordChange}
          ></input>
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Confirm Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
          ></input>
        </div>
        {password !== passwordConfirmation && passwordConfirmation.length !== 0 ? <p>Password must match</p> : null}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            value={`${isAdmin}`}
            onChange={handleIsAdminChange}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Signing Up as a Queen?
          </label>
        </div>

        <button className="btn btn-dark mt-3" type="submit" value="Create">
          Signup
        </button>
      </form>
    </div>
  );
}
