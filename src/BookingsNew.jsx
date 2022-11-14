import React, { useState } from "react";
import TableDatePicker from "./TableDatePicker";
import Form from "react-bootstrap/Form";

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

  const duration = (end - start) / 3600000;
  const total = duration * performer.rate;

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
    <div>
      <h1>Book with {performer.name}</h1>
      <div>
        <ul>
          {props.errors?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        {/* <div>
          <p>{eventName}</p>
        </div>
        <div>
          <p>{address}</p>
        </div>
        <div>
          <p>{city}</p>
        </div>
        <div>
          <p>{eventState}</p>
        </div>
        <div>
          <p>{postalCode}</p>
        </div>
        <div>
          <p>{eventType}</p>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="row m-3">
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
          <h3>Duration: {duration > 0 ? duration : 0}</h3>
          <h3>Total: ${total > 0 ? total : 0}</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
