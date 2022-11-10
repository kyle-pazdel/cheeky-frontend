import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function BookingsIndex() {
  const [bookings, setBookings] = useState([]);

  const handleIndexBookings = () => {
    axios.get("/bookings.json").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  };

  useEffect(handleIndexBookings, []);

  return (
    <div>
      <h1>My Bookings!</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h2>
            {booking.event_name} with {booking.performer_name}
          </h2>
          <p>Date: {booking.start_time}</p>
          <div>
            <Link to={`/bookings/${booking.id}`}>See Booking Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
