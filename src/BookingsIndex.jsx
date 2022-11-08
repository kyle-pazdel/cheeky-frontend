import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";

export function BookingsIndex() {
  const [bookings, setBookings] = useState([]);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState([]);

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
      <Modal show={isBookingVisible} onClose={handleHideBooking}>
        {/* <BookingShow booking={currentBooking} /> */}
      </Modal>
    </div>
  );
}
