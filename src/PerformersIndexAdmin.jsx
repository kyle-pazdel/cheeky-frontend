import axios from "axios";
import { useEffect, useState } from "react";
import { PerformersUpdate } from "./PerformersUpdate";
import { Modal } from "./Modal";
import { FileForm } from "./FileForm";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "react-phone-number-input";

export function PerformersIndexAdmin(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [performers, setPerformers] = useState([]);
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
        props.onSetPerformers(response.data);
        // sortPerformers(
        //   performers.map((performer) => {
        //     if (performer.id === response.data.id) {
        //       return response.data;
        //     } else {
        //       return performer;
        //     }
        //   })
        // );
      })
      .catch((error) => {
        console.log(error.response);
        // setErrors(error.response.data.errors);
        // setStatus(error.response.status);
      });
  };

  const handleDestroyPerformer = () => {
    axios.delete(`/performers/${currentPerformer.id}.json`).then((response) => {
      props.onRemovePerformer(currentPerformer);
      console.log(currentPerformer);
    });
    handleHideForm();
  };

  const sortPerformers = (p) => {
    if (p) {
      p.sort((a, b) => (a.id > b.id ? 1 : -1));
      console.log(p);
      setPerformers(p);
    } else {
      null;
    }
  };

  useEffect(() => sortPerformers(props.performers));

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
                  <h5 className="card-title">{performer.name}</h5>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{formatPhoneNumber(performer.phone_number)}</li>
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
              </div>
            </div>
          </div>
          <Modal show={isFormVisible} onClose={handleHideForm}>
            <div className="card mb-3 mt-4">
              <PerformersUpdate
                performer={currentPerformer}
                onUpdatePerformer={handleUpdatePerformer}
                onDestroyPerformer={handleDestroyPerformer}
                onClose={handleHideForm}
              />
            </div>
            <div className="card mb-3">
              <FileForm performer={currentPerformer} onClose={handleHideForm} />
            </div>
            <button className="btn btn-sm btn-outline-success" onClick={handleDestroyPerformer}>
              Delete {performer.name}'s Account
            </button>
          </Modal>
        </div>
      ))}
    </div>
  );
}
