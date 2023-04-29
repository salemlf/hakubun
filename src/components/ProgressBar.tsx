import { useState, useEffect } from "react";
import "./ProgressBar.scss";

interface Props {
  stage: number;
}

// TODO: subjects will be passed into the radical and kanji containers, where they'll both get stage for each item (need to use assignments endpoint)
export const ProgressBar = ({ stage }: Props) => {
  const [stagesComplete, setStagesComplete] = useState(new Set());

  const fillProgressBar = (stage: number) => {
    const updatedStagesComplete = new Set(stagesComplete);

    // checks what stage is, then adds that number and below to the set to indicate they're complete
    // ex. 1: stage = 1 -> set = [1]
    // ex. 2: stage 3 -> set = [1, 2, 3]
    for (let i = stage; i >= 1; i--) {
      if (!stagesComplete.has(i)) {
        updatedStagesComplete.add(i);
      } else {
        updatedStagesComplete.delete(i);
      }
    }

    setStagesComplete(updatedStagesComplete);
  };

  useEffect(() => {
    // *testing
    console.log("calling fillProgressBar!");
    console.log("stage in ProgressBar component: ", stage);
    // *testing
    fillProgressBar(stage);
  }, [stage]);

  return (
    <div className="container-styles">
      <div className={`block ${stagesComplete.has(1) ? "done" : ""}`}></div>
      <div className={`block ${stagesComplete.has(2) ? "done" : ""}`}></div>
      <div className={`block ${stagesComplete.has(3) ? "done" : ""}`}></div>
      <div className={`block ${stagesComplete.has(4) ? "done" : ""}`}></div>
      <div className={`block ${stagesComplete.has(5) ? "done" : ""}`}></div>
    </div>
  );
};
