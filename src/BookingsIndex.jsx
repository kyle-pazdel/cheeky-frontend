import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

export function BookingsIndex() {
  const [bookings, setBookings] = useState([]);

  const handleIndexBookings = () => {
    axios.get("/bookings.json").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  };

  const formatTime = (time) => {
    console.log(time);
    const formattedTime = format(new Date(time), "MMMM dd yyyy, p");
    return formattedTime;
  };

  useEffect(handleIndexBookings, []);

  return (
    <div>
      <h1>My Bookings!</h1>
      {bookings.map((booking) => (
        <div>
          {/* <div key={booking.id}>
            <h2>
              {booking.event_name} with {booking.performer_name}
            </h2>
            <img />
            <p>Date: {formatTime(booking.start_time)}</p>
            <div>
              <Link to={`/bookings/${booking.id}`}>See Booking Details</Link>
            </div>
          </div> */}
          <div key={booking.id} class="card">
            <h5 class="card-header">
              {booking.event_name} with {booking.performer_name}
            </h5>
            <div class="card-body">
              <h5 class="card-title">{formatTime(booking.start_time)}</h5>
              <p class="card-text">at {booking.address}</p>
              <Link to={`/bookings/${booking.id}`} class="btn btn-dark">
                See Booking Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
