import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MapComponent } from "./MapComponent";
import { formatPhoneNumber } from "react-phone-number-input";
import paymentreceived from "./assets/paymentreceived.svg";

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

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), "MMMM dd, yyyy");
    return formattedDate;
  };

  const formatTime = (time) => {
    const formattedTime = format(new Date(time), "p");
    return formattedTime;
  };

  const formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
  };

  useEffect(handleShowPerformer, []);

  return (
    <div className="top-buff">
      <p className="fs-2 fw-semibold">{performer.name}'s Bookings</p>
      {bookings?.map((booking) => (
        <div key={booking.id} className="mb-4 card shadow">
          <div className="row justify-content-md-around container text-center">
            <h5 className="card-header pb-4 mb-4">{booking.event_name}</h5>
            <div className="me-4 col-6">
              <MapComponent
                className="p-3 m-3"
                booking={booking}
                latitude={booking.latitude}
                longitude={booking.longitude}
              />
              <div className="card-body">
                <div className="card-text mt-4">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{booking.address}</li>
                    <li className="list-group-item">
                      {booking.city}, {booking.state}
                    </li>
                    <li className="list-group-item">{booking.postal_code}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h5 className="card-title">{formatDate(booking.start_time)}</h5>
              <p>
                {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
              </p>
              <p className="card-title"></p>
              <p>Event Type - {booking.event_type}</p>
              <div className="card row">
                <h5>{formatDate(booking.start_time)}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                  </li>
                  <div className="card mt-0 p-0 row-12">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item fs-6 fst-italic">Rate ${performer.rate} hourly</li>
                    </ul>
                    <div className="card-header fs-6 fw-semibold">Total {formatMoney(booking.total)}</div>
                  </div>
                  <li className="list-group-item">
                    <small>{booking.user.email}</small> <br />
                    <small>{formatPhoneNumber(booking.user.phone_number)}</small>
                  </li>
                  {booking.paid === true ? (
                    <div className="row d-flex justify-content-center">
                      <img className="col-2 icon-image" src={paymentreceived} />
                    </div>
                  ) : (
                    <Link className="d-grid gap-2 btn btn-outline-warning" to={`/process-payment/${booking.id}`}>
                      Submit Payment
                    </Link>
                  )}
                  {/* <li className="list-group-item">
                    <small>
                      <Link className="link-dark text-wrap fst-italic" to={`/performers/${booking.performer_id}`}>
                        See {booking.performer_name}'s Page
                      </Link>
                    </small>
                  </li> */}
                </ul>
              </div>
              <p>{booking.paid}</p>
              <p>{booking.total}</p>
              <p>{booking.user.first_name}</p>
              <p>{booking.user.last_name}</p>
              <p>{booking.user.email}</p>
              <p>{booking.user.phone_number}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
