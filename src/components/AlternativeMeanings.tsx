import { getAlternativeMeanings } from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";
import styled from "styled-components";

import { Subject } from "../types/Subject";
import { SubjSummaryCol } from "./SubjectDetailsStyled";

type Props = {
  subject: Subject;
};

const AlternativeMeaningsContainer = styled(SubjSummaryCol)`
  padding-left: 0;
  padding-right: 0;
`;

//   TODO: add a button to add alternative meanings/synonyms
export const AlternativeMeanings = ({ subject }: Props) => {
  let altMeanings = getAlternativeMeanings(subject);

  return (
    <AlternativeMeaningsContainer className={`${styles.altMeaningsContainer}`}>
      <h3>Alternative Meanings</h3>
      <p>
        {altMeanings && altMeanings.length
          ? altMeanings
              .map((altMeaning: any) => {
                return altMeaning.meaning;
              })
              .join(", ")
          : "-"}
      </p>
    </AlternativeMeaningsContainer>
  );
};
