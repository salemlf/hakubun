import {
  getAlternativeMeanings,
  getSubjectDisplayName,
} from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";
import styled from "styled-components/macro";

import { Subject, SubjectMeaning } from "../types/Subject";
import {
  SubjSummaryCol,
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "./subject-details/SubjectDetailsStyled";

const AlternativeMeaningsContainer = styled(SubjSummaryCol)`
  padding-left: 0;
  padding-right: 0;
`;

const SubjDetailHeadingNoBtmMargin = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

type PrimaryAndAltProps = {
  subject: Subject;
  altMeanings: SubjectMeaning[];
  hasAltMeanings: boolean;
};

const PrimaryAndAltMeanings = ({
  subject,
  altMeanings,
}: PrimaryAndAltProps) => {
  let primaryMeaning = getSubjectDisplayName(subject);
  let hasAltMeanings = altMeanings && altMeanings.length !== 0;
  return (
    <SubjDetailTxt>
      {primaryMeaning}
      {hasAltMeanings ? ", " : ""}
      {hasAltMeanings
        ? altMeanings
            .map((altMeaning: SubjectMeaning) => {
              return altMeaning.meaning;
            })
            .join(", ")
        : ""}
    </SubjDetailTxt>
  );
};

type AltProps = {
  altMeanings: SubjectMeaning[];
  hasAltMeanings: boolean;
};

const AltMeanings = ({ altMeanings }: AltProps) => {
  let hasAltMeanings = altMeanings && altMeanings.length !== 0;
  return (
    <SubjDetailTxt>
      {hasAltMeanings
        ? altMeanings
            .map((altMeaning: SubjectMeaning) => {
              return altMeaning.meaning;
            })
            .join(", ")
        : "-"}
    </SubjDetailTxt>
  );
};

type Props = {
  subject: Subject;
  showPrimaryMeaning?: boolean;
};

//   TODO: add a button to add alternative meanings/synonyms
export const SubjectMeanings = ({
  subject,
  showPrimaryMeaning = false,
}: Props) => {
  let altMeanings = getAlternativeMeanings(subject);
  let hasAltMeanings = altMeanings && altMeanings.length !== 0;

  return (
    <AlternativeMeaningsContainer className={`${styles.altMeaningsContainer}`}>
      {showPrimaryMeaning ? (
        <SubjDetailSubHeading>Meanings</SubjDetailSubHeading>
      ) : (
        <SubjDetailHeadingNoBtmMargin>
          Alternative Meanings
        </SubjDetailHeadingNoBtmMargin>
      )}
      {showPrimaryMeaning && (
        <PrimaryAndAltMeanings
          subject={subject}
          altMeanings={altMeanings}
          hasAltMeanings={hasAltMeanings}
        />
      )}
      {!showPrimaryMeaning && (
        <AltMeanings
          altMeanings={altMeanings}
          hasAltMeanings={hasAltMeanings}
        />
      )}
    </AlternativeMeaningsContainer>
  );
};
