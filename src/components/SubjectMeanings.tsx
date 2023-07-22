import styled from "styled-components/macro";
import {
  SubjSummaryCol,
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "./subject-details/SubjectDetailsStyled";

import { Subject, SubjectMeaning } from "../types/Subject";
import {
  getAlternativeMeanings,
  getSubjectDisplayName,
} from "../services/SubjectAndAssignmentService";
import { UserMeaningChips } from "./subjects/UserMeaningChips";
import { AddAltUserMeaningButton } from "./subjects/AddAltUserMeaningButton";

const AlternativeMeaningsContainer = styled(SubjSummaryCol)`
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 8px;
`;

const SubjDetailHeadingNoBtmMargin = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const AltMeaningsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const AltMeaningText = styled(SubjDetailTxt)`
  margin-right: 5px;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
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
    <AltMeaningText>
      {primaryMeaning}
      {hasAltMeanings ? ", " : ""}
      {hasAltMeanings
        ? altMeanings
            .map((altMeaning: SubjectMeaning) => {
              return altMeaning.meaning;
            })
            .join(", ")
        : ""}
    </AltMeaningText>
  );
};

type AltProps = {
  altMeanings: SubjectMeaning[];
};

const AltMeanings = ({ altMeanings }: AltProps) => {
  return (
    <AltMeaningText>
      {altMeanings
        .map((altMeaning: SubjectMeaning) => {
          return altMeaning.meaning;
        })
        .join(", ")}
    </AltMeaningText>
  );
};

type Props = {
  subject: Subject;
  showPrimaryMeaning?: boolean;
};

// TODO: add a button to add alternative meanings/synonyms
export const SubjectMeanings = ({
  subject,
  showPrimaryMeaning = false,
}: Props) => {
  let altMeanings = getAlternativeMeanings(subject);
  let hasAltMeanings = altMeanings && altMeanings.length !== 0;

  return (
    <AlternativeMeaningsContainer>
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
        <AltMeaningsContainer>
          <>
            {hasAltMeanings && <AltMeanings altMeanings={altMeanings} />}
            <UserMeaningChips subject={subject} />
            <AddAltUserMeaningButton subject={subject} />
          </>
        </AltMeaningsContainer>
      )}
    </AlternativeMeaningsContainer>
  );
};
