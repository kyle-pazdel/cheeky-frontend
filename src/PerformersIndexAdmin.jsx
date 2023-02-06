import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "react-phone-number-input";

export function PerformersIndexAdmin(props) {
  const [performers, setPerformers] = useState([]);

  const sortPerformers = (p) => {
    if (p) {
      p.sort((a, b) => (a.id > b.id ? 1 : -1));
      setPerformers(p);
    } else {
      null;
    }
  };

  useEffect(() => sortPerformers(props.performers));

  return (
    <div className="row top-buff">
      {performers?.map((performer) => (
        <div key={performer.id}>
          <div className="card mb-3 shadow" style={{ maxWidth: "100vh" }}>
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
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-12 d-grid">
                      <Link className="btn btn-success" to={`/my-bookings/${performer.id}`}>
                        View Bookings
                      </Link>
                    </div>
                    <div className="col-12 d-grid gap-2 mt-3">
                      <button className="btn btn-success" onClick={() => props.onShowPerformerForm(performer)}>
                        Update Account Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
