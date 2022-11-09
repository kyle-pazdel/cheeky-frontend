import DayJs from "react-dayjs";
import { BookingsUpdate } from "./BookingsUpdate";

export function BookingsShow(props) {
  const startTime = props.booking.start_time;
  const endTime = props.booking.end_time;

  const handleClick = () => {
    props.onDestroyBooking(props.booking);
    props.onCancelBooking();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateReview(params, () => event.target.reset());
  };
  return (
    <div>
      <h2>
        {props.booking.event_name} with {props.booking.performer_name}
      </h2>
      <p>Event Type: {props.booking.event_type}</p>
      <p>Hourly Rate: {props.booking.performer_rate}</p>
      <p>Total: {props.booking.total}</p>
      <p>
        Start Time: <DayJs format="MMMM D, YYYY">{startTime}</DayJs> at <DayJs format="h:mm A">{startTime}</DayJs> – End
        Time: <DayJs format="MMMM D, YYYY">{endTime}</DayJs> at <DayJs format="h:mm A">{endTime}</DayJs>
      </p>
      <p>
        Location: {props.booking.address} {props.booking.city} {props.booking.state} {props.booking.postal_code}
      </p>
      <small>
        Contact: {props.booking.performer_name} {props.booking.performer_email} {props.booking.performer_phone_number}
      </small>
      <BookingsUpdate booking={props.booking} />
      <div>
        <button onClick={handleClick}>Cancel Booking</button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="booking_id" value={props.booking.id}></input>
        <label>
          Leave a Review
          <input name="comment" type="text" />
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
      </form>
    </div>
  );
}
