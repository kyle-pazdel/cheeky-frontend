import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { BookingsShow } from "./BookingsShow";

export function BookingsIndex() {
  const [bookings, setBookings] = useState([]);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});

  const handleIndexBookings = () => {
    axios.get("http://localhost:3000/bookings.json").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  };

  const handleShowBooking = (booking) => {
    setIsBookingVisible(true);
    setCurrentBooking(booking);
  };

  const handleHideBooking = () => {
    setIsBookingVisible(false);
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
          <p>Location: {booking.location}</p>
          <p>Event Type: {booking.event_type}</p>
          <p>Location: {booking.location}</p>
          <p>Hourly Rate: {booking.performer_rate}</p>
          <p>Total: {booking.total}</p>
          <p>
            Start Time: {booking.start_time} – End Time: {booking.end_time}
          </p>
          <p>Location: {booking.location}</p>
          <small>
            Contact: {booking.performer_name} {booking.performer_email} {booking.performer_phone_number}
          </small>
          <div>
            <button onClick={() => handleShowBooking(booking)}>See Booking Details</button>
          </div>
        </div>
      ))}
      <Modal show={isBookingVisible} onClose={handleHideBooking}>
        <BookingsShow booking={currentBooking} />
      </Modal>
    </div>
  );
}
