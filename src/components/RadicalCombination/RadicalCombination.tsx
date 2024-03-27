import { IonRow, IonSkeletonText, IonIcon } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/assignments/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/subjects/useSubjectsByIDs";
import { Kanji } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import PuzzleIcon from "../../images/puzzle.svg";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SubjBtnListWrapper = styled.div`
  margin: 0;
  margin-top: 10px;
`;

type Props = {
  kanji: Kanji;
  displayQuestionTxt?: boolean;
};

function RadicalCombination({ kanji, displayQuestionTxt = false }: Props) {
  const findComponents = kanji.component_subject_ids.length !== 0;

  const {
    isLoading: radicalsUsedSubjLoading,
    data: radicalsUsedSubjData,
    error: radicalsUsedSubjErr,
  } = useSubjectsByIDs(kanji.component_subject_ids, findComponents);

  const {
    isLoading: radicalsUsedAssignmentsLoading,
    data: radicalsUsedAssignmentsData,
    error: radicalsUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.component_subject_ids, findComponents);

  const radicalsUsedLoading =
    findComponents &&
    (radicalsUsedSubjLoading ||
      radicalsUsedSubjErr ||
      radicalsUsedAssignmentsLoading ||
      radicalsUsedAssignmentsErr);

  if (radicalsUsedLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={PuzzleIcon} />
        <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
      </IconHeadingContainer>
      {displayQuestionTxt && (
        <p>Can you see where the radicals fit in the kanji?</p>
      )}
      {radicalsUsedSubjData && (
        <SubjBtnListWrapper>
          <SubjectButtonList
            btnSize="lg"
            subjList={radicalsUsedSubjData}
            assignmentList={radicalsUsedAssignmentsData ?? []}
          />
        </SubjBtnListWrapper>
      )}
    </SubjDetailSection>
  );
}

export default RadicalCombination;
