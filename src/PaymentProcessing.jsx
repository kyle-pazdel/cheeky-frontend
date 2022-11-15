import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function PaymentProcessing() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [booking, setBooking] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleShowBooking = () => {
    axios.get(`/bookings/${params.id}.json`).then((response) => {
      console.log(response.data);
      setBooking(response.data);
    });
  };

  useEffect(handleShowBooking, []);

  const handleSubmit = (event) => {
    if (isPaid === true) {
      event.preventDefault();
      setErrors([]);
      const params = {
        paid: isPaid,
      };
      axios
        .patch(`/bookings/${booking.id}.json`, params)
        .then((response) => {
          console.log(response.data);
          event.target.reset();
          window.location.href = `/bookings/${booking.id}`;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          setErrors(error.response.data.errors);
        });
    } else {
      null;
    }
  };

  const handleIsPaidChange = () => {
    setIsPaid(!isPaid);
  };

  const handleCancel = () => {
    window.location.href = `/bookings/${booking.id}`;
  };
  return (
    <div>
      <div className="card container d-flex flex-column align-items-center p-5" style={{ maxWidth: "40rem" }}>
        <p className="m-3 fs-5 fw-semibold card-title">
          {booking.event_name} with {booking.performer_name}
        </p>
        <div>
          <p className="card-title">Total ${booking.total}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Name (as it appears on your card)
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Card Number
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            ></input>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Expiration Date
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
            ></input>
            <span className="input-group-text" id="inputGroup-sizing-sm">
              CVV
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={cvv}
              onChange={(event) => setCvv(event.target.value)}
            ></input>
          </div>
          <div>
            {isPaid === false ? (
              <div>
                <small>Please agree to our terms and conditions</small>
              </div>
            ) : null}

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={`${isPaid}`}
                onChange={handleIsPaidChange}
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                I agree to terms and conditions.
              </label>
            </div>
          </div>

          <div>
            <button className="mt-3 mb-3 btn btn-dark" type="submit">
              Submit
            </button>
          </div>
          <div>
            <button className="mt-3 mb-3 btn btn-outline-dark" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <div>
            <a className="link-dark text-wrap fst-italic" href="#">
              Terms and Conditions
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
