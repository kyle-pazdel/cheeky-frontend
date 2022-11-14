import { BookingsUpdate } from "./BookingsUpdate";
import { Link, useParams } from "react-router-dom";
import { ReviewsNew } from "./ReviewsNew";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MapComponent } from "./MapComponent";
import { ReviewsUpdate } from "./ReviewsUpdate";

export function BookingsShow() {
  const params = useParams();
  const [booking, setBooking] = useState({});
  const [isBookingUpdateVisible, setIsBookingUpdateVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewUpdateVisible, setIsReviewUpdateVisible] = useState(0);
  const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  // const startTime = booking.start_time;
  // const endTime = booking.end_time;

  const handleShowBooking = () => {
    axios.get(`/bookings/${params.id}.json`).then((response) => {
      console.log(response.data);
      setBooking(response.data);
      setReviews(response.data.reviews);
      // setStartTime(response.data.start_time);
      // setEndTime(response.data.end_time);
      formatStartTime(response.data.start_time);
    });
  };

  const handleShowUpdateBooking = () => {
    setIsBookingUpdateVisible(true);
  };

  const handleHideUpdateBooking = () => {
    setIsBookingUpdateVisible(false);
  };

  const handleShowUpdateReview = (review) => {
    setIsReviewUpdateVisible(review.id);
  };

  const handleHideUpdateReview = () => {
    setIsReviewUpdateVisible(0);
  };

  useEffect(handleShowBooking, []);

  const handleDestroyBooking = (booking) => {
    console.log("handleDestroyBooking");
    axios.delete(`/bookings/${booking.id}.json`).then((window.location.href = `/my-bookings`));
  };

  const handleCreateReview = (params) => {
    console.log(params);
    axios.post("/reviews.json", params).then((response) => {
      console.log(response.data);
      setReviews([...reviews, response.data]);
    });
  };

  const handleUpdateReview = (id, params) => {
    console.log(params);
    axios.patch(`/reviews/${id}.json`, params).then((response) => {
      console.log(response.data);
      setReviews(
        reviews.map((review) => {
          if (review.id === response.data.id) {
            return response.data;
          } else {
            return review;
          }
        })
      );
    });
  };

  const handleDestroyReview = (review) => {
    axios.delete(`/reviews/${review.id}.json`).then((response) => {
      setReviews(reviews.filter((r) => r.id !== review.id));
    });
  };

  const formatStartTime = (time) => {
    const formattedTime = format(new Date(time), "MMMM dd yyyy, p");
    console.log(formattedTime);
    return formattedTime;
  };

  return (
    <div>
      {/* <button onClick={console.log(formattedStartTime)}>TIME</button> */}
      <h2>
        {booking.event_name} with {booking.performer_name}
      </h2>
      <div>
        <img
          src={booking.performer_image?.image_url}
          alt={`image of ${booking.performer_name}`}
          className="thumbnail-profile-image rounded-circle mb-3 mt-3"
        />
      </div>
      <div>
        <MapComponent booking={booking} latitude={booking.latitude} longitude={booking.longitude} />
      </div>
      <p>Event Type: {booking.event_type}</p>
      <p>Hourly Rate: {booking.performer_rate}</p>
      <p>Total: {booking.total}</p>
      <p>
        {booking.start_time} – {booking.end_time}
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
      {booking.paid === true ? (
        <div>
          <p>PAID</p>
        </div>
      ) : (
        <Link to={`/process-payment/${booking.id}`}>Submit Payment</Link>
      )}
      <div>
        <button onClick={() => handleDestroyBooking(booking)}>Cancel Booking</button>
      </div>
      {reviews?.map((review) => (
        <div key={review.id}>
          {isReviewUpdateVisible !== review.id ? (
            <div>
              <p>
                {review.rating} ~ {review.comment}
              </p>
              <button onClick={() => handleShowUpdateReview(review)}>Edit Review</button>
              <button onClick={() => handleDestroyReview(review)}>Delete Review</button>
            </div>
          ) : (
            <ReviewsUpdate
              review={review}
              booking={booking}
              onUpdateReview={handleUpdateReview}
              onClose={handleHideUpdateReview}
            />
          )}
        </div>
      ))}
      <ReviewsNew booking={booking} onCreateReview={handleCreateReview} />
    </div>
  );
}
