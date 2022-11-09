import { useState, useEffect } from "react";
import axios from "axios";
import DayJs from "react-dayjs";
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

  const handleDestroyBooking = (booking) => {
    console.log("handleDestroyBooking");
    axios.delete(`http://localhost:3000/bookings/${booking.id}.json`).then((response) => {
      setBookings(bookings.filter((b) => b.id !== booking.id));
    });
  };

  const handleCreateReview = (params) => {
    console.log(params);
    axios.post("http://localhost:3000/reviews.json", params).then((response) => {
      console.log(response.data);
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
            <button onClick={() => handleShowBooking(booking)}>See Booking Details</button>
          </div>
        </div>
      ))}
      <Modal show={isBookingVisible} onClose={handleHideBooking}>
        <BookingsShow
          booking={currentBooking}
          onDestroyBooking={handleDestroyBooking}
          onCancelBooking={handleHideBooking}
          onCreateReview={handleCreateReview}
        />
      </Modal>
    </div>
  );
}
