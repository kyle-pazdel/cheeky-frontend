export function PerformersIndexAdmin(props) {
  return (
    <div>
      <h1>Your Performers</h1>
      {props.performers.map((performer) => (
        <div>
          <h3>{performer.name}</h3>
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
        </div>
      ))}
    </div>
  );
}
