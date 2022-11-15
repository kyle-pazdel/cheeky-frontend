import { useState } from "react";

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
    props.onClose();
    event.target.reset();
  };

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="col-12 mb-3 mt-3 form-label fs-5">
          <textarea
            type="text"
            className="form-control mt-3"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <div className="row d-flex justify-content-center">
          <select
            className="col-6 mb-3 form-select form-select-sm"
            aria-label=".form-select-sm"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>

          <div className="col-1 d-grid gap-2">
            <button className=" m-1 btn btn-dark" type="submit">
              Edit
            </button>
          </div>
          <div className="col-1 d-grid gap-2">
            <button className=" m-1 btn btn-outline-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
