import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { UsersUpdate } from "./UsersUpdate";
import { PerformersIndexAdmin } from "./PerformersIndexAdmin";
import { Link } from "react-router-dom";

export function UsersShow() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [performers, setPerformers] = useState([]);

  const handleShowUser = () => {
    axios.get("/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
      setPerformers(response.data.performers);
      console.log("handleShowUser");
    });
  };

  const handleShowUserForm = () => {
    setIsFormVisible(true);
  };

  const handleHideUserForm = () => {
    setIsFormVisible(false);
  };

  const handleSetPerformers = (p) => {
    setPerformers(
      performers.map((performer) => {
        if (performer.id === p.id) {
          return p;
        } else {
          return performer;
        }
      })
    );
  };

  const handleUpdateUser = (userId, params) => {
    axios
      .patch("/users/" + userId + ".json", params)
      .then((response) => {
        const updatedUser = response.data;
        setUser(updatedUser);
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(error.response.data.errors);
        setStatus(error.response.status);
      });
  };

  const handleDestroyUser = (id) => {
    axios.delete(`/users/${id}.json`);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  useEffect(handleShowUser, []);

  return (
    <div>
      <div className="row card">
        <p className="card-header m-3 fs-3 fw-semibold">My Profile</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{user.first_name}</li>
          <li className="list-group-item">Last Name: {user.last_name}</li>
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Phone Number: {user.phone_number}</li>
          <button className="btn btn-dark" onClick={handleShowUserForm}>
            Edit Account Details
          </button>
        </ul>
      </div>
      {errors !== undefined ? (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      <Modal show={isFormVisible} onClose={handleHideUserForm}>
        <UsersUpdate
          user={user}
          errors={errors}
          onUpdateUser={handleUpdateUser}
          onHideUserForm={handleHideUserForm}
          onDestroyUser={handleDestroyUser}
        />
      </Modal>
      {user.is_admin === true ? (
        <div>
          <h2>Manage Talent Accounts</h2>
          <PerformersIndexAdmin performers={performers} user={user} onSetPerformers={handleSetPerformers} />
          <Link to="/add-performer">Add Queen</Link>
        </div>
      ) : null}
    </div>
  );
}
