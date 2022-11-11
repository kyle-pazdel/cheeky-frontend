import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
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
      .post("/users", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} action="/photos" method="post" enctype="multipart/form-data">
        <div>
          {password !== passwordConfirmation && passwordConfirmation.length !== 0 ? <p>Password must match</p> : null}
          <label>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange}></input>
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={handleLastNameChange}></input>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange}></input>
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange}></input>
          </label>
        </div>
        {/* <div>
          <input name="photo[image]" type="hidden" />
          <input name="photo[image] " type="file" />
        </div> */}
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange}></input>
          </label>
          <label>
            Confirm Password:
            <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange}></input>
          </label>
          <label>
            Signing Up as a Queen?:
            <input type="checkbox" value={isAdmin} onChange={handleIsAdminChange}></input>
          </label>
          <p>Is "My Value" checked? {isAdmin.toString()}</p>
        </div>
        <button type="submit" value="Create">
          Signup
        </button>
      </form>
    </div>
  );
}
