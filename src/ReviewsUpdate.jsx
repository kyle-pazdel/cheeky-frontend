import { useState } from "react";
import ReactStars from "react-rating-stars-component";

export function ReviewsUpdate(props) {
  const [comment, setComment] = useState(props.review.comment);
  const [rating, setRating] = useState(props.review.rating);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      comment: comment,
      rating: rating,
      booking_id: props.booking.id,
    };
    props.onUpdateReview(props.review.id, params);
    event.target.reset();
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleRating = (rating) => {
    setRating(rating);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="col-12 mb-3 mt-3 form-label fs-5">
          <textarea
            type="text"
            className="form-control mt-3"
            maxlength="300"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <div className="row d-flex justify-content-center">
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRating}
            size={28}
            isHalf={true}
            activeColor="#e98dd7"
            color="#ecb5bd"
          />
          <div className="col-lg-1 d-grid">
            <button className="btn btn-dark btn-sm" type="submit">
              Submit
            </button>
          </div>
          <div className="col-lg-1 d-grid gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
