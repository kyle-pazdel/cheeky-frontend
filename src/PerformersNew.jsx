import axios from "axios";
import { useState } from "react";

export function PerformersNew() {
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
      user_id: localStorage.user_id,
    };
    axios
      .post("/performers.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/my-performers";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
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

  return (
    <div>
      <h1>Add Performer Details</h1>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} action="/photos" method="post" enctype="multipart/form-data">
        <input type="hidden" name="user_id" value={localStorage.user_id}></input>
        <div>
          <label>
            Drag Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Idustry Phone Number:
            <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Industry Email:
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Shortest Gig Length:
            <input type="text" value={shortestGig} onChange={(event) => setShortestGig(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Longest Gig Length:
            <input type="text" value={longestGig} onChange={(event) => setLongestGig(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            City:
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)}></input>
          </label>
          <label>
            State:
            <input type="text" value={state} onChange={(event) => setState(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Rate (hourly):
            <input type="text" value={rate} onChange={(event) => setRate(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Bio:
            <input type="text" value={bio} onChange={(event) => setBio(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Instagram Handle:
            <input
              type="text"
              value={instagramHandle}
              onChange={(event) => setInstagramHandle(event.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Twitter Handle: @
            <input type="text" value={twitterHandle} onChange={(event) => setTwitterHandle(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            Performance Type:
            <input
              type="text"
              value={performanceType}
              onChange={(event) => setPerformanceType(event.target.value)}
            ></input>
          </label>
        </div>
        <button type="submit" value="Create">
          Add Account Details
        </button>
      </form>
    </div>
  );
}
