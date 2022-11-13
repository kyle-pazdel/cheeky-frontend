import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PaymentProcessing() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [booking, setBooking] = useState({});
  const [isPaid, setIsPaid] = useState(false);

  const handleShowBooking = () => {
    axios.get(`/bookings/${params.id}.json`).then((response) => {
      console.log(response.data);
      setBooking(response.data);
    });
  };

  useEffect(handleShowBooking, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = {
      paid: isPaid,
    };
    axios
      .patch(`/bookings/${booking.id}.json`, params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = `/bookings/${booking.id}`;
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const handleIsPaidChange = () => {
    setIsPaid(!isPaid);
  };

  const handleCancel = () => {
    window.location.href = `/bookings/${booking.id}`;
  };
  return (
    <div>
      <div>
        <h3>
          {booking.event_name} with {booking.performer_name}
        </h3>
        <p>${booking.total}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name (as it appears on your card):
              <input type="text"></input>
            </label>
          </div>
          <div>
            <label>
              Card Number
              <input type="text"></input>
            </label>
          </div>
          <div>
            <label>
              Expiration Date:
              <input type="text"></input>
            </label>
          </div>
          <div>
            <label>
              Security Code:
              <input type="text"></input>
            </label>
          </div>
          <div>
            <div>
              <a href="#">Terms and Conditions</a>
            </div>
            <label>
              Agree to Terms and Conditiions:
              <input type="checkbox" value={`${isPaid}`} onChange={handleIsPaidChange}></input>
            </label>
          </div>
          {isPaid === false ? (
            <div>
              <p>Please agree to our terms and conditions</p>
            </div>
          ) : null}
          <div>
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
