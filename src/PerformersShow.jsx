import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingsNew } from "./BookingsNew";
import { Modal } from "./Modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { format } from "date-fns";
import ReactStars from "react-rating-stars-component";

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
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

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

  const formatPostTime = (time) => {
    const formattedTime = format(new Date(time), "MMMM dd yyyy, p");
    console.log(formattedTime);
    return formattedTime;
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
        <div className="col fw-semibold mt-6">
          <p>
            {performer.city}, {performer.state}
          </p>
        </div>
        <div className="card">
          <div class="card-header fw-bolder">Details</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {formatTime(shortestGig)} – {formatTime(longestGig)}
            </li>
            <li className="list-group-item no-wrap">{performer.rate} p/h</li>
            <li className="list-group-item text-nowrap">{performer.performance_type}</li>
            <li className="list-group-item text-nowrap">
              <SocialIcon
                className="m-2"
                bgColor="black"
                target="_blank"
                url={`https://twitter.com/${performer.twitter_handle}`}
                network="twitter"
              />
              <SocialIcon
                className="m-2"
                bgColor="black"
                target="_blank"
                url={`https://www.instagram.com/${performer.instagram_handle}`}
                network="instagram"
              />
            </li>
          </ul>
        </div>
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
      <div className="card row">
        <div class="card-header fw-bolder">About {performer.name}</div>
        <div className="card-text">
          <p>{performer.bio}</p>
        </div>
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
      <div className="card reviews">
        {performer.performer_reviews?.length > 0 ? (
          <p className="card-header fw-bolder fs-5">{performer.name}'s Reviews</p>
        ) : (
          <p className="card-header fw-bolder fs-5 fst-italic">No reviews for {performer.name} yet...</p>
        )}
        {performer.performer_reviews?.map((review) => (
          <div className="card m-0 p-2" key={review.id}>
            <div>
              <ReactStars
                count={5}
                value={review.rating}
                edit={false}
                size={24}
                isHalf={true}
                activeColor="#e98dd7"
                color="#ecb5bd"
              />
            </div>
            <div>
              <p>{review.comment}</p>
              <small>
                by {review.user.first_name} {review.user.last_name} on {formatPostTime(review.created_at)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
