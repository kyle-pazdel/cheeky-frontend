import { BookingsUpdate } from "./BookingsUpdate";
import { useParams } from "react-router-dom";
import { ReviewsNew } from "./ReviewsNew";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { DatePickerComponent } from "./DatePickerComponent";

export function BookingsShow() {
  const params = useParams();
  console.log(params);
  const [booking, setBooking] = useState({});
  const [isBookingUpdateVisible, setIsBookingUpdateVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  const startTime = booking.start_time;
  const endTime = booking.end_time;

  const handleShowBooking = () => {
    axios.get(`http://localhost:3000/bookings/${params.id}.json`).then((response) => {
      console.log(response.data);
      setBooking(response.data);
    });
  };

  const handleShowUpdateBooking = () => {
    setIsBookingUpdateVisible(true);
  };

  const handleHideUpdateBooking = () => {
    setIsBookingUpdateVisible(false);
  };

  useEffect(handleShowBooking, []);

  const handleIndexReviews = (review) => {
    setReviews(booking.reviews);
  };

  useEffect(handleIndexReviews);
  // const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const handleDestroyBooking = (booking) => {
    console.log("handleDestroyBooking");
    axios.delete(`http://localhost:3000/bookings/${booking.id}.json`).then((window.location.href = `/my-bookings`));
  };

  const handleCreateReview = (params) => {
    console.log(params);
    axios.post("http://localhost:3000/reviews.json", params).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <h2>
        {booking.event_name} with {booking.performer_name}
      </h2>
      <p>Event Type: {booking.event_type}</p>
      <p>Hourly Rate: {booking.performer_rate}</p>
      <p>Total: {booking.total}</p>
      <p>
        Start Time: {startTime} – End Time: {endTime}
      </p>
      <p>
        Location: {booking.address} {booking.city} {booking.state} {booking.postal_code}
      </p>
      <small>
        Contact: {booking.performer_name} {booking.performer_email} {booking.performer_phone_number}
      </small>
      <div>
        <button onClick={handleShowUpdateBooking}>Update Booking Details</button>
      </div>
      <Modal show={isBookingUpdateVisible} onClose={handleHideUpdateBooking}>
        <BookingsUpdate booking={booking} />
      </Modal>
      <div>
        <button onClick={handleDestroyBooking}>Cancel Booking</button>
      </div>
      {reviews?.map((review) => (
        <div>
          <p>
            {review.rating} ~ {review.comment}
          </p>
        </div>
      ))}
      <ReviewsNew booking={booking} onSubmitReview={handleIndexReviews} onCreateReview={handleCreateReview} />
    </div>
  );
}
