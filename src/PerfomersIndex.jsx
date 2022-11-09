import { Link } from "react-router-dom";

export function PerformersIndex(props) {
  return (
    <div>
      {props.performers.map((performer) => (
        <div key={performer.id}>
          <h4>{performer.name}</h4>
          <p>
            {performer.city}, {performer.state}
          </p>
          {/* <button onClick={() => props.onSelectPerformer(performer)}>More Info</button> */}
          <Link to={`/performers/${performer.id}`}>More Info</Link>
        </div>
      ))}
    </div>
  );
}
