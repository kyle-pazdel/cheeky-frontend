import axios from "axios";

export function FileForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("post[performer_id]", props.performer.id);
    data.append("post[title]", event.target.title.value);
    data.append("post[image]", event.target.image.files[0]);
    submitToAPI(data);
  };
  const submitToAPI = (data) => {
    axios
      .post(`/posts.json`, data)
      .then((response) => {
        console.log(response.data.image_url);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
    </div>
  );
}
