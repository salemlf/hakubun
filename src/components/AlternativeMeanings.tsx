import { getAlternativeMeanings } from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";
import styled from "styled-components/macro";

import { Subject } from "../types/Subject";
import {
  SubjSummaryCol,
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "./SubjectDetailsStyled";

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
      <SubjDetailSubHeading>Alternative Meanings</SubjDetailSubHeading>
      <SubjDetailTxt>
        {altMeanings && altMeanings.length
          ? altMeanings
              .map((altMeaning: any) => {
                return altMeaning.meaning;
              })
              .join(", ")
          : "-"}
      </SubjDetailTxt>
    </AlternativeMeaningsContainer>
  );
};
