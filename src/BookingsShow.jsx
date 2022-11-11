import { BookingsUpdate } from "./BookingsUpdate";
import { useParams } from "react-router-dom";
import { ReviewsNew } from "./ReviewsNew";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapComponent } from "./MapComponent";
import { ReviewsUpdate } from "./ReviewsUpdate";

export function BookingsShow() {
  const params = useParams();
  console.log(params);
  const [booking, setBooking] = useState({});
  const [isBookingUpdateVisible, setIsBookingUpdateVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewUpdateVisible, setIsReviewUpdateVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState({});

  const startTime = booking.start_time;
  const endTime = booking.end_time;

  const handleShowBooking = () => {
    axios.get(`/bookings/${params.id}.json`).then((response) => {
      console.log(response.data);
      setBooking(response.data);
      setReviews(response.data.reviews);
    });
  };

  const handleShowUpdateBooking = () => {
    setIsBookingUpdateVisible(true);
  };

  const handleHideUpdateBooking = () => {
    setIsBookingUpdateVisible(false);
  };

  const handleShowUpdateReview = (review) => {
    setIsReviewUpdateVisible(true);
    setCurrentReview(review);
    console.log(currentReview);
  };

  const handleHideUpdateReview = () => {
    setIsReviewUpdateVisible(false);
  };

  useEffect(handleShowBooking, []);

  // const handleClick = () => {
  //   handleDestroyBooking();
  // };

  const handleDestroyBooking = (booking) => {
    console.log("handleDestroyBooking");
    axios.delete(`/bookings/${booking.id}.json`).then((window.location.href = `/my-bookings`));
  };

  // const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const handleCreateReview = (params) => {
    console.log(params);
    axios.post("/reviews.json", params).then((response) => {
      console.log(response.data);
      setReviews([...reviews, response.data]);
    });
  };

  const handleUpdateReview = (params) => {
    console.log(params);
    axios.patch(`/reviews/${currentReview.id}.json`, params).then((response) => {
      console.log(response.data);
      setReviews([...currentReview, response.data]);
    });
  };

  return (
    <div>
      <h2>
        {booking.event_name} with {booking.performer_name}
      </h2>
      <div>
        <MapComponent booking={booking} latitude={booking.latitude} longitude={booking.longitude} />
      </div>
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
        <BookingsUpdate onCancel={handleHideUpdateBooking} booking={booking} />
      </Modal>
      <div>
        <button onClick={() => handleDestroyBooking(booking)}>Cancel Booking</button>
      </div>
      {reviews?.map((review) => (
        <div key={review.id}>
          {isReviewUpdateVisible === false ? (
            <div>
              <p>
                {review.rating} ~ {review.comment}
              </p>
              <button onClick={handleShowUpdateReview}>Edit Review</button>
            </div>
          ) : (
            <ReviewsUpdate
              review={currentReview}
              booking={booking}
              onUpdateReview={handleUpdateReview}
              onClose={handleHideUpdateReview}
            />
          )}
        </div>
      ))}
      <h2>Leave a Review</h2>
      <ReviewsNew booking={booking} onCreateReview={handleCreateReview} />
    </div>
  );
}
