import {
  getAlternativeMeanings,
  getSubjectDisplayName,
} from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";
import styled from "styled-components/macro";

import { Subject } from "../types/Subject";
import {
  SubjSummaryCol,
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "./subject-details/SubjectDetailsStyled";

const AlternativeMeaningsContainer = styled(SubjSummaryCol)`
  padding-left: 0;
  padding-right: 0;
`;

type Props = {
  subject: Subject;
  showPrimaryMeaning?: boolean;
};

//   TODO: add a button to add alternative meanings/synonyms
export const SubjectMeanings = ({
  subject,
  showPrimaryMeaning = false,
}: Props) => {
  let primaryMeaning = getSubjectDisplayName(subject);
  let altMeanings = getAlternativeMeanings(subject);

  return (
    <AlternativeMeaningsContainer className={`${styles.altMeaningsContainer}`}>
      <SubjDetailSubHeading>
        {showPrimaryMeaning ? "Meanings" : "Alternative Meanings"}
      </SubjDetailSubHeading>
      <SubjDetailTxt>
        {showPrimaryMeaning && (
          <span>
            {primaryMeaning}
            {showPrimaryMeaning &&
              altMeanings &&
              altMeanings.length !== 0 &&
              ","}
          </span>
        )}
        {!showPrimaryMeaning && altMeanings && altMeanings.length
          ? altMeanings
              .map((altMeaning: any) => {
                return altMeaning.meaning;
              })
              .join(", ")
          : showPrimaryMeaning
          ? ""
          : "-"}
      </SubjDetailTxt>
    </AlternativeMeaningsContainer>
  );
};
