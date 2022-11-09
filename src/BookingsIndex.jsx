import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DayJs from "react-dayjs";

export function BookingsIndex() {
  const [bookings, setBookings] = useState([]);

  const handleIndexBookings = () => {
    axios.get("http://localhost:3000/bookings.json").then((response) => {
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
          <p>Event Type: {booking.event_type}</p>
          <p>Hourly Rate: {booking.performer_rate}</p>
          <p>Total: {booking.total}</p>
          <p>
            Start Time: <DayJs format="MMMM D, YYYY">{booking.start_time}</DayJs> at
            <DayJs format="h:mm A">{booking.start_time}</DayJs> – End Time:
            <DayJs format="MMMM D, YYYY">{booking.end_time}</DayJs> at <DayJs format="h:mm A">{booking.end_time}</DayJs>
          </p>
          <p>
            Location: {booking.address} {booking.city} {booking.state} {booking.postal_code}
          </p>
          <small>
            Contact: {booking.performer_name} {booking.performer_email} {booking.performer_phone_number}
          </small>
          <div>
            <Link to={`/bookings/${booking.id}`}>See Booking Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
