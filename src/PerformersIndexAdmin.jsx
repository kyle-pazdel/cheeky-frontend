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
    <div className="row">
      {performers?.map((performer) => (
        <div key={performer.id}>
          <div className="card mb-3" style={{ maxWidth: "100vh" }}>
            <div className="row g-0">
              <div className="col-md-4">
                {performer.posts[0]?.image_url !== undefined ? (
                  <img
                    src={performer.posts[0]?.image_url}
                    alt={`photo of ${performer.name}`}
                    className="card-ig card-img-top"
                  />
                ) : (
                  <Link className="btn btn-outline-dark" to={`/profile-image/${performer.id}`}>
                    Add a profile Image
                  </Link>
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                    content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-5">
            <div key={performer.id} className="card" style={{ width: "25rem" }}>
              {performer.posts[0]?.image_url !== undefined ? (
                <img
                  src={performer.posts[0]?.image_url}
                  alt={`photo of ${performer.name}`}
                  className="card-ig card-img-top"
                />
              ) : (
                <Link className="btn btn-outline-dark" to={`/profile-image/${performer.id}`}>
                  Add a profile Image
                </Link>
              )}

              <div className="card-body">
                <h5 className="card-title">{performer.name}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{performer.phone_number}</li>
                  <li className="list-group-item">{performer.email}</li>
                  <li className="list-group-item">
                    {performer.city}, {performer.state}
                  </li>
                </ul>
                <p className="card-text">{performer.bio}</p>
              </div>
              <button className="btn btn-dark" onClick={() => handleShowForm(performer)}>
                Update Account Details
              </button>
            </div>

            <Modal show={isFormVisible} onClose={handleHideForm}>
              <PerformersUpdate
                performer={currentPerformer}
                onUpdatePerformer={handleUpdatePerformer}
                onDestroyPerformer={handleDestroyPerformer}
                onClose={handleHideForm}
              />
              <FileForm performer={currentPerformer} onClose={handleHideForm} />
            </Modal>
          </div> */}
        </div>
      ))}
    </div>
  );
}
