import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DayJs from "react-dayjs";

export function BookingsNew() {
  const location = useLocation();
  // const { performer } = location.state;
  const performer = location.state.performer;
  const userId = location.state.userId;
  const [errors, setErrors] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState("");
  const [total, setTotal] = useState(null);

  const handleDuration = () => {
    setDuration((Date.parse(end) - Date.parse(start)) / 3600000);
  };
  const handleTotal = () => {
    console.log(performer.rate);
    setTotal(duration * performer.rate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/bookings.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/my-bookings"; // Change this to hide a modal, redirect to a specific page, etc.
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
      <h1>Book with {performer.name}</h1>
      <p>Your user id # is {userId}</p>
      <div>
        {/* <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="user_id" value={userId}></input>
          <input type="hidden" name="performer_id" value={performer.id}></input>
          <input type="hidden" name="total" value={total}></input>
          <div>
            Event Name: <input name="event_name" type="text" />
          </div>
          <div>
            address: <input name="address" type="text" />
          </div>
          <div>
            City: <input name="city" type="text" /> State: <input name="state" type="text" />
          </div>
          <div>
            Postal Code: <input name="postal_code" type="text" />
          </div>
          <div></div>
          <div>
            Event Type: <input name="event_type" type="text" />
          </div>
          <div>
            <label>
              Start Time: <p>{start}</p>
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
              End Time: <p>{end}</p>
              <input
                value={end}
                name="end_time"
                type="datetime-local"
                onChange={(event) => setEnd(event.target.value)}
              />
            </label>
          </div>
          {duration > 0 ? <h3>Duration: {duration} hours</h3> : <h3>Duration: 0</h3>}
          {total > 0 ? <h3>Total: ${total}</h3> : <h3>Total: $0</h3>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
