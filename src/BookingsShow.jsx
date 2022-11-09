import DayJs from "react-dayjs";
import { BookingsUpdate } from "./BookingsUpdate";
import { useParams } from "react-router-dom";
import { ReviewsNew } from "./ReviewsNew";
import { Modal } from "./Modal";
import { useState } from "react";
import axios from "axios";

export function BookingsShow() {
  const startTime = props.booking.start_time;
  const endTime = props.booking.end_time;
  // const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const handleClick = () => {
    props.onDestroyBooking(props.booking);
    props.onCancelBooking();
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
      <ReviewsNew booking={props.booking} onCreateReview={handleCreateReview} />
    </div>
  );
}
