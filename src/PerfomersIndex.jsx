import { Link } from "react-router-dom";

export function PerformersIndex(props) {
  return (
    <div>
      {props.performers.map((performer) => (
        <div key={performer.id}>
          <h4>{performer.name}</h4>
          <img src={performer.profile_image.image_url} alt={`image of ${performer.name}`} className="profile-image" />
          <p>
            {performer.city}, {performer.state}
          </p>
          <Link to={`/performers/${performer.id}`}>More Info</Link>
        </div>
      ))}
    </div>
  );
}
