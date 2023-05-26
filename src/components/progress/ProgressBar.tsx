import { useState, useEffect, useRef } from "react";
import { IonSkeletonText } from "@ionic/react";

import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";

import { getAssignmentStatuses } from "../../services/SubjectAndAssignmentService";

import styles from "./ProgressBar.module.scss";

interface Props {
  level: number | undefined;
}

export const ProgressBar = ({ level }: Props) => {
  const barRef = useRef<null | HTMLDivElement>(null);
  const [completedTxt, setCompletedTxt] = useState("");

  const {
    isLoading: kanjiAssignmentsLvlLoading,
    data: kanjiAssignmentsLvlData,
    error: kanjiAssignmentsLvlErr,
  } = useKanjiAssignmentsForLvl(level);

  useEffect(() => {
    if (kanjiAssignmentsLvlData) {
      let { passed, total } = getAssignmentStatuses(kanjiAssignmentsLvlData);
      let numToPass = Math.ceil(total * 0.9);
      let percentage = Math.round((passed / numToPass) * 100);

      let updatedTxt = `${passed} of ${numToPass} kanji passed`;
      setCompletedTxt(updatedTxt);

      if (barRef.current) {
        barRef.current.style.width = `${percentage}%`;
      }
    }
  }, [kanjiAssignmentsLvlData]);

  return (
    <>
      {!kanjiAssignmentsLvlLoading && (
        <div className={`${styles.container}`}>
          <div className={`${styles.backdrop}`}>
            <div className={`${styles.source}`}>
              <div className={`${styles.barBg}`}>
                <div ref={barRef} className={`${styles.bar}`}></div>
              </div>
              <div className={`${styles.contents}`}>
                <span>{completedTxt}</span>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      {kanjiAssignmentsLvlLoading && (
        <div>
          <IonSkeletonText
            animated={true}
            style={{ height: "20px" }}
          ></IonSkeletonText>
        </div>
      )}
    </>
  );
};
