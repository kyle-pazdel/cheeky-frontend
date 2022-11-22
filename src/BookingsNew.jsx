import React, { useState } from "react";
import TableDatePicker from "./TableDatePicker";

export function BookingsNew(props) {
  const performer = props.performer;

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [eventState, setEventState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [eventType, setEventType] = useState("");

  const duration = Math.round(((end - start) / 3600000) * 100) / 100;
  const total = duration * performer.rate;
  const formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      performer_id: performer.id,
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
    props.onCreateBooking(params, () => event.target.reset(event.target.value));
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
    <div className="top-buff">
      <img
        src={performer.profile_image?.image_url}
        alt={`photo of ${performer.name}`}
        className="thumbnail-profile-image rounded-circle mt-3"
      />
      <p className="m-3 fs-5 fw-semibold">Book with {performer.name}</p>
      <div>
        <ul>
          {props.errors?.map((error) => (
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
    </div>
  );
}
