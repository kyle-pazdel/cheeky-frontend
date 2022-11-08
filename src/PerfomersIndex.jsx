export function PerformersIndex(props) {
  return (
    <div>
      {props.performers.map((performer) => (
        <div key={performer.id}>
          <h4>{performer.name}</h4>
          <p>
            {performer.city}, {performer.state}
          </p>
          <button onClick={() => props.onSelectPerformer(performer)}>More Info</button>
        </div>
      ))}
    </div>
  );
}
