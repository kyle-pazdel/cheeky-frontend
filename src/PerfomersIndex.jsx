import { Link } from "react-router-dom";

export function PerformersIndex(props) {
  return (
    <div className="row justify-content-center" id="performers-index">
      {props.performers.map((performer) => (
        <div key={performer.id} className="card col-2 shadow m-3" style={{ width: "18rem" }}>
          <div>
            <img
              src={performer.profile_image?.image_url}
              alt={`image of ${performer.name}`}
              className="card-img card-img-top"
            />
          </div>
          <div className="card-img h-100 d-flex flex-column justify-content-end">
            <h5 className="card-title mt-2">{performer.name}</h5>
            {performer.city !== "" && performer.state !== "" ? (
              <small className="card-text">
                {performer.city}, {performer.state}
              </small>
            ) : (
              <small className="card-text">
                {performer.city} {performer.state}
              </small>
            )}
            <Link to={`/performers/${performer.id}`} className="btn btn-dark mt-3">
              More Info
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
