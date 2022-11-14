import axios from "axios";
import { useState } from "react";
import TableDatePicker from "./TableDatePicker";

export function BookingsUpdate(props) {
  const booking = props.booking;
  const [errors, setErrors] = useState([]);
  const [start, setStart] = useState(new Date(booking.start_time));
  const [end, setEnd] = useState(new Date(booking.end_time));
  const [eventName, setEventName] = useState(booking.event_name);
  const [address, setAddress] = useState(booking.address);
  const [city, setCity] = useState(booking.city);
  const [eventState, setEventState] = useState(booking.state);
  const [postalCode, setPostalCode] = useState(booking.postal_code);
  const [eventType, setEventType] = useState(booking.event_type);

  const duration = Math.round(((end - start) / 3600000) * 100) / 100;
  const total = duration * booking.performer_rate;
  const formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = {
      total: total,
      event_name: eventName,
      address: address,
      city: city,
      state: eventState,
      postal_code: postalCode,
      event_type: eventType,
      start_time: start,
      end_time: end,
    };
    axios
      .patch(`/bookings/${booking.id}.json`, params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = `/my-bookings`; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };
  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleEventStateChange = (event) => {
    setEventState(event.target.value);
  };
  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };
  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };
  return (
    <div>
      <img
        src={props.booking.performer_image?.image_url}
        alt={`photo of ${props.booking.performer_name}`}
        className="thumbnail-profile-image rounded-circle mt-3"
      />
      <p className="m-3 fs-5 text-dark fw-semibold">Update Event with {props.booking.performer_name}</p>
      <div className="card row">
        <div class="card-header text-dark ">{eventName}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{address}</li>
          <li className="list-group-item">
            {city}, {eventState}
          </li>
          <li className="list-group-item">{postalCode}</li>
          <li className="list-group-item">{eventType}</li>
        </ul>
      </div>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="row m-3 mb-0">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Event Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={eventName}
              onChange={handleEventNameChange}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Address
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={address}
              onChange={handleAddressChange}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              City
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={city}
              onChange={handleCityChange}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              State
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={eventState}
              onChange={handleEventStateChange}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Postal Code
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={postalCode}
              onChange={handlePostalCodeChange}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Event Type
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={eventType}
              onChange={handleEventTypeChange}
            ></input>
          </div>
          <div>
            <TableDatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
          </div>
        </div>
        <div className="card mt-0 p-0 row-12">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{duration > 0 ? duration : 0} hours</li>
          </ul>
          <div className="card-header">Total {total > 0 ? formatMoney(total) : 0}</div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-dark mt-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
