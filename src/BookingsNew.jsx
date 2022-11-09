import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function BookingsNew() {
  const location = useLocation();
  // const { performer } = location.state;
  const performer = location.state.performer;
  const userId = location.state.userId;
  const [errors, setErrors] = useState([]);

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
          <div>
            Event Type: <input name="event_type" type="text" />
          </div>
          <div>
            Start Time: <input name="start_time" type="datetime-local" />
            End Time: <input name="end_time" type="datetime-local" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
