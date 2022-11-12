import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingsNew } from "./BookingsNew";
import { Modal } from "./Modal";

export function PerformersShow() {
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const [performer, setPerformer] = useState({});
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);

  const handleShowPerformer = () => {
    axios.get(`/performers/${params.id}.json`).then((response) => {
      console.log(response.data);
      setPerformer(response.data);
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

  return (
    <div>
      <h4>{performer.name}</h4>
      <img src={performer.featured_image} alt={`photo of ${performer.name}`} />
      <p>
        {performer.city}, {performer.state}
      </p>
      <p>{performer.bio}</p>
      <p>
        gig range: {performer.shortest_gig}min – {performer.longest_gig}min
      </p>
      <p>performance type: {performer.performance_type}</p>
      <p>hourly rate: {performer.rate}</p>
      <p>{performer.email}</p>
      <p>@{performer.twitter_handle} on Twitter</p>
      <p>{performer.instagram_handle} on Instagram</p>
      {localStorage.jwt !== undefined ? <button onClick={() => handleShowBookingForm()}>Book Now</button> : null}
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
