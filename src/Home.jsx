import { useState, useEffect } from "react";
import axios from "axios";
import { PerformersIndex } from "./PerfomersIndex";
import { Modal } from "./Modal";
import { PerformersShow } from "./PerformersShow";

export function Home() {
  const [performers, setPerformers] = useState([]);
  const [isPerformerVisible, setIsPerformerVisible] = useState(false);
  const [currentPerformer, setCurrentPerformer] = useState([]);

  const handleIndexPerformers = () => {
    axios.get("http://localhost:3000/performers.json").then((response) => {
      console.log(response.data);
      setPerformers(response.data);
    });
  };

  const handleShowPerformer = (performer) => {
    setIsPerformerVisible(true);
    setCurrentPerformer(performer);
  };

  const handleHidePerformer = () => {
    setIsPerformerVisible(false);
  };

  useEffect(handleIndexPerformers, []);

  return (
    <div>
      <PerformersIndex performers={performers} onSelectPerformer={handleShowPerformer} />
      <Modal show={isPerformerVisible} onClose={handleHidePerformer}>
        <PerformersShow performer={currentPerformer} />
      </Modal>
    </div>
  );
}
