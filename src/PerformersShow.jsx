import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingsNew } from "./BookingsNew";
import { Modal } from "./Modal";

export function PerformersShow() {
  const params = useParams();
  const [performer, setPerformer] = useState({});
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);

  const handleShowPerformer = () => {
    axios.get(`http://localhost:3000/performers/${params.id}.json`).then((response) => {
      console.log(response.data);
      setPerformer(response.data);
    });
  };

  useEffect(handleShowPerformer, []);

  const handleShowBookingForm = (performer) => {
    setIsBookingFormVisible(true);
    // setCurrentPerformer(performer);
  };

  const handleHideBookingForm = () => {
    setIsBookingFormVisible(false);
  };

  const handleCreateBooking = (params) => {
    axios
      .post("http://localhost:3000/bookings.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/my-bookings"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div>
      <h4>{performer.name}</h4>
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
      {localStorage.jwt !== undefined ? <button onClick={() => handleShowBookingForm()}></button> : null}
      <Modal show={isBookingFormVisible} onClose={handleHideBookingForm}>
        <BookingsNew onCreateBooking={handleCreateBooking} />
      </Modal>
      <div>
        <h3>{performer.name}'s Reviews</h3>
        {performer.performer_reviews?.map((review) => (
          <div key={review.id}>
            <p>
              {review.rating} ~ {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
