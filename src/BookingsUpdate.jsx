import axios from "axios";
import DayJs from "react-dayjs";
import { useState, useEffect } from "react";

export function BookingsUpdate(props) {
  const booking = props.booking;
  const [errors, setErrors] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState("");
  const [total, setTotal] = useState("");

  const handleDuration = () => {
    setDuration((Date.parse(end) - Date.parse(start)) / 3600000);
  };
  const handleTotal = () => {
    setTotal(duration * booking.performer_rate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .patch(`http://localhost:3000/bookings/${booking.id}.json`, params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = `/my-bookings`; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  useEffect(handleDuration);
  useEffect(handleTotal);
  return (
    <div>
      <h3>Update Event Details Here</h3>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="total" value={total}></input>
        <div>
          Event Name: <input name="event_name" defaultValue={props.booking.event_name} type="text" />
        </div>
        <div>
          address: <input name="address" defaultValue={props.booking.address} type="text" />
        </div>
        <div>
          City: <input name="city" defaultValue={props.booking.city} type="text" /> State:{" "}
          <input name="state" defaultValue={props.booking.state} type="text" />
        </div>
        <div>
          Postal Code: <input name="postal_code" defaultValue={props.booking.postal_code} type="text" />
        </div>
        <div></div>
        <div>
          Event Type: <input name="event_type" defaultValue={props.booking.event_type} type="text" />
        </div>
        <div>
          <label>
            Updated Start Time: <p>{start}</p>
            <input
              value={start}
              name="start_time"
              type="datetime-local"
              onChange={(event) => setStart(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Updated End Time: <p>{end}</p>
            <input value={end} name="end_time" type="datetime-local" onChange={(event) => setEnd(event.target.value)} />
          </label>
        </div>
        {duration > 0 ? <h3>Updated Duration: {duration} hours</h3> : <h3>Updated Duration: 0</h3>}
        {total > 0 ? <h3>Updated Total: ${total}</h3> : <h3>Updated Total: $0</h3>}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
