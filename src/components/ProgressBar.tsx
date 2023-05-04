import { useState, useEffect } from "react";
import { useKanjiAssignmentsForLvl } from "../hooks/useKanjiAssignmentsForLvl";
import { getAssignmentStatuses } from "../helpers/getAssignmentStatuses";

import styles from "./ProgressBar.module.scss";

interface Props {
  level: number | undefined;
}

export const ProgressBar = ({ level }: Props) => {
  const [completed, setCompleted] = useState(0);
  const [passed, setPassed] = useState(0);
  const [total, setTotal] = useState(0);
  const {
    isLoading: kanjiAssignmentsLvlLoading,
    data: kanjiAssignmentsLvlData,
    error: kanjiAssignmentsLvlErr,
  } = useKanjiAssignmentsForLvl(level, false);

  useEffect(() => {
    if (kanjiAssignmentsLvlData) {
      console.log("kanjiAssignmentsLvlData: ", kanjiAssignmentsLvlData);

      let { passed, total } = getAssignmentStatuses(kanjiAssignmentsLvlData);
      let percentage = Math.round((passed / total) * 100);
      setCompleted(percentage);

      setPassed(passed);
      setTotal(total);
      // console.log(
      //   "🚀 ~ file: ProgressBar.tsx:15 ~ useEffect ~ percentage:",
      //   percentage
      // );
    }
  }, [kanjiAssignmentsLvlData]);

  //   TODO: change text color and placement based on percentage complete

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#ff00aa",
    borderRadius: "inherit",
    position: "absolute" as "absolute",
  };

  return (
    <div className={`${styles.containerStyles}`}>
      <div style={fillerStyles}></div>
      <p
        className={`${styles.labelStyles}`}
      >{`${passed} of ${total} kanji passed`}</p>
    </div>
  );
};
