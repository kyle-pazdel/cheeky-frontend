import axios from "axios";
import { useEffect, useState } from "react";
import { DatePickerComponent } from "./DatePickerComponent";
import TableDatePicker from "./TableDatePicker";

export function BookingsNew(props) {
  const performer = props.performer;
  const [errors, setErrors] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const duration = (end - start) / 3600000;
  const total = duration * performer.rate;

  const handleTotal = () => {
    console.log(performer.rate);
    setTotal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    props.onCreateBooking(params, () => event.target.reset());
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
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="performer_id" value={performer.id}></input>
          <input type="hidden" name="total" value={total}></input>
          <div>
            Event Name: <input name="event_name" type="text" />
          </div>
          <div>
            address: <input name="address" type="text" />
          </div>
          <div>
            City: <input name="city" type="text" /> State: <input name="state" type="text" />
          </div>
          <div>
            Postal Code: <input name="postal_code" type="text" />
          </div>
          <div></div>
          <div>
            Event Type: <input name="event_type" type="text" />
          </div>
          <div>
            <></>
          </div>
          {/* <DatePickerComponent /> */}
          <div>
            <TableDatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
          </div>
          {/* <div>
            <label>
              Start Time: <p>{start}</p>
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
              End Time: <p>{end}</p>
              <input
                value={end}
                name="end_time"
                type="datetime-local"
                onChange={(event) => setEnd(event.target.value)}
              />
            </label>
          </div> */}
          <h3>Duration: {duration}</h3>
          <h3>Total: ${total}</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
