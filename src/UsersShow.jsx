import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { UsersUpdate } from "./UsersUpdate";
import { PerformersIndexAdmin } from "./PerformersIndexAdmin";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "react-phone-number-input";
import { FileForm } from "./FileForm";
import { PerformersUpdate } from "./PerformersUpdate";

// *** REFACTOR IN PROCESS: Moving PerformersUpdate in Modal up one level to be rendered directly in UsersShow.jsx ***
// ________________________(^^^ PICK UP HERE ^^^)____________________________

export function UsersShow() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [performers, setPerformers] = useState([]);
  const [currentPerformer, setCurrentPerformer] = useState({});
  const [isPerformerFormVisible, setIsPerformerFormVisible] = useState(false);
  const [isDeletePerformerVisible, setIsDeletePerformerVisible] = useState(false);

  const handleShowUser = () => {
    axios.get("/users/" + userId + ".json").then((response) => {
      setUser(response.data);
      setPerformers(response.data.performers);
    });
  };

  const handleShowUserForm = () => {
    setIsUserFormVisible(true);
  };

  const handleHideUserForm = () => {
    setIsUserFormVisible(false);
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

  // Performer Actions ( Update / Destroy )

  const handleShowPerformerForm = (performer) => {
    setCurrentPerformer(performer);
    setIsPerformerFormVisible(true);
    console.log(performer);
  };

  const handleHidePerformerForm = () => {
    setIsPerformerFormVisible(false);
  };

  const handleUpdatePerformer = (performerId, params) => {
    axios
      .patch("/performers/" + performerId + ".json", params)
      .then((response) => {
        handleSetPerformers(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
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

  const handleDestroyPerformer = () => {
    axios.delete(`/performers/${currentPerformer.id}.json`).then((response) => {
      handleRemovePerformer(currentPerformer);
    });
    handleHidePerformerForm();
    handleHideDeletePerformer();
  };

  const handleRemovePerformer = (performer) => {
    setPerformers(performers.filter((p) => p.id !== performer.id));
  };

  const handleShowDeletePerformer = () => {
    setIsDeletePerformerVisible(true);
  };

  const handleHideDeletePerformer = () => {
    setIsDeletePerformerVisible(false);
  };

  return (
    <div className="top-buff">
      <div className="row card shadow">
        <p className="card-header m-3 fs-3 fw-semibold">My Profile</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{user.first_name}</li>
          <li className="list-group-item">Last Name: {user.last_name}</li>
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Phone Number: {formatPhoneNumber(user.phone_number)}</li>
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
      <Modal show={isUserFormVisible} onClose={handleHideUserForm}>
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
          <h2 className="mb-4">Manage Talent Accounts</h2>
          <PerformersIndexAdmin
            performers={performers}
            user={user}
            onRemovePerformer={handleRemovePerformer}
            onShowPerformerForm={handleShowPerformerForm}
          />
          <div>
            <Modal show={isPerformerFormVisible} onClose={handleHidePerformerForm}>
              <button className="btn btn-sm btn-outline-success" onClick={handleShowDeletePerformer}>
                Delete {currentPerformer.name}'s Account
              </button>
              <div className="card mb-3 mt-4">
                <PerformersUpdate
                  performer={currentPerformer}
                  onUpdatePerformer={handleUpdatePerformer}
                  onClose={handleHidePerformerForm}
                />
              </div>

              <div className="card mb-3">
                <FileForm performer={currentPerformer} onClose={handleHidePerformerForm} />
              </div>

              <Modal show={isDeletePerformerVisible} onClose={handleHideDeletePerformer}>
                <div className="card m-4">
                  <p className="cardTitle">
                    Are you sure you want to delete <br /> {currentPerformer.name}'s account
                  </p>
                  <button className="btn btn-outline-success" onClick={handleDestroyPerformer}>
                    Yes, proceed.
                  </button>
                </div>
              </Modal>
            </Modal>
            <Link
              className="shadow btn btn-success btn-lg d-flex flex-row  justify-content-center pb-0 mb-4"
              to="/add-performer"
            >
              <p className="mb-1 mx-3">&#x2b;</p> <p className="mb-1">Add Queen</p>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
