import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function BookingsNew() {
  const location = useLocation();
  // const { performer } = location.state;
  const performer = location.state.performer;
  const userId = location.state.userId;
  const showPerformer = () => {
    console.log(performer);
    console.log(userId);
  };

  useEffect(showPerformer);
  return (
    <div>
      <h1>Book with {performer.name}</h1>
      <p>Your user id # is {userId}</p>
    </div>
  );
}
