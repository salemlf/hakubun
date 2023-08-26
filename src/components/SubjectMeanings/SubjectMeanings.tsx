import {
  getSubjectDisplayName,
  getAlternativeMeanings,
} from "../../services/SubjectAndAssignmentService";
import { Subject, SubjectMeaning } from "../../types/Subject";
import AddAltUserMeaningButton from "./AddAltUserMeaningButton";
import UserMeaningChips from "./UserMeaningChips";
import {
  SubjDetailSubHeading,
  SubjDetailTxt,
  SubjSummaryCol,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const MeaningsContainer = styled(SubjSummaryCol)`
  flex-basis: 100%;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const SubjDetailHeadingNoBtmMargin = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const AltMeaningsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 5px;
  margin-bottom: 8px;
`;

const AltMeaningText = styled(SubjDetailTxt)`
  margin-right: 5px;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

type PrimaryMeaningProps = {
  subject: Subject;
};

const PrimaryMeaning = ({ subject }: PrimaryMeaningProps) => {
  let primaryMeaning = getSubjectDisplayName(subject);
  return (
    <>
      <SubjDetailSubHeading>Primary Meaning</SubjDetailSubHeading>
      <AltMeaningText>{primaryMeaning}</AltMeaningText>
    </>
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
  showPrimaryMeaning: boolean;
};

function SubjectMeanings({ subject, showPrimaryMeaning }: Props) {
  let altMeanings = getAlternativeMeanings(subject);
  let hasAltMeanings = altMeanings && altMeanings.length !== 0;

  return (
    <>
      {showPrimaryMeaning && (
        <MeaningsContainer>
          <PrimaryMeaning subject={subject} />
        </MeaningsContainer>
      )}
      <MeaningsContainer>
        <SubjDetailHeadingNoBtmMargin>
          Alternative Meanings
        </SubjDetailHeadingNoBtmMargin>
        <AltMeaningsContainer>
          {hasAltMeanings && <AltMeanings altMeanings={altMeanings} />}
          <UserMeaningChips subject={subject} />
          <AddAltUserMeaningButton subject={subject} />
        </AltMeaningsContainer>
      </MeaningsContainer>
    </>
  );
}

export default SubjectMeanings;
