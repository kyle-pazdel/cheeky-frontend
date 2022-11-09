import { Link } from "react-router-dom";
import { BookingsNew } from "./BookingsNew";

export function PerformersShow(props) {
  const userId = localStorage.getItem("user_id");
  const performer = props.performer;

  return (
    <div>
      <h4>{performer.name}</h4>
      <p>
        {performer.city}, {performer.state}
      </p>
      <p>{performer.bio}</p>
      <p>
        gig range: {performer.shortest_gig}min – {performer.longest_gig}min
      </p>
      <p>performance type: {performer.performance_type}</p>
      <p>hourly rate: {performer.rate}</p>
      <p>{performer.email}</p>
      <p>@{performer.twitter_handle} on Twitter</p>
      <p>{performer.instagram_handle} on Instagram</p>
      {localStorage.jwt !== undefined ? (
        <Link to="/book" state={{ performer, userId }}>
          Book Now
        </Link>
      ) : null}
      <div>
        <h3>{performer.name}'s Reviews</h3>
        {performer.performer_reviews.map((review) => (
          <div key={review.id}>
            <p>
              {review.rating} ~ {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
