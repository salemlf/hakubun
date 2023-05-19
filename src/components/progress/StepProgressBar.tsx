import { IonSkeletonText } from "@ionic/react";
import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";
import styles from "./StepProgressBar.module.scss";

interface Props {
  subjID: number | number;
}

export const StepProgressBar = ({ subjID }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignmentData,
    error: assignmentErr,
  } = useAssignmentBySubjID(subjID);

  const fillProgressBar = (stage: number) => {
    const stagesComplete = new Set();

    // checks what stage is, then adds that number and below to the set to indicate they're complete
    // ex. 1: stage = 1 -> set = [1]
    // ex. 2: stage 3 -> set = [1, 2, 3]
    for (let i = stage; i >= 1; i--) {
      if (!stagesComplete.has(i)) {
        stagesComplete.add(i);
      } else {
        stagesComplete.delete(i);
      }
    }

    return stagesComplete;
  };

  const renderDivs = () => {
    let stagesComplete = fillProgressBar(assignmentData!.srs_stage);
    let divs = [];
    for (let i = 1; i <= 5; i++) {
      divs.push(
        <div
          className={
            stagesComplete.has(i)
              ? `${styles.block} ${styles.done}`
              : `${styles.block}`
          }
          key={i}
        ></div>
      );
    }
    return divs;
  };

  // TODO: improve styling for loading skeleton
  if (assignmentLoading || assignmentErr) {
    return (
      <IonSkeletonText
        animated={true}
        style={{ height: "10px" }}
      ></IonSkeletonText>
    );
  }

  return <div className={`${styles.containerStyles}`}>{renderDivs()}</div>;
};
