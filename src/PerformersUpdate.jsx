import { useState } from "react";

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
  const [name, setName] = useState(props.performer.name);
  const [phoneNumber, setPhoneNumber] = useState(props.performer.phone_number);
  const [email, setEmail] = useState(props.performer.email);
  const [shortestGig, setShortestGig] = useState(props.performer.shortest_gig);
  const [longestGig, setLongestGig] = useState(props.performer.longest_gig);
  const [city, setCity] = useState(props.performer.city);
  const [state, setState] = useState(props.performer.state);
  const [rate, setRate] = useState(props.performer.rate);
  const [bio, setBio] = useState(props.performer.bio);
  const [instagramHandle, setInstagramHandle] = useState(props.performer.instagram_handle);
  const [twitterHandle, setTwitterHandle] = useState(props.performer.twitter_handle);
  const [performanceType, setPerformanceType] = useState(props.performer.performance_type);

  return (
    <div>
      <h1>Update {props.performer.name}'s Account</h1>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} action="/photos" method="post" enctype="multipart/form-data">
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
          Submit
        </button>
      </form>
    </div>
  );
}
