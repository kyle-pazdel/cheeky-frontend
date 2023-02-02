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
            <h5 className="card-header">
              {booking.event_name} with {booking.performer_name}
            </h5>
            <div className="card-body">
              <h5 className="card-title">{formatTime(booking.start_time)}</h5>
              <p className="card-text">at {booking.address}</p>
              <Link to={`/bookings/${booking.id}`} className="btn btn-dark">
                See Booking Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
