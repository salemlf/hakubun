// import styled from "styled-components";
import { Subject } from "../types/Subject";
import { useState, useEffect } from "react";
import "./ProgressBar.scss";

interface Props {
  subjects: Subject[];
  stage: number;
}

// TODO: pass in data with ids of subjects, use to get stage for each item (and remove stage var being passed in)
export const ProgressBar = ({ subjects, stage }: Props) => {
  // TODO: change this yuckiness, possibly use a set?
  const [stage1Done, setstage1Done] = useState<boolean>();
  const [stage2Done, setstage2Done] = useState<boolean>();
  const [stage3Done, setstage3Done] = useState<boolean>();
  const [stage4Done, setstage4Done] = useState<boolean>();

  const fillProgressBar = (stage: number) => {
    switch (stage) {
      case 1:
        setstage1Done(true);
        break;

      case 2:
        setstage1Done(true);
        setstage2Done(true);
        break;

      case 2:
        setstage1Done(true);
        setstage2Done(true);
        break;

      case 3:
        setstage1Done(true);
        setstage2Done(true);
        setstage3Done(true);
        break;

      default:
        setstage1Done(true);
        setstage2Done(true);
        setstage3Done(true);
        setstage4Done(true);
        break;
    }
  };

  useEffect(() => {
    console.log("calling use effect!");
    fillProgressBar(stage);
    console.log("stage: ", stage);
  }, [stage]);

  return (
    <div className="container-styles">
      <div className={`block ${stage1Done ? "done" : ""}`}></div>
      <div className={`block ${stage2Done ? "done" : ""}`}></div>
      <div className={`block ${stage3Done ? "done" : ""}`}></div>
      <div className={`block ${stage4Done ? "done" : ""}`}></div>
    </div>
  );
};
