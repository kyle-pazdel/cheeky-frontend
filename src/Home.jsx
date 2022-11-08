import { useState, useEffect } from "react";
import axios from "axios";
import { PerformersIndex } from "./PerfomersIndex";

export function Home() {
  const [performers, setPerformers] = useState([]);

  const handleIndexPerformers = () => {
    axios.get("http://localhost:3000/performers.json").then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <PerformersIndex />
    </div>
  );
}
