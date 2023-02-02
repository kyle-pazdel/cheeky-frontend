import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

export function PerformersBookings() {
  const params = useParams();
  const [performer, setPerformer] = useState({});
  const [posts, setPosts] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleShowPerformer = () => {
    axios.get(`/performers/${params.id}.json`).then((response) => {
      console.log(response.data);
      setPerformer(response.data);
      setPosts(response.data.posts);
      setBookings(response.data.performer_bookings);
      console.log(response.data.performer_bookings);
    });
  };

  const formatTime = (time) => {
    const formattedTime = format(new Date(time), "MMMM dd yyyy, p");
    return formattedTime;
  };

  useEffect(handleShowPerformer, []);

  return (
    <div className="top-buff">
      <p className="fs-2 fw-semibold">{performer.name}'s Bookings</p>
      {bookings?.map((booking) => (
        <div key={booking.id}>
          <div className="card shadow mb-4">
            <h5 className="card-header">{booking.event_name}</h5>
            <div className="card-body">
              <h5 className="card-title">{formatTime(booking.start_time)}</h5>
              <div className="card-text mt-4">
                <p> {booking.address}</p>
                <p>
                  {booking.city}, {booking.state} {booking.postal_code}
                </p>
              </div>
              <div>
                <p>{booking.event_type}</p>
                <p>{booking.start_time}</p>
                <p>{booking.end_time}</p>
                <p>{booking.paid}</p>
                <p>{booking.total}</p>
                <p>{booking.user.first_name}</p>
                <p>{booking.user.last_name}</p>
                <p>{booking.user.email}</p>
                <p>{booking.user.phone_number}</p>
              </div>
              {/* <Link to={`/my-bookings/${performer.id}/${booking.id}`} className="btn btn-dark">
                See Booking Details
              </Link> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
