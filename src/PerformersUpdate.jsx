import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { SocialIcon } from "react-social-icons";

export function PerformersUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = {
      name: name,
      phone_number: phoneNumber,
      email: email,
      shortest_gig: shortestGig,
      longest_gig: longestGig,
      city: city,
      state: state,
      rate: rate,
      bio: bio,
      instagram_handle: instagramHandle,
      twitter_handle: twitterHandle,
      performance_type: performanceType,
    };
    props.onUpdatePerformer(props.performer.id, params);
    props.onClose();
  };

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [shortestGig, setShortestGig] = useState("");
  const [longestGig, setLongestGig] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [performanceType, setPerformanceType] = useState("");

  const setDefaultValues = () => {
    setName(props.performer.name);
    setPhoneNumber(props.performer.phone_number);
    setEmail(props.performer.email);
    setShortestGig(props.performer.shortest_gig);
    setLongestGig(props.performer.longest_gig);
    setCity(props.performer.city);
    setState(props.performer.state);
    setRate(props.performer.rate);
    setBio(props.performer.bio);
    setInstagramHandle(props.performer.instagram_handle);
    setTwitterHandle(props.performer.twitter_handle);
    setPerformanceType(props.performer.performance_type);
  };

  useEffect(setDefaultValues, []);
  return (
    <div>
      <p className="m-3 fs-5 fw-semibold card-title">Update {props.performer?.name}'s Account</p>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} action="/photos" method="post" encType="multipart/form-data">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Drag Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Shortest Gig Length (min)
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={shortestGig}
            onChange={(event) => setShortestGig(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Longest Gig Length (min)
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={longestGig}
            onChange={(event) => setLongestGig(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Rate (hourly)
          </span>
          <span className="input-group-text" id="inputGroup-sizing-sm">
            $
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Performance Type
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={performanceType}
            onChange={(event) => setPerformanceType(event.target.value)}
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
            onChange={(event) => setCity(event.target.value)}
          ></input>
          <span className="input-group-text" id="inputGroup-sizing-sm">
            State
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={state}
            onChange={(event) => setState(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <SocialIcon className="m-2" bgColor="black" network="instagram" /> Handle
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={instagramHandle}
            onChange={(event) => setInstagramHandle(event.target.value)}
          ></input>
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <SocialIcon className="m-2" bgColor="black" network="twitter" /> Handle
          </span>
          <span className="input-group-text" id="inputGroup-sizing-sm">
            @
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={twitterHandle}
            onChange={(event) => setTwitterHandle(event.target.value)}
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Industry Email
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div>
          <div className="input-group input-group-sm mb-3">
            <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
          </div>
        </div>
        <label className="col-12 mb-3 form-label fs-5 fw-semibold">
          Bio
          <textarea
            type="text"
            className="form-control mt-3 bio-textarea"
            rows="10"
            maxLength="750"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <p>Characters remaining {750 - bio.length}</p>
        <button className="mt-3 mb-3 btn btn-dark" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
