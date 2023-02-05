import axios from "axios";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

export function FileForm(props) {
  const [errors, setErrors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const imageFile = event.target.image.files[0];
    const options = {
      maxSizeMB: 0.14,
      maxWidthOrHeight: 1920,
    };
    const data = new FormData();
    try {
      const compressedFile = await imageCompression(imageFile, options);
      data.append("post[image]", compressedFile);
    } catch (error) {
      console.log(error);
    }
    data.append("post[performer_id]", props.performer.id);
    data.append("post[title]", event.target.title.value);
    submitToAPI(data);
    event.target.reset();
    window.location.href = "/me";
  }
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

  const handleIndexPosts = () => {
    setPosts(props.performer.posts);
  };

  const handleClick = (post) => {
    setCurrentPost(post);
    handleDestroyPost(post);
    props.onClose();
  };

  const handleDestroyPost = (post) => {
    axios.delete(`/posts/${post.id}.json`).then(() => {
      window.location.href = "/me";
    });
    setPosts(posts.filter((p) => p.id !== currentPost.id));
  };

  useEffect(handleIndexPosts), [];

  return (
    <div>
      <p className="m-3 fs-4 fw-semibold card-title">Add Image</p>
      <p className="fs-6 fw-lighter">
        File must be in <strong>jpeg</strong> / <strong>png</strong> format and cannot exceed <strong>1MB</strong>
      </p>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form className="mb-3" onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3">
          <input className="form-control" type="file" accept="image/png, image/jpeg" name="image" id="formFileLg" />
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
      <h3>{props.performer.name}'s Images</h3>
      <div className="row">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="card shadow container d-flex flex-column align-items-center m-1"
            style={{ width: "10rem" }}
          >
            <div>
              <img src={post.image_url} alt={`image of ${props.performer.name}`} className="gallery-photo p-0 m-0" />
            </div>
            <div>
              <button className="mt-2 btn btn-outline-success m-0 " onClick={() => handleClick(post)}>
                Delete Image
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
