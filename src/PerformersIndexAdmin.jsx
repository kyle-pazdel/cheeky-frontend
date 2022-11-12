import axios from "axios";
import { useState } from "react";
import { PerformersUpdate } from "./PerformersUpdate";
import { Modal } from "./Modal";

export function PerformersIndexAdmin(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [performers, setPerformers] = useState(props.performers);
  const [currentPerformer, setCurrentPerformer] = useState({});

  const handleShowForm = (performer) => {
    setIsFormVisible(true);
    setCurrentPerformer(performer);
  };

  const handleHideForm = () => {
    setIsFormVisible(false);
  };

  const handleUpdatePerformer = (performerId, params) => {
    axios
      .patch("/performers/" + performerId + ".json", params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        // setErrors(error.response.data.errors);
        // setStatus(error.response.status);
      });
  };

  const handleDestroyPerformer = () => {
    axios.delete(`/performers/${currentPerformer.id}.json`).then(() => {});
    handleHideForm();
    setPerformers(performers.filter((p) => p.id !== currentPerformer.id));
  };

  return (
    <div>
      <h1>Your Performers</h1>
      {performers?.map((performer) => (
        <div>
          <h3>
            {performer.name} ID: {performer.id}
          </h3>
          <p>Phone Number: {performer.phone_number}</p>
          <p>Email: {performer.email}</p>
          <p>Shortest Gig: {performer.shortest_gig}</p>
          <p>Longest Gig:{performer.longest_gig}</p>
          <p>
            Location: {performer.city}, {performer.state}
          </p>
          <p>Rate: ${performer.rate}</p>
          <p>Bio: {performer.bio}</p>
          <p>Instagram: {performer.instagram_handle}</p>
          <p>Twitter: @{performer.twitter_handle}</p>
          <p>Performance Type: {performer.performance_type}</p>
          <button onClick={() => handleShowForm(performer)}>Update {performer.name}'s Details</button>
          <Modal show={isFormVisible} onClose={handleHideForm}>
            <PerformersUpdate
              performer={currentPerformer}
              onUpdatePerformer={handleUpdatePerformer}
              onDestroyPerformer={handleDestroyPerformer}
              onClose={handleHideForm}
            />
          </Modal>
        </div>
      ))}
    </div>
  );
}
