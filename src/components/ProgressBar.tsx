import { useState, useEffect, useRef } from "react";
import { useKanjiAssignmentsForLvl } from "../hooks/useKanjiAssignmentsForLvl";
import { getAssignmentStatuses } from "../helpers/getAssignmentStatuses";

import styles from "./ProgressBar.module.scss";

interface Props {
  level: number | undefined;
}

export const ProgressBar = ({ level }: Props) => {
  // TODO: change from useState?
  const [completed, setCompleted] = useState(0);
  const barRef = useRef<null | HTMLDivElement>(null);
  const completedTxtRef = useRef<string>("");

  const {
    isLoading: kanjiAssignmentsLvlLoading,
    data: kanjiAssignmentsLvlData,
    error: kanjiAssignmentsLvlErr,
  } = useKanjiAssignmentsForLvl(level, false);

  useEffect(() => {
    if (kanjiAssignmentsLvlData) {
      let { passed, total } = getAssignmentStatuses(kanjiAssignmentsLvlData);
      let percentage = Math.round((passed / total) * 100);

      let updatedTxt = `${passed} of ${total} kanji passed`;

      completedTxtRef.current = updatedTxt;

      if (barRef.current) {
        barRef.current.style.width = `${percentage}%`;
      }

      setCompleted(percentage);
    }
  }, [kanjiAssignmentsLvlData]);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.backdrop}`}>
        <div className={`${styles.source}`}>
          <div className={`${styles.barBg}`}>
            <div ref={barRef} className={`${styles.bar}`}></div>
          </div>
          <div className={`${styles.contents}`}>
            <span>{completedTxtRef.current}</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
