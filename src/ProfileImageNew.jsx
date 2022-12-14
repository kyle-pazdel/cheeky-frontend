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

  return (
    <div className="card container d-flex flex-column align-items-center p-5">
      <div clasName="mb-3" style={{ width: "30rem" }}>
        <p className="m-3 fs-5 fw-semibold card-title">Add Profile Image</p>
        <ul></ul>
        <ul>
          {errors?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3">
            <input className="form-control" type="file" name="image" id="formFileLg" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Caption
            </span>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Write a caption to be displayed with this image..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button className="mt-3 mb-3 btn btn-dark" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
