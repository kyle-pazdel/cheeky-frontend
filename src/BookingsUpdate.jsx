import axios from "axios";
import { useState, useEffect } from "react";
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

  const duration = (end - start) / 3600000;
  const total = duration * booking.performer_rate;

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
      .patch(`http://localhost:3000/bookings/${booking.id}.json`, params)
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
      <h3>Update Event Details Here</h3>
      <p>{eventName}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{eventState}</p>
      <p>{postalCode}</p>
      <p>{eventType}</p>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="total" value={total}></input>
        <label>
          Event Name:
          <input type="text" value={eventName} onChange={handleEventNameChange}></input>
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange}></input>
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={handleCityChange}></input>
        </label>
        <label>
          State:
          <input type="text" value={eventState} onChange={handleEventStateChange}></input>
        </label>
        <label>
          Postal Code:
          <input type="text" value={postalCode} onChange={handlePostalCodeChange}></input>
        </label>
        <label>
          Event Type:
          <input type="text" value={eventType} onChange={handleEventTypeChange}></input>
        </label>
        <div>
          <TableDatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
        </div>
        <h3>Duration: {duration > 0 ? duration : 0}</h3>
        <h3>Total: ${total > 0 ? total : 0}</h3>
        {/* <div>
          Event Name: <input name="event_name" defaultValue={props.booking.event_name} type="text" />
        </div>
        <div>
          address: <input name="address" defaultValue={props.booking.address} type="text" />
        </div>
        <div>
          City: <input name="city" defaultValue={props.booking.city} type="text" /> State:{" "}
          <input name="state" defaultValue={props.booking.state} type="text" />
        </div>
        <div>
          Postal Code: <input name="postal_code" defaultValue={props.booking.postal_code} type="text" />
        </div>
        <div></div>
        <div>
          Event Type: <input name="event_type" defaultValue={props.booking.event_type} type="text" />
        </div> 
        <div>
          <label>
            Updated Start Time: <p>{start}</p>
            <input
              value={start}
              name="start_time"
              type="datetime-local"
              onChange={(event) => setStart(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Updated End Time: <p>{end}</p>
            <input value={end} name="end_time" type="datetime-local" onChange={(event) => setEnd(event.target.value)} />
          </label>
        </div> 
        {duration > 0 ? <h3>Updated Duration: {duration} hours</h3> : <h3>Updated Duration: 0</h3>}
        {total > 0 ? <h3>Updated Total: ${total}</h3> : <h3>Updated Total: $0</h3>} */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
