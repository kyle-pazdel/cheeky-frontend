export function PerformersShow(props) {
  return (
    <div>
      <h4>{props.performer.name}</h4>
      <p>
        {props.performer.city}, {props.performer.state}
      </p>
      <p>{props.performer.bio}</p>
      <p>
        gig range: {props.performer.shortest_gig} min – {props.performer.longest_gig}min
      </p>
      <p>performance type: {props.performer.performance_type}</p>
      <p>hourly rate: {props.performer.rate}</p>
      <p>{props.performer.email}</p>
      <p>@{props.performer.twitter_handle} on Twitter</p>
      <p>{props.performer.instagram_handle} on Instagram</p>
    </div>
  );
}
