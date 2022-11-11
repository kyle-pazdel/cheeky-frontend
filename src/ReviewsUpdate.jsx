export function ReviewsUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
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
        <input type="hidden" name="booking_id" value={props.booking.id}></input>
        <label>
          Leave a Review
          <input name="comment" type="text" defaultValue={props.review.comment} />
        </label>
        <select name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option selected value="5">
            5
          </option>
        </select>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
