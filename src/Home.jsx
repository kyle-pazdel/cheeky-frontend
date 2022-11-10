import { useState, useEffect } from "react";
import axios from "axios";
import { PerformersIndex } from "./PerfomersIndex";
import { Modal } from "./Modal";
import { PerformersShow } from "./PerformersShow";
import { Link } from "react-router-dom";
import { MapComponent } from "./MapComponent";

export function Home() {
  const [performers, setPerformers] = useState([]);

  const handleIndexPerformers = () => {
    axios.get("/performers.json").then((response) => {
      console.log(response.data);
      setPerformers(response.data);
    });
  };

  useEffect(handleIndexPerformers, []);

  return (
    <div>
      <PerformersIndex performers={performers} />
    </div>
  );
}
