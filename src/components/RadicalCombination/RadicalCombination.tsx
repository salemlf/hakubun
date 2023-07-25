import { IonRow, IonSkeletonText } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Kanji } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  kanji: Kanji;
  displayQuestionTxt?: boolean;
};

function RadicalCombination({ kanji, displayQuestionTxt = false }: Props) {
  let findComponents = kanji.component_subject_ids.length !== 0;

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

  let radicalsUsedLoading =
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
      <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
      {displayQuestionTxt && (
        <p>Can you see where the radicals fit in the kanji?</p>
      )}
      <SubjectButtonList
        subjList={radicalsUsedSubjData}
        assignmentList={radicalsUsedAssignmentsData}
      />
    </SubjDetailSection>
  );
}

export default RadicalCombination;