import { useState, useEffect } from "react";
import axios from "axios";
import { PerformersIndex } from "./PerfomersIndex";
import useWindowDimensions from "./useWindowDimensions";

export function Home() {
  const [performers, setPerformers] = useState([]);
  const { height, width } = useWindowDimensions();

  const handleIndexPerformers = () => {
    axios.get("/performers.json").then((response) => {
      console.log(response.data);
      sortPerformers(response.data);
      console.log(height);
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
          {width > 1200 ? (
            <div className="row m-0 gx-4 gx-lg-5 h-100 align-items-start justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1 className="text-white font-weight-bold landing-text">Your Premiere Drag Booking Spot</h1>
                <hr className="divider" />
              </div>
              <div className="col-lg-8">
                <p className="text-white-75 mb-5 fs-4 under-landing">
                  Whether for private parties or large events, begin browsing profiles below to search for a queen that
                  will take your event to the next level!{" "}
                </p>
                <a className="btn btn-dark btn-lg" href="#performers-index">
                  Find Out More
                </a>
              </div>
            </div>
          ) : (
            <div className="row m-0 gx-4 gx-lg-5 h-100 align-items-start justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1 className="text-white font-weight-bold landing-text"></h1>
                <hr className="divider" />
              </div>
              <div className="col-lg-8 mb-5 align-self-end">
                <p className="text-white-75 mb-5 fs-4 under-landing"> </p>
                <a className="btn btn-dark btn-lg" href="#performers-index">
                  Find Out More
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <PerformersIndex performers={performers} />
    </div>
  );
}
