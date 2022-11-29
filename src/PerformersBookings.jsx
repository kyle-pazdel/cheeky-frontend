import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(response.data.posts);
    });
  };

  useEffect(handleShowPerformer, []);

  return (
    <div>
      <h1>A List of Bookings</h1>
      {bookings?.map((booking) => (
        <div>
          <p>{booking.event_name}</p>
          <p>{booking.address}</p>
          <p>{booking.city}</p>
          <p>{booking.state}</p>
          <p>{booking.postal_code}</p>
          <p>{booking.start_time}</p>
          <p>{booking.end_time}</p>
          <p>{booking.total}</p>
          <p>{booking.user.first_name}</p>
          <p>{booking.user.last_name}</p>
          <p>{booking.user.email}</p>
          <p>{booking.user.phone_number}</p>
        </div>
      ))}
    </div>
  );
}
