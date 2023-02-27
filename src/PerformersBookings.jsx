import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MapComponent } from "./MapComponent";
import { formatPhoneNumber } from "react-phone-number-input";
import paymentreceived from "./assets/paymentreceived.svg";
import useWindowDimensions from "./useWindowDimensions";

export function PerformersBookings() {
  const params = useParams();
  const [performer, setPerformer] = useState({});
  const [posts, setPosts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { height, width } = useWindowDimensions();
  const [smallScreen, setSmallScreen] = useState(false);

  const handleBookingDetailsLayout = () => {
    if (width < 992) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  useEffect(handleBookingDetailsLayout, []);

  const handleShowPerformer = () => {
    axios.get(`/performers/${params.id}.json`).then((response) => {
      setPerformer(response.data);
      setPosts(response.data.posts);
      setBookings(response.data.performer_bookings);
    });
  };

  const formatDate = (date) => {
    if (date) {
      const formattedDate = format(new Date(date), "MMMM dd, yyyy");
      return formattedDate;
    } else {
      return null;
    }
  };

  const formatTime = (time) => {
    if (time) {
      const formattedTime = format(new Date(time), "p");
      return formattedTime;
    } else {
      return null;
    }
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
          <div className="row justify-content-around  text-center">
            {smallScreen ? (
              <>
                <h5 className="card-header pb-4 mb-4">{booking.event_name}</h5>
                <div className="col-lg-6">
                  <MapComponent
                    className="p-0 m-0"
                    booking={booking}
                    latitude={booking.latitude}
                    longitude={booking.longitude}
                  />
                  <div className="card-body">
                    <div className="card-text mt-4">
                      <p>{booking.address}</p>
                      <p>
                        {booking.city}, {booking.state}
                      </p>
                      <p>{booking.postal_code}</p>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="row">
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
                      <li className="list-group-item mt-3">Contact Info</li>
                      <li className="list-group-item">
                        <small>
                          {booking.user.first_name} {booking.user.last_name}
                        </small>{" "}
                        <br />
                        <small>{booking.user.email}</small> <br />
                        <small>{formatPhoneNumber(booking.user.phone_number)}</small>
                      </li>
                      {booking.paid === true ? (
                        <div className="row d-flex justify-content-center btn btn-dark disabled">
                          <img className="icon-image" src={paymentreceived} />
                        </div>
                      ) : (
                        <div className="row d-flex justify-content-center btn btn-warning disabled">
                          Payment Pending...
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h5 className="card-header pb-4 mb-4">{booking.event_name}</h5>
                <div className="col-lg-6">
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
                      <li className="list-group-item mt-3">Contact Info</li>
                      <li className="list-group-item">
                        <small>
                          {booking.user.first_name} {booking.user.last_name}
                        </small>{" "}
                        <br />
                        <small>{booking.user.email}</small> <br />
                        <small>{formatPhoneNumber(booking.user.phone_number)}</small>
                      </li>
                      {booking.paid === true ? (
                        <div className="row d-flex justify-content-center btn btn-dark disabled">
                          <img className="icon-image" src={paymentreceived} />
                        </div>
                      ) : (
                        <div className="row d-flex justify-content-center btn btn-warning disabled">
                          Payment Pending...
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
