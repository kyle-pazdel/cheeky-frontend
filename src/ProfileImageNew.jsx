import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProfileImageNew(props) {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [performer, setPerformer] = useState({});

  const handleShowPerformer = () => {
    axios.get(`/performers/${params.id}.json`).then((response) => {
      setPerformer(response.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("post[performer_id]", performer.id);
    data.append("post[title]", event.target.title.value);
    data.append("post[image]", event.target.image.files[0]);
    submitToAPI(data);
    event.target.reset();
    window.location.href = "/me";
  };

  const submitToAPI = (data) => {
    axios
      .post(`/posts.json`, data)
      .then((response) => {
        console.log(response.data.image_url);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  useEffect(handleShowPerformer), [];

  const logParams = () => {
    console.log(params.id);
    console.log(performer);
  };

  return (
    <div>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <button onClick={logParams}>LOG</button>
      <h3>Add a Profile Image for {performer.name}</h3>
      <h3>Title</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="title">Image Post</label>
          <input type="text" name="title" id="text" />
        </div>
        <div>
          <label htmlFor="image">Image Post</label>
          <input type="file" name="image" id="image" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
