import { useState } from "react";
import ReactStars from "react-rating-stars-component";

export function ReviewsNew(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      comment: comment,
      rating: rating,
      booking_id: props.booking.id,
    };
    props.onCreateReview(params, () => event.target.reset());
    event.target.reset();
  };

  const handleRating = (rating) => {
    setRating(rating);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label className="col-lg-12 mb-3 mt-3 form-label fs-5">
            Leave a Review
            <textarea
              type="text"
              className="form-control mt-3"
              rows="3"
              maxLength="300"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          <div className="col-lg-3 ">
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRating}
              size={30}
              isHalf={true}
              activeColor="#e98dd7"
              color="#ecb5bd"
            />
          </div>
          <button type="submit" className="col-lg-8 btn btn-dark mb-5 mt-3">
            Submit
          </button>
          {comment.length > 0 ? <p>Characters remaining {300 - comment.length}</p> : null}
        </div>
        <div></div>
      </form>
    </div>
  );
}
