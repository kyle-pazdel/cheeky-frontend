import { useState } from "react";

export function UsersUpdate(props) {
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.email);
  const [phoneNumber, setPhoneNumber] = useState(props.user.phone_number);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
    };
    props.onHideUserForm();
    props.onUpdateUser(props.user.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyUser(props.user.id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Phone Number
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>
        </div>
        <button className="btn btn-dark" type="submit">
          Update Account Details
        </button>
      </form>
      {props.errors !== undefined ? (
        <ul>
          {props.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      <div>
        <button className="btn btn-outline-success btn-sm" onClick={handleClick}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
