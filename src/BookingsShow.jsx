export function BookingsShow(props) {
  return (
    <div>
      <h2>
        {props.booking.event_name} with {props.booking.performer_name}
      </h2>
      <p>Location: {props.booking.location}</p>
      <p>Event Type: {props.booking.event_type}</p>
      <p>Location: {props.booking.location}</p>
      <p>Hourly Rate: {props.booking.performer_rate}</p>
      <p>Total: {props.booking.total}</p>
      <p>
        Start Time: {props.booking.start_time} – End Time: {props.booking.end_time}
      </p>
      <p>Location: {props.booking.location}</p>
      <small>
        Contact: {props.booking.performer_name} {props.booking.performer_email} {props.booking.performer_phone_number}
      </small>
    </div>
  );
}
