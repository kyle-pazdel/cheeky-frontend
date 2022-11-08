import { useState, useEffect } from "react";
import axios from "axios";

export function UsersShow() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");

  const handleShowUser = () => {
    axios.get("http://localhost:3000/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
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
    </div>
  );
}
