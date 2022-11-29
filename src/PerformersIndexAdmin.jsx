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
    <div className="row">
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
                  <Link className="btn btn-warning" to={`/my-bookings/${performer.id}`}>
                    View {performer.name}'s Bookings
                  </Link>
                  <button className="btn btn-dark" onClick={() => props.onShowPerformerForm(performer)}>
                    Update Account Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
