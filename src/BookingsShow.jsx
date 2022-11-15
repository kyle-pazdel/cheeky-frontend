import { BookingsUpdate } from "./BookingsUpdate";
import { Link, useParams } from "react-router-dom";
import { ReviewsNew } from "./ReviewsNew";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MapComponent } from "./MapComponent";
import { ReviewsUpdate } from "./ReviewsUpdate";
import { formatPhoneNumber } from "react-phone-number-input";
import payment from "./assets/payment.png";

export function BookingsShow() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [booking, setBooking] = useState({});
  const [isBookingUpdateVisible, setIsBookingUpdateVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewUpdateVisible, setIsReviewUpdateVisible] = useState(0);
  const [isCancellationVisible, setIsCancellationVisible] = useState(false);

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

  const handleShowCancellation = () => {
    setIsCancellationVisible(true);
  };

  const handleHideCancellation = () => {
    setIsCancellationVisible(false);
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

  const handleUpdateBooking = (params) => {
    setErrors([]);
    axios
      .patch(`/bookings/${booking.id}.json`, params)
      .then((response) => {
        console.log(response.data);
        setBooking(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
    handleHideUpdateBooking();
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

  const formatTime = (time) => {
    if (time) {
      return format(new Date(time), "MMMM dd yyyy, p");
    } else {
      return null;
    }
  };

  const formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <div>
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
      <div className="row card">
        <MapComponent
          className="p-0 m-0 card-image-top"
          booking={booking}
          latitude={booking.latitude}
          longitude={booking.longitude}
        />
        <div className="col">
          <p className="m-3 fs-5 fw-semibold">Event Details</p>
          <div className="card row">
            <div class="card-header">{booking.event_name}</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{booking.address}</li>
              <li className="list-group-item">
                {booking.city}, {booking.state} {booking.postal_code}
              </li>
              <li className="list-group-item">{booking.postal_code}</li>
              <li className="list-group-item">
                {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
              </li>

              <div className="card mt-0 p-0 row-12">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item fs-6 fst-italic">Rate ${booking.performer_rate} hourly</li>
                </ul>
                <div className="card-header fs-6 fw-semibold">Total {formatMoney(booking.total)}</div>
              </div>
              <li className="list-group-item">
                <small>{booking.performer_email}</small> <br />
                <small>{formatPhoneNumber(booking.performer_phone_number)}</small>
              </li>
              <li className="list-group-item">
                <small>
                  <Link className="link-dark text-wrap fst-italic" to={`/performers/${booking.performer_id}`}>
                    See {booking.performer_name}'s Page
                  </Link>
                </small>
              </li>
            </ul>
          </div>
        </div>
        <div className="col card text-bg-dark mb-3 p-0 h-50">
          <div className="card-body">
            {booking.paid === true ? (
              <div className="row d-flex justify-content-center">
                <p className="col-2">Payment Received</p>
                {/* <img className="col-2 icon-image" src={payment} /> */}
              </div>
            ) : (
              <Link className="d-grid gap-2 btn btn-outline-warning" to={`/process-payment/${booking.id}`}>
                Submit Payment
              </Link>
            )}
            <div className="pt-3 pb-3 d-grid gap-2">
              <button className="btn btn-outline-info" onClick={handleShowUpdateBooking}>
                Update Booking Details
              </button>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-secondary" onClick={handleShowCancellation}>
                Cancel Booking
              </button>
            </div>
            <Modal show={isBookingUpdateVisible} onClose={handleHideUpdateBooking}>
              <BookingsUpdate
                onCancel={handleHideUpdateBooking}
                onUpdateBooking={handleUpdateBooking}
                booking={booking}
              />
            </Modal>
          </div>
        </div>
        <Modal show={isCancellationVisible} onClose={handleHideCancellation}>
          <div className="card m-4">
            <p className="cardTitle">Are you sure you want to cancel?</p>
            <button className="btn btn-outline-secondary" onClick={() => handleDestroyBooking(booking)}>
              Yes, proceed.
            </button>
          </div>
        </Modal>
      </div>
      {reviews?.map((review) => (
        <div key={review.id} className="card">
          {isReviewUpdateVisible !== review.id ? (
            <div className="card">
              <p>
                {review.rating} ~ {review.comment}
              </p>
              <div className="row d-flex justify-content-center">
                <div className="col-1 d-grid gap-2">
                  <button className=" m-1 btn btn-dark" onClick={() => handleShowUpdateReview(review)}>
                    Edit
                  </button>
                </div>
                <div className="col-1 d-grid gap-2">
                  <button className=" m-1 btn btn-outline-secondary" onClick={() => handleDestroyReview(review)}>
                    Delete
                  </button>
                </div>
              </div>
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
