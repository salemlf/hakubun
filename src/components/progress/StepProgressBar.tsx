import styles from "./StepProgressBar.module.scss";

interface Props {
  stage: number;
}

export const StepProgressBar = ({ stage }: Props) => {
  let stagesComplete = new Set();

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

    stagesComplete = updatedStagesComplete;
  };

  const setBlockClasses = (stageNum: number) => {
    let classNames = `${styles.block}`;
    if (stagesComplete.has(stageNum)) {
      classNames += ` ${styles.done}`;
    }
    return classNames;
  };

  fillProgressBar(stage);

  return (
    <div className={`${styles.containerStyles}`}>
      <div className={setBlockClasses(1)}></div>
      <div className={setBlockClasses(2)}></div>
      <div className={setBlockClasses(3)}></div>
      <div className={setBlockClasses(4)}></div>
      <div className={setBlockClasses(5)}></div>
    </div>
  );
};
