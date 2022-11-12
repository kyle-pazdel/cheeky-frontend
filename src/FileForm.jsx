import axios from "axios";
import { useEffect, useState } from "react";

export function FileForm(props) {
  const [errors, setErrors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("post[performer_id]", props.performer.id);
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
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <h1>Title</h1>
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
      <h3>{props.performer.name}'s Images</h3>
      {posts?.map((post) => (
        <div key={post.id}>
          <div>
            <img src={post.image_url} alt={`image of ${props.performer.name}`} className="profile-image" />
          </div>
          <div>
            <button onClick={() => handleClick(post)}>Delete Image</button>
          </div>
        </div>
      ))}
    </div>
  );
}
