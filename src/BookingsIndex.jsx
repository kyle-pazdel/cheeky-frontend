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
      <p className="fs-2 fw-semibold">My Bookings</p>
      {bookings.map((booking) => (
        <div>
          <div key={booking.id} className="card shadow mb-4">
            <h5 className="card-header">
              {booking.event_name} with {booking.performer_name}
            </h5>
            <div className="card-body">
              <h5 className="card-title">{formatTime(booking.start_time)}</h5>
              <p className="card-text">at {booking.address}</p>
              <Link to={`/bookings/${booking.id}`} className="btn btn-dark">
                See Booking Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
