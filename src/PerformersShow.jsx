import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingsNew } from "./BookingsNew";
import { Modal } from "./Modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

export function PerformersShow() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [performer, setPerformer] = useState({});
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shortestGig, setShortestGig] = useState(0);
  const [longestGig, setLongestGig] = useState(0);

  const handleShowPerformer = () => {
    axios.get(`/performers/${params.id}.json`).then((response) => {
      console.log(response.data);
      setPerformer(response.data);
      setPosts(response.data.posts);
      setShortestGig(response.data.shortest_gig);
      setLongestGig(response.data.longest_gig);
      console.log(response.data.posts);
    });
  };

  useEffect(handleShowPerformer, []);

  const handleShowBookingForm = (performer) => {
    setIsBookingFormVisible(true);
  };

  const handleHideBookingForm = () => {
    setIsBookingFormVisible(false);
  };

  const handleCreateBooking = (params) => {
    axios
      .post("/bookings.json", params)
      .then((response) => {
        console.log(response.data);
        window.location.href = `/bookings/${response.data.id}`;
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const formatTime = (time) => {
    console.log(time);
    if (time >= 60) {
      const quotient = time / 60;
      console.log(quotient);
      return Math.round(quotient) + " hr";
    } else {
      return time + " min";
    }
  };

  return (
    <div className="row">
      <div className="col-3">
        <div className="fw-bold">
          <img
            src={performer.profile_image?.image_url}
            alt={`photo of ${performer.name}`}
            className="thumbnail-profile-image rounded-circle"
          />
          <p className="fs-3">{performer.name}</p>
        </div>
        <div className="fw-semibold mt-6">
          <p>
            {performer.city}, {performer.state}
          </p>
        </div>
        <p>
          {formatTime(shortestGig)} – {formatTime(longestGig)}
        </p>
        <p>performance type: {performer.performance_type}</p>
        <p>hourly rate: {performer.rate}</p>
        <p>{performer.bio}</p>
        <p>@{performer.twitter_handle} on Twitter</p>
        <p>{performer.instagram_handle} on Instagram</p>
      </div>
      <div className="col-9">
        <Carousel autoPlay={true} showArrows={true} showThumbs={true}>
          {posts?.map((post) => (
            <div>
              <div key={post.id}>
                <img src={post.image_url} alt={`photo of ${performer.name}`} className="profile-image carousel-image" />
              </div>
              <p className="legend">{post.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
      {localStorage.jwt !== undefined ? (
        <button onClick={() => handleShowBookingForm()} className="btn btn-dark">
          Book Now
        </button>
      ) : (
        <div className="row">
          <Link to="/signup" className="col-12 btn btn-dark">
            Sign Up to Book Now
          </Link>
          <Link to="/login" class="col-12 link-dark text-wrap fst-italic">
            Already a member? Click here to sign in.
          </Link>
        </div>
      )}
      <Modal show={isBookingFormVisible} onClose={handleHideBookingForm}>
        <BookingsNew errors={errors} performer={performer} onCreateBooking={handleCreateBooking} />
      </Modal>
      <div>
        <h3>{performer.name}'s Reviews</h3>
        {performer.performer_reviews?.map((review) => (
          <div key={review.id}>
            <p>
              {review.rating} ~ {review.comment}
            </p>
            <small>
              by {review.user.first_name} {review.user.last_name} on {review.created_at}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
