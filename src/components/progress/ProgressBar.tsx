import { useState, useEffect, useRef } from "react";
import { IonSkeletonText } from "@ionic/react";

import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";

import { getAssignmentStatuses } from "../../services/SubjectAndAssignmentService";
import styled from "styled-components/macro";

const PillShapedBar = styled.div`
  border-radius: 18px;
`;

const ProgressContainer = styled(PillShapedBar)`
  width: 100%;
  border: 2px solid var(--wanikani-pink);
  margin: 10px 0;
`;

const Backdrop = styled(PillShapedBar)`
  position: relative;
  background-color: var(--wanikani-pink);

  .source {
    mix-blend-mode: screen;
  }

  .contents,
  .bar {
    height: 1.75rem;
  }
`;

const BarBg = styled(PillShapedBar)`
  background-color: white;
`;

const Bar = styled(PillShapedBar)`
  background-color: black;
`;

const Contents = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  mix-blend-mode: difference;

  span {
    font-size: 1.25rem;
  }
`;

type Props = {
  level: number | undefined;
};

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
        <ProgressContainer>
          <Backdrop>
            <div className="source">
              <BarBg>
                <Bar ref={barRef} className="bar"></Bar>
              </BarBg>
              <Contents className="contents">
                <span>{completedTxt}</span>
              </Contents>
            </div>
          </Backdrop>
        </ProgressContainer>
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
