import { useState } from "react";
import ReactStars from "react-rating-stars-component";

export function ReviewsNew(props) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      comment: comment,
      rating: rating,
      booking_id: props.booking.id,
    };
    console.log(params);
    props.onCreateReview(params, () => event.target.reset());
    event.target.reset();
  };

  const handleRating = (rating) => {
    setRating(rating);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row m-3">
          <label className="col-12 mb-3 mt-3 form-label fs-5">
            Leave a Review
            <textarea
              type="text"
              className="form-control mt-3"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          {/* <div className="col-3">
            <p>Rating</p>
            {rating === "" && comment.length > 6 ? <p>* Please select a rating</p> : null}
          </div> */}
          <div className="col-3">
            {/* <select
              className=" mb-3 form-select form-select-sm"
              aria-label=".form-select-sm"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select> */}
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
          <button type="submit" className="col-8 btn btn-dark mb-5">
            Submit
          </button>
        </div>
        <div></div>
      </form>
    </div>
  );
}
