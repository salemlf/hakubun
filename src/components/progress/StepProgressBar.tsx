import styles from "./StepProgressBar.module.scss";

interface Props {
  stage: number;
  passedAt: Date | null;
}

export const StepProgressBar = ({ stage, passedAt }: Props) => {
  const fillProgressBar = (stage: number) => {
    const stagesComplete = new Set();

    // checks what stage is, then adds that number and below to the set to indicate they're complete. If already passed defaults to 5
    // ex. 1: stage = 1 -> set = [1]
    // ex. 2: stage 3 -> set = [1, 2, 3]
    for (let i = stage; i >= 1; i--) {
      // TODO: change so not all these if statements
      if (passedAt !== null) {
        [1, 2, 3, 4, 5].forEach(stagesComplete.add, stagesComplete);
      } else if (!stagesComplete.has(i)) {
        stagesComplete.add(i);
      } else {
        stagesComplete.delete(i);
      }
    }

    return stagesComplete;
  };

  const renderDivs = () => {
    let stagesComplete = fillProgressBar(stage);
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

  return <div className={`${styles.containerStyles}`}>{renderDivs()}</div>;
};
