import { useEffect } from "react";
import DayJs from "react-dayjs";
import dayjs from "dayjs";

export function BookingsShow(props) {
  const startTime = props.booking.start_time;
  const endTime = props.booking.end_time;
  return (
    <div>
      <h2>
        {props.booking.event_name} with {props.booking.performer_name}
      </h2>
      <p>Event Type: {props.booking.event_type}</p>
      <p>Hourly Rate: {props.booking.performer_rate}</p>
      <p>Total: {props.booking.total}</p>
      <p>
        Start Time: <DayJs format="MMMM D, YYYY">{startTime}</DayJs> at <DayJs format="h:mm A">{startTime}</DayJs> – End
        Time: <DayJs format="MMMM D, YYYY">{endTime}</DayJs> at <DayJs format="h:mm A">{endTime}</DayJs>
      </p>
      <p>
        Location: {props.booking.address} {props.booking.city} {props.booking.state} {props.booking.postal_code}
      </p>
      <small>
        Contact: {props.booking.performer_name} {props.booking.performer_email} {props.booking.performer_phone_number}
      </small>
    </div>
  );
}
