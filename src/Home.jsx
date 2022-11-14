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
      <PerformersIndex performers={performers} />
    </div>
  );
}
