import axios from "axios";
import { useState } from "react";
import { PerformersUpdate } from "./PerformersUpdate";
import { Modal } from "./Modal";
import { FileForm } from "./FileForm";
import { Link } from "react-router-dom";

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
      {performers?.map((performer) => (
        <div key={performer.id}>
          <h3>{performer.name}</h3>

          {performer.posts[0]?.image_url !== undefined ? (
            <img src={performer.posts[0]?.image_url} alt={`photo of ${performer.name}`} className="profile-image" />
          ) : (
            <Link to={`/profile-image/${performer.id}`}>Add a profile Image for {performer.name}</Link>
          )}
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
          {/* {performer.posts?.map((post) => (
            <div key={post.id}>
              <img src={post.image_url} alt={`image of ${performer.name}`} className="profile-image" />
            </div>
          ))} */}
          <Modal show={isFormVisible} onClose={handleHideForm}>
            <PerformersUpdate
              performer={currentPerformer}
              onUpdatePerformer={handleUpdatePerformer}
              onDestroyPerformer={handleDestroyPerformer}
              onClose={handleHideForm}
            />
            <FileForm performer={currentPerformer} onClose={handleHideForm} />
          </Modal>
        </div>
      ))}
    </div>
  );
}
