import React, { useEffect, useState } from "react";
import TableDatePicker from "./TableDatePicker";

export function BookingsNew(props) {
  const performer = props.performer;
  const [errors, setErrors] = useState([]);
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
    setErrors([]);
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
    props.onCreateBooking(params, () => event.target.reset());
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
          {errors?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div>
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
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="total" value={total}></input>
          <div>
            <label>
              Event Name:
              <input type="text" value={eventName} onChange={handleEventNameChange}></input>
            </label>
          </div>
          <div>
            <label>
              Address:
              <input type="text" value={address} onChange={handleAddressChange}></input>
            </label>
          </div>
          <div>
            <label>
              City:
              <input type="text" value={city} onChange={handleCityChange}></input>
            </label>
          </div>
          <div>
            <label>
              State:
              <input type="text" value={eventState} onChange={handleEventStateChange}></input>
            </label>
          </div>
          <div>
            <label>
              Postal Code:
              <input type="text" value={postalCode} onChange={handlePostalCodeChange}></input>
            </label>
          </div>
          <div>
            <label>
              Event Type:
              <input type="text" value={eventType} onChange={handleEventTypeChange}></input>
            </label>
          </div>
          <div>
            <TableDatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
          </div>
          <h3>Duration: {duration > 0 ? duration : 0}</h3>
          <h3>Total: ${total > 0 ? total : 0}</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
