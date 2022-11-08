import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { UsersUpdate } from "./UsersUpdate";

export function UsersShow() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleShowUser = () => {
    axios.get("http://localhost:3000/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  const handleShowUserForm = () => {
    setIsFormVisible(true);
  };

  const handleHideUserForm = () => {
    setIsFormVisible(false);
  };

  const handleUpdateUser = (userId, params) => {
    axios.patch("http://localhost:3000/users/" + userId + ".json", params).then((response) => {
      const updatedUser = response.data;
      setUser(updatedUser);
    });
  };

  useEffect(handleShowUser, []);

  return (
    <div>
      <h1>My Profile!</h1>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <button onClick={handleShowUserForm}>Edit Account Details</button>
      <Modal show={isFormVisible} onClose={handleHideUserForm}>
        <UsersUpdate user={user} onUpdateUser={handleUpdateUser} onHideUserForm={handleHideUserForm} />
      </Modal>
    </div>
  );
}
