import { useState, useEffect } from "react";
import axios from "axios";
import { PerformersIndex } from "./PerfomersIndex";

export function Home() {
  const [performers, setPerformers] = useState([]);

  const handleIndexPerformers = () => {
    axios.get("/performers.json").then((response) => {
      console.log(response.data);
      sortPerformers(response.data);
    });
  };
  const sortPerformers = (performers) => {
    if (performers) {
      performers.sort((a, b) => (a.id > b.id ? 1 : -1));
      setPerformers(performers);
    } else {
      null;
    }
  };

  useEffect(handleIndexPerformers, []);
  return (
    <div>
      <div>
        <div className=" px-4 px-lg-5 landing-page-image">
          <div className="row m-0 gx-4 gx-lg-5 h-100 align-items-start justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="text-white font-weight-bold">Your Premeire Drag Booking Spot</h1>
              <hr className="divider" />
            </div>
            <div className="col-lg-8">
              <p className="text-white-75 mb-5">
                Whether for private parties or large events, begin browsing profiles below to search for a queen that
                will take your event to the next level!{" "}
              </p>
              <a className="btn btn-dark btn-lg" href="#performers-index">
                Find Out More
              </a>
            </div>
          </div>
        </div>
      </div>
      <PerformersIndex performers={performers} />
    </div>
  );
}
