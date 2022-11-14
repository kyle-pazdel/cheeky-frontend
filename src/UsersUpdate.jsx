import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Modal } from "./Modal";

export function UsersUpdate(props) {
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [email, setEmail] = useState(props.user.email);
  const [phoneNumber, setPhoneNumber] = useState(props.user.phone_number);
  const [isAccountDeleteVisible, setIsAccountDeleteVisible] = useState(false);

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

  const handleShowAccountDelete = () => {
    setIsAccountDeleteVisible(true);
  };

  const handleHideAccountDelete = () => {
    setIsAccountDeleteVisible(false);
  };

  const handleClick = () => {
    props.onDestroyUser(props.user.id);
  };
  return (
    <div className="mt-5 mb-2">
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
          {/* <span className="input-group-text" id="inputGroup-sizing-sm">
            Phone Number
          </span> */}
          <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
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
        {/* <button className="btn btn-outline-success btn-sm" onClick={handleClick}>
          Delete Account
        </button> */}
        <button className="btn btn-outline-success btn-sm" onClick={handleShowAccountDelete}>
          Delete Account
        </button>
        <Modal show={isAccountDeleteVisible} onClose={handleHideAccountDelete}>
          <div className="card m-4">
            <p className="cardTitle">Are you sure you want to cancel?</p>
            <button className="btn btn-outline-success" onClick={handleClick}>
              Yes, proceed.
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
